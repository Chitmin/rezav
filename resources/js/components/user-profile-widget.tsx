import userUrl from '@/assets/user.svg';
import { guessCountry, PhoneInput } from '@/components/phone-input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserWithProfile } from '@/types';
import { useForm } from '@inertiajs/react';
import { formatISO9075 } from 'date-fns';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Country } from 'react-phone-number-input';

interface Props {
    user: UserWithProfile;
}

const country = guessCountry();

export function UserProfileWidget({ user }: Props) {
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post } = useForm({
        _method: 'PUT',
        name: user.name,
        email: user.email,
        avatar: user.profile.avatar as File | null,
        phone: user.profile.phone,
        address: user.profile.address,
        birthday: user.profile.birthday,
    });

    function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file) {
                setData('avatar', file);
                setPreview(URL.createObjectURL(file));
            }
        }
    }

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('users.profile.update', user.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setPreview(null);
            },
            onError: () => {
                setPreview(null);
            },
        });
    }

    return (
        <article className="max-w-80 rounded-md p-4 pt-0 shadow-lg">
            <header className="mb-4">
                <h3 className="sr-only">{user.name}</h3>
                <div className="relative -mx-4">
                    <AspectRatio ratio={16 / 14} className="bg-muted">
                        <img
                            className="-md h-full w-full rounded-t-md object-cover object-center"
                            src={preview || user.profile.avatar || userUrl}
                            alt={user.name}
                        />
                    </AspectRatio>
                    <label
                        htmlFor="profile-avatar"
                        className="bg-primary text-primary-foreground absolute right-0 bottom-0 cursor-pointer rounded-tl-sm p-2"
                    >
                        <svg
                            xmlns="URL_ADDRESS.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </label>
                    <input
                        id="profile-avatar"
                        type="file"
                        onChange={handleAvatarChange}
                        accept=".jpg,.jpeg,.png,.webp,.bmp,.gif"
                        className="sr-only"
                    />
                </div>
            </header>
            <div id="user-profile-content">
                <h3 className="mb-4 text-lg font-semibold">Profile</h3>
                <form id="user-profile-form" onSubmit={submit}>
                    <div className="mb-4 flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            placeholder="Name"
                            id="name"
                            name="name"
                            defaultValue={user.name}
                            onChange={(e) => {
                                setData('name', e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            placeholder="Email"
                            id="email"
                            name="email"
                            defaultValue={user.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <PhoneInput
                            placeholder="Phone"
                            id="phone"
                            name="phone"
                            value={user.profile.phone || undefined}
                            onChange={(number) => setData('phone', number)}
                            defaultCountry={country?.id as Country}
                        />
                    </div>
                    <div className="mb-4 flex flex-col gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            placeholder="Address"
                            name="address"
                            id="address"
                            defaultValue={user.profile.address || undefined}
                            onChange={(e) => setData('address', e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex flex-col gap-2">
                        <Label htmlFor="birthday">Birthday</Label>
                        <DatePicker
                            id="birthday"
                            date={data.birthday ? new Date(data.birthday) : undefined}
                            setDate={(date) => {
                                if (date instanceof Date) {
                                    setData('birthday', formatISO9075(date, { representation: 'date' }));
                                } else {
                                    setData('birthday', null);
                                }
                            }}
                            initialFocus
                            // disabled={{ after: subYears(new Date(), 18) }}
                            // captionLayout="dropdown"
                            // fromYear={subYears(new Date(), 100).getFullYear()}
                            // toYear={subYears(new Date(), 18).getFullYear()}
                        />
                    </div>
                </form>
            </div>
            <footer>
                <Button type="submit" form="user-profile-form" className="bg-primary">
                    Update
                </Button>
            </footer>
        </article>
    );
}
