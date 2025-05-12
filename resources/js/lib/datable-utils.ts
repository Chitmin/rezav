import { searchParamsToNestedObject } from '@/lib/utils';
import { PaginatedData } from '@/types';
import { router } from '@inertiajs/react';
import { ColumnDef, TableOptions, TableState, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table';

export interface DatatableOptions<Data, Value> {
    columns: ColumnDef<Data, Value>[];
    pager: PaginatedData<Data>;
    options?: Omit<TableOptions<Data>, 'getCoreRowModel' | 'columns' | 'data' | 'manualPagination' | 'pageCount' | 'rowCount'>;
}

function reduceSorting(acc: Record<string, string>, cur: { id: string; desc: boolean }) {
    acc[cur.id] = cur.desc ? 'desc' : 'asc';
    return acc;
}

function readSortingFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = searchParamsToNestedObject(urlParams);
    if (params?.sort) {
        const sorting = params.sort as Record<string, string>;
        return Object.keys(sorting).reduce(
            (p, c) => {
                p.push({ id: c, desc: sorting[c] === 'desc' });
                return p;
            },
            [] as { id: string; desc: boolean }[],
        );
    }

    return [];
}

function gotoRoute<Data>(state: TableState, pager: PaginatedData<Data>) {
    const { pageIndex } = state.pagination;
    const sort = state.sorting.reduce(reduceSorting, {});

    router.get(
        pager.links[pageIndex! + 1].url || pager.path,
        {
            sort,
        },
        { preserveState: true },
    );
}

export function mergeDatatableOptions<Data, Value>({ columns, pager, options }: DatatableOptions<Data, Value>) {
    const state = {
        ...(options?.state || {}),
        pagination: {
            ...(options?.state?.pagination || {}),
            pageIndex: pager.current_page - 1,
            pageSize: pager.per_page,
        },
        sorting: readSortingFromUrl(),
    };

    const config: TableOptions<Data> = {
        columns,
        data: pager.data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        manualSorting: true,
        pageCount: pager.last_page,
        rowCount: pager.total,
        state,
        onPaginationChange: (updater) => {
            const updated = updater instanceof Function ? updater(state.pagination) : updater;
            gotoRoute<Data>({ ...state, pagination: updated } as TableState, pager);
        },
        onSortingChange: (updater) => {
            const updated = updater instanceof Function ? updater(state.sorting) : updater;
            gotoRoute<Data>({ ...state, sorting: updated } as TableState, pager);
        },
    };

    if (options) {
        delete options.state; // Remove state from options to avoid overwriting
        Object.assign(config, options);
    }

    return config;
}
