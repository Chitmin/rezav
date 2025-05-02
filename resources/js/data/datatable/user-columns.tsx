import { User } from '@/types';
import { ColumnDef, Row } from '@tanstack/react-table';
import { JSX } from 'react';

type Props = {
    actions?: (row: Row<User>) => JSX.Element;
};

export default function userColumns({ actions }: Props): ColumnDef<User>[] {
    const cols: ColumnDef<User>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            enableSorting: true,
        },
        {
            accessorKey: 'name',
            header: 'Name',
            enableSorting: true,
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'updated_at',
            cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
            header: 'Updated At',
            enableSorting: true,
            sortingFn: 'datetime',
        },
    ];

    if (actions) {
        cols.push({
            id: 'actions',
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                return actions(row);
            },
        });
    }

    return cols;
}
