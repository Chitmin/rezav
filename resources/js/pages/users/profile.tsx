import { Skeleton } from '@/components/ui/skeleton';
import { UserProfileWidget } from '@/components/user-profile-widget';
import SidebarLayout from '@/layouts/sidebar-layout';
import { UserWithProfile } from '@/types';

interface Props {
    user: UserWithProfile;
}

export default function Profile({ user }: Props) {
    return (
        <SidebarLayout title={user.name}>
            <div className="flex flex-col gap-4 p-4 pt-0 md:flex-row">
                <div className="basis-full md:basis-1/4">
                    <UserProfileWidget user={user} />
                </div>
                <div className="basis-full md:basis-3/4">
                    <Skeleton className="bg-muted h-screen w-full" />
                </div>
            </div>
        </SidebarLayout>
    );
}
