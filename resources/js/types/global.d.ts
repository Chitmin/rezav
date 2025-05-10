import { RowData } from '@tanstack/react-table';
import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        openDeleteConfirm?: (onConfirm: () => void) => void;
    }
}
