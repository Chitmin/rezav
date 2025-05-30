import SidebarLayout from '@/layouts/sidebar-layout';
import { User } from '@/types';

export default function Show({ user }: { user: User }) {
    return (
        <SidebarLayout title={user.name}>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <h2>{user.name}</h2>
            </div>
        </SidebarLayout>
    );
}
