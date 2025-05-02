import { Pager } from '@/components/datatable/pager';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginatedData } from '@/types';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect } from 'react';

interface TableProps<Data, Value> {
    columns: ColumnDef<Data, Value>[];
    pager: PaginatedData<Data>;
}

function PaginatedTable<Data, Value>({ columns, pager }: TableProps<Data, Value>) {
    const table = useReactTable({
        columns,
        data: pager.data,
        getCoreRowModel: getCoreRowModel(),
        // autoResetPageIndex: true,
        manualPagination: true,
        pageCount: pager.last_page,
        rowCount: pager.total,
        initialState: {
            pagination: {
                pageIndex: pager.current_page - 1,
                pageSize: pager.per_page,
            },
        },
    });

    useEffect(() => {
        const { pageIndex } = table.getState().pagination;

        if (pageIndex !== pager.current_page - 1) {
            router.get(pager.links[pageIndex! + 1].url || pager.path);
        }
    }, [table.getState().pagination]);

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
            <Separator />
            <div className="py-2">
                <Pager table={table} />
            </div>
        </div>
    );
}

export { PaginatedTable };
