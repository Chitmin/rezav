import { RowData } from '@tanstack/react-table';
import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        openDeleteConfirm?: (onConfirm: () => void) => void;
    }
}
