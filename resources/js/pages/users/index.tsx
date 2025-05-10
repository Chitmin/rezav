import { DeleteConfirmModal } from '@/components/datatable/actions';
import { PaginatedTable } from '@/components/datatable/paginated-table';
import userColumns from '@/data/datatable/user-columns';
import { useFlashNotifications } from '@/hooks/use-flash-notifications';
import SidebarLayout from '@/layouts/sidebar-layout';
import { PaginatedData, User } from '@/types';
import { useMemo, useState } from 'react';

export default function Index({ users }: { users: PaginatedData<User> }) {
    const columsDef = useMemo(() => userColumns(), []);
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, onConfirm: () => {} });

    useFlashNotifications();

    return (
        <SidebarLayout title="Users">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <DeleteConfirmModal
                    open={deleteConfirm.open}
                    setOpen={(isOpen) => {
                        setDeleteConfirm((prev) => ({ ...prev, open: isOpen }));
                    }}
                    onConfirm={deleteConfirm.onConfirm}
                />
                <PaginatedTable
                    columns={columsDef}
                    pager={users}
                    options={{
                        manualSorting: true,
                        enableMultiSort: false,
                        meta: {
                            openDeleteConfirm(onConfirm) {
                                setDeleteConfirm({ open: true, onConfirm });
                            },
                        },
                    }}
                />
            </div>
        </SidebarLayout>
    );
}
