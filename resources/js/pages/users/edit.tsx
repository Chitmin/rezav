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
            <div className="flex flex-col gap-4 p-4 pt-0 md:flex-row">
                <UserProfileCard className="max-w-full min-w-80" user={user} />
                <UserPasswordForm user={user} />
            </div>
        </SidebarLayout>
    );
}
