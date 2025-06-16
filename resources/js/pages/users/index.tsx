import UserTable from '@/components/datatable/user-table';
import SidebarLayout from '@/layouts/sidebar-layout';
import { PaginatedData, User } from '@/types';

export default function Index({ users }: { users: PaginatedData<User> }) {
    return (
        <SidebarLayout title="Users">
            <UserTable users={users} />
        </SidebarLayout>
    );
}
