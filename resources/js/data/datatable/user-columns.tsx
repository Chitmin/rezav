import { DropdownActions } from '@/components/data-table';
import { User } from '@/types';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        enableSorting: true,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: false,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        enableSorting: false,
    },
    {
        accessorKey: 'updated_at',
        cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
        header: 'Updated At',
        enableSorting: false,
    },
    {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row, table }) => {
            return (
                <DropdownActions
                    regular={{
                        onShow: () => router.get(route('users.show', row.original.id)),
                        onEdit: () => router.get(route('users.edit', row.original.id)),
                        onDelete: () => {
                            const confirm = table.options.meta?.openDeleteConfirm;

                            if (confirm) {
                                confirm(() => {
                                    router.delete(route('users.destroy', row.original.id));
                                });
                            } else {
                                router.delete(route('users.destroy', row.original.id));
                            }
                        },
                    }}
                />
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
];

export default userColumns;
