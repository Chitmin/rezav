import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Table } from '@tanstack/react-table';

interface PaginationProp<Data> {
    table: Table<Data>;
}

export function Pager<Data>({ table }: PaginationProp<Data>) {
    const { pageIndex } = table.getState().pagination;
    const pageCount = table.getPageCount();

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
        <div className="flex items-center justify-end px-2">
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
                    <Pagination>
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

                            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
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
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
