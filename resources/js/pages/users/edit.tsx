import { UserPasswordForm } from '@/components/user/user-password-form';
import { UserProfileCard } from '@/components/user/user-profile-card';
import SidebarLayout from '@/layouts/sidebar-layout';
import { HasRelations, Profile, Role, User } from '@/types';

interface Props {
    user: HasRelations<
        User,
        {
            profile: Profile;
            roles: Role[];
        }
    >;
}

export default function Edit({ user }: Props) {
    return (
        <SidebarLayout title="Edit User">
            <div className="flex flex-col gap-8 p-4 pt-0 md:flex-row">
                <div className="basis-full md:basis-1/4">
                    <UserProfileCard className="max-w-80" user={user} />
                </div>
                <div className="basis-full space-y-6 md:basis-3/4">
                    <UserPasswordForm user={user} />
                </div>
            </div>
        </SidebarLayout>
    );
}
