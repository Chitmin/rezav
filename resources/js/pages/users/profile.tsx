import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { UserPasswordForm } from '@/components/user/user-password-form';
import { UserProfileCard } from '@/components/user/user-profile-card';
import SidebarLayout from '@/layouts/sidebar-layout';
import { HasRelations, Profile as ProfileType, User } from '@/types';

interface Props {
    user: HasRelations<User, { profile: ProfileType }>;
}

export default function Profile({ user }: Props) {
    return (
        <SidebarLayout title={user.name}>
            <div className="flex flex-col gap-8 p-4 pt-0 md:flex-row">
                <div className="basis-full md:basis-1/4">
                    <UserProfileCard className="max-w-80" user={user} />
                </div>
                <div className="basis-full space-y-6 md:basis-3/4">
                    <Skeleton className="bg-muted h-80 w-full" />
                    <Separator />
                    <UserPasswordForm />
                </div>
            </div>
        </SidebarLayout>
    );
}
