import { PaginatedTable } from '@/components/datatable/paginated-table';
import { userColumns } from '@/data/datatable-columns/user-columns';
import SidebarLayout from '@/layouts/sidebar-layout';
import { PaginatedData, User } from '@/types';

export default function Index({ users }: { users: PaginatedData<User> }) {
    console.log({ pager: users });
    return (
        <SidebarLayout title="Users">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <PaginatedTable columns={userColumns} pager={users} />
            </div>
        </SidebarLayout>
    );
}
