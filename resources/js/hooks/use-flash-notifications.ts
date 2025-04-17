import type { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useFlashNotifications() {
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        } else if (flash?.error) {
            toast.error(flash.error);
        } else if (flash?.danger) {
            toast.error(flash.danger);
        } else if (flash?.warning) {
            toast.warning(flash.warning);
        } else if (flash?.info) {
            toast.info(flash.info);
        } else {
            return;
        }
    }, [flash]);
}
