import { DataTable } from '@/components/datatable';
import { userColumns } from '@/data/datatable-columns/user-columns';
import SidebarLayout from '@/layouts/sidebar-layout';
import { User } from '@/types';

const users: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        email_verified_at: '2025-04-28T07:54:01.000000Z',
        created_at: '2025-04-28T07:54:01.000000Z',
        updated_at: '2025-04-28T07:54:01.000000Z',
    },
    {
        id: 2,
        name: 'Ryan',
        email: 'ryan@gmail.com',
        email_verified_at: '2025-04-02T07:54:01.000000Z',
        created_at: '2025-04-02T07:54:01.000000Z',
        updated_at: '2025-04-02T07:54:01.000000Z',
    },
    {
        id: 3,
        name: 'Trinity',
        email: 'trinity@gmail.com',
        email_verified_at: '2025-04-28T07:54:01.000000Z',
        created_at: '2025-04-28T07:54:01.000000Z',
        updated_at: '2025-04-28T07:54:01.000000Z',
    },
    {
        id: 4,
        name: 'Chris',
        email: 'chris@gmail.com',
        email_verified_at: '2025-04-28T07:54:01.000000Z',
        created_at: '2025-04-28T07:54:01.000000Z',
        updated_at: '2025-04-28T07:54:01.000000Z',
    },
];

export default function Index() {
    return (
        <SidebarLayout title="Users">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <DataTable columns={userColumns} data={users} />
            </div>
        </SidebarLayout>
    );
}
