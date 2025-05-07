import { Pager } from '@/components/datatable/pager';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import usePaginatedTable from '@/hooks/use-paginated-table';
import { DatatableOptions, mergeDatatableOptions } from '@/lib/datable-utils';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';

function PaginatedTable<Data, Value>({ columns, pager, options }: DatatableOptions<Data, Value>) {
    const table = useReactTable(mergeDatatableOptions({ columns, pager, options }));
    usePaginatedTable<Data>({ state: table.getState(), pager });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={header.column.getCanSort() ? 'flex cursor-pointer items-center gap-1 select-none' : ''}
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() === 'asc'
                                                            ? 'Sort ascending'
                                                            : header.column.getNextSortingOrder() === 'desc'
                                                              ? 'Sort descending'
                                                              : 'Clear sort'
                                                        : undefined
                                                }
                                            >
                                                <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                                                {header.column.getIsSorted() && (
                                                    <span>
                                                        {
                                                            {
                                                                asc: <ArrowUp className="h-4 w-4" />,
                                                                desc: <ArrowDown className="h-4 w-4" />,
                                                                clear: null,
                                                            }[header.column.getIsSorted() || 'clear']
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        )}
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
