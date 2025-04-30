'use client';

import { DeleteAction, EditAction, ViewAction } from '@/components/datatable';
import { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        cell: 'name',
        header: 'Name',
    },
    {
        cell: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'updated_at',
        cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
        header: 'Updated At',
    },
    {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
            <div className="flex justify-end gap-2">
                <ViewAction
                    onClick={() => {
                        console.log(row.original);
                    }}
                />
                <EditAction
                    onClick={() => {
                        console.log(row.original);
                    }}
                />
                <DeleteAction
                    onClick={() => {
                        console.log(row.original);
                    }}
                />
            </div>
        ),
    },
];
