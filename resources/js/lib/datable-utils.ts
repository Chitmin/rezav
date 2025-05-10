import { PaginatedData } from '@/types';
import { ColumnDef, TableOptions, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table';

export interface DatatableOptions<Data, Value> {
    columns: ColumnDef<Data, Value>[];
    pager: PaginatedData<Data>;
    options?: Partial<Omit<TableOptions<Data>, 'columns' | 'data' | 'manualPagination' | 'pageCount' | 'rowCount'>>;
}

export function mergeDatatableOptions<Data, Value>({ columns, pager, options }: DatatableOptions<Data, Value>) {
    const initialState = {
        ...(options?.initialState || {}),
        pagination: {
            ...(options?.initialState?.pagination || {}),
            pageIndex: pager.current_page - 1,
            pageSize: pager.per_page,
        },
    };

    const config: TableOptions<Data> = {
        columns,
        data: pager.data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        pageCount: pager.last_page,
        rowCount: pager.total,
        initialState,
    };

    if (options) {
        delete options.initialState; // Remove initialState from options to avoid overwriting
        Object.assign(config, options);
    }

    if (options?.onSortingChange) {
        config.manualSorting = true;
    }

    return config;
}
