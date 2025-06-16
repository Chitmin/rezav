import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Pagination as BasePagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { flexRender, Table as TableType } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { JSX, ReactNode, useMemo } from 'react';

interface TableProps<Data> {
    table: TableType<Data>;
}

function DataTable<Data>({ table }: TableProps<Data>) {
    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            className={
                                                header.column.getCanSort()
                                                    ? 'flex cursor-pointer items-center gap-1 select-none'
                                                    : ''
                                            }
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
                                            <span>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </span>
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
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

function getVisiblePages(count: number, index: number) {
    const maxPage = 10;
    const showing = count - index;

    if (count <= 10) {
        return Array.from({ length: count }, (_, i) => i + 1 + index);
    }

    if (showing > maxPage) {
        return Array.from({ length: 10 }, (_, i) => i + 1 + index);
    }

    const toAppend = Array.from({ length: maxPage - showing }, (_, i) => index - i).reverse();
    const pages = Array.from({ length: showing }, (_, i) => i + 1 + index);

    return [...toAppend, ...pages];
}

function Pagination<Data>({ table }: TableProps<Data>) {
    const { pageIndex } = table.getState().pagination;
    const pageCount = table.getPageCount();
    const visiblePages = useMemo(() => getVisiblePages(pageCount, pageIndex), [pageCount, pageIndex]);

    const handlePreviousPage = () => {
        if (table.getCanPreviousPage()) {
            table.previousPage();
        }
    };

    const handleNextPage = () => {
        if (table.getCanNextPage()) {
            table.nextPage();
        }
    };

    const handlePageClick = (page: number) => {
        table.setPageIndex(page - 1);
    };

    return (
        <div className="flex items-center justify-end p-2">
            {table.getFilteredSelectedRowModel().rows.length ? (
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{' '}
                    row(s) selected.
                </div>
            ) : (
                ''
            )}
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <BasePagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    aria-disabled={!table.getCanPreviousPage()}
                                    className={
                                        !table.getCanPreviousPage() ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                    }
                                    onClick={handlePreviousPage}
                                />
                            </PaginationItem>

                            {visiblePages[0] > 1 && (
                                <>
                                    <PaginationItem key={1}>
                                        <PaginationLink
                                            className="cursor-pointer"
                                            isActive={false}
                                            onClick={() => handlePageClick(1)}
                                        >
                                            First
                                        </PaginationLink>
                                    </PaginationItem>
                                    <span>...</span>
                                </>
                            )}

                            {visiblePages.map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        className="cursor-pointer"
                                        isActive={pageIndex + 1 === page}
                                        onClick={() => handlePageClick(page)}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {visiblePages[visiblePages.length - 1] < pageCount && (
                                <>
                                    <span>...</span>
                                    <PaginationItem key={pageCount}>
                                        <PaginationLink
                                            className="cursor-pointer"
                                            isActive={false}
                                            onClick={() => handlePageClick(pageCount)}
                                        >
                                            Last
                                        </PaginationLink>
                                    </PaginationItem>
                                </>
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    aria-disabled={!table.getCanNextPage()}
                                    className={
                                        !table.getCanNextPage() ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                                    }
                                    onClick={handleNextPage}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </BasePagination>
                </div>
            </div>
        </div>
    );
}

function DeleteConfirmModal({
    message,
    open,
    setOpen,
    onConfirm,
}: {
    message?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    onConfirm?: () => void;
}) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] rounded p-8">
                <AlertDialogHeader className="mb-4">
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {message || 'This action cannot be undone. This will permanently delete the given resource.'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Once you&apos;ve deleted this item, it will be permanently deleted.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onConfirm && onConfirm()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

interface DropdownActionCustomLinks {
    icon: JSX.Element;
    label: string;
    onClick: () => void;
}

interface DropdownActionRegularLinks {
    onShow: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

type DropdownActionProps =
    | {
          custom: DropdownActionCustomLinks[];
          regular?: DropdownActionRegularLinks;
          children?: ReactNode;
      }
    | {
          custom?: DropdownActionCustomLinks[];
          regular: DropdownActionRegularLinks;
          children?: ReactNode;
      };

function DropdownActions({ custom, regular, children }: DropdownActionProps) {
    return (
        <div className="text-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Open Actions Menu</span>
                        <MoreVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {!!custom &&
                        custom.map(({ icon, label, onClick }) => (
                            <DropdownMenuItem key={label} onClick={onClick}>
                                {icon} {label}
                            </DropdownMenuItem>
                        ))}
                    {!!regular && (
                        <>
                            <DropdownMenuItem onClick={regular.onShow}>
                                <Eye /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={regular.onEdit}>
                                <Pencil /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={regular.onDelete}>
                                <Trash2 /> Delete
                            </DropdownMenuItem>
                            {children}
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export { DataTable, DeleteConfirmModal, DropdownActions, Pagination };
