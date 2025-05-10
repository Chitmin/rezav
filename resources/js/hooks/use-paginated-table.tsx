import { PaginatedData } from '@/types';
import { router } from '@inertiajs/react';
import { TableState } from '@tanstack/react-table';
import { useEffect } from 'react';

interface Props<Data> {
    state: TableState;
    pager: PaginatedData<Data>;
}

function reduceSorting(acc: Record<string, string>, cur: { id: string; desc: boolean }) {
    acc[cur.id] = cur.desc ? 'desc' : 'asc';
    return acc;
}

export default function usePaginatedTable<Data>({ state, pager }: Props<Data>) {
    useEffect(() => {
        const { pageIndex } = state.pagination;
        const sort = state.sorting.reduce(reduceSorting, {});

        router.get(
            pager.links[pageIndex! + 1].url || pager.path,
            {
                sort,
            },
            {
                preserveState: true,
            },
        );
    }, [state.pagination, state.sorting, pager.links, pager.path]);
}
