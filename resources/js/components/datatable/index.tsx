'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface DataTableProps<Data, Value> {
    columns: ColumnDef<Data, Value>[];
    data: Data[];
}

export function DataTable<Data, Value>({ columns, data }: DataTableProps<Data, Value>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export function EditAction({ onClick }: { onClick: () => void }) {
    return (
        <Button size="icon" variant="secondary" onClick={onClick}>
            <Pencil />
        </Button>
    );
}

export function DeleteAction({ onClick }: { onClick: () => void }) {
    return (
        <Button size="icon" variant="destructive" onClick={onClick}>
            <Trash2 />
        </Button>
    );
}

export function ViewAction({ onClick }: { onClick: () => void }) {
    return (
        <Button size="icon" variant="default" onClick={onClick}>
            <Eye />
        </Button>
    );
}
