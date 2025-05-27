import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

export function UserPasswordForm({ id, user }: { id?: string; user?: User }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const formId = id || 'user-password-form';

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm(formId, {
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        const url = user ? route('user.password.update', user.id) : route('password.update');
        put(url, {
            preserveScroll: true,
            onSuccess: (e) => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <div className="space-y-6">
            <HeadingSmall title="Update password" description="Ensure a long, random password to stay secure" />
            <form onSubmit={updatePassword} className="space-y-6" id={formId}>
                {!user && (
                    <div className="grid gap-2">
                        <Label htmlFor="current_password">Current password</Label>

                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full max-w-120"
                            autoComplete="current-password"
                            placeholder="Current password"
                        />

                        <InputError message={errors.current_password} />
                    </div>
                )}

                <div className="grid gap-2">
                    <Label htmlFor="password">New password</Label>

                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full max-w-120"
                        autoComplete="new-password"
                        placeholder="New password"
                    />

                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirm password</Label>

                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full max-w-120"
                        autoComplete="new-password"
                        placeholder="Confirm password"
                    />

                    <InputError message={errors.password_confirmation} />
                </div>

                <div className="flex items-center gap-4">
                    <Button type="submit" form={formId} disabled={processing}>
                        Update password
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-neutral-600">Updated</p>
                    </Transition>
                </div>
            </form>
        </div>
    );
}
