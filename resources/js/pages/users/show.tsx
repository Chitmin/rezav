import userUrl from '@/assets/user.svg';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import SidebarLayout from '@/layouts/sidebar-layout';
import { HasRelations, Profile, Role, User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Cake, Edit, Mail, MapPinHouse, Smartphone } from 'lucide-react';

interface Props {
    user: HasRelations<
        User,
        {
            profile: Profile;
            roles: Role[];
        }
    >;
}

function UserAttrSpan({ node }: { node: React.ReactNode }) {
    return node ? <span>{node}</span> : <span className="text-muted-foreground font-serif text-sm">N/A</span>;
}

export default function Show({ user }: Props) {
    return (
        <SidebarLayout title={user.name}>
            <div className="flex gap-4 p-4 pt-0">
                <div className="max-w-full min-w-80">
                    <AspectRatio ratio={16 / 14} className="bg-muted">
                        <img
                            className="-md h-full w-full rounded-t-md object-cover object-center"
                            src={user.profile.avatar || userUrl}
                            alt={user.name}
                        />
                    </AspectRatio>
                </div>
                <article className="flex flex-col justify-between gap-2">
                    <header className="flex justify-between">
                        <h3 className="max-w-90% font-bold">{user.name}</h3>
                        <Link href={route('users.edit', user.id)}>
                            <Edit className="h4 text-accent-foreground w-4" />
                        </Link>
                    </header>
                    <ul className="flex-1">
                        <li className="mb-2 flex items-center gap-2">
                            <Mail className="h-4 w-4" /> <UserAttrSpan node={user.email} />
                        </li>
                        <li className="mb-2 flex items-center gap-2">
                            <Smartphone className="h-4 w-4" /> <UserAttrSpan node={user.profile.phone} />
                        </li>
                        <li className="mb-2 flex items-center gap-2">
                            <MapPinHouse className="h-4 w-4" /> <UserAttrSpan node={user.profile.address} />
                        </li>
                        <li className="mb-2 flex items-center gap-2">
                            <Cake className="h-4 w-4" /> <UserAttrSpan node={user.profile.birthday} />
                        </li>
                    </ul>
                    <footer>
                        <Button onClick={() => router.get(route('users.edit', user.id))}>Edit</Button>
                    </footer>
                </article>
            </div>
        </SidebarLayout>
    );
}
