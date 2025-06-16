import { DataTable, DeleteConfirmModal, Pagination } from '@/components/data-table';
import { Separator } from '@/components/ui/separator';
import columns from '@/data/datatable/user-columns';
import { mergeDatatableOptions } from '@/lib/datable-utils';
import { PaginatedData, User } from '@/types';
import { useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

interface UserTableProps {
    users: PaginatedData<User>;
}

export default function UserTable({ users }: UserTableProps) {
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, onConfirm: () => {} });
    const options = {
        manualSorting: true,
        enableMultiSort: false,
        meta: {
            openDeleteConfirm(onConfirm: () => void) {
                setDeleteConfirm({ open: true, onConfirm });
            },
        },
    };
    const table = useReactTable(mergeDatatableOptions({ columns, pager: users, options }));

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <DeleteConfirmModal
                open={deleteConfirm.open}
                setOpen={(isOpen) => {
                    setDeleteConfirm((prev) => ({ ...prev, open: isOpen }));
                }}
                onConfirm={deleteConfirm.onConfirm}
            />
            <DataTable table={table} />
            <Separator />
            <Pagination table={table} />
        </div>
    );
}
