import { PaginatedTable } from '@/components/datatable/paginated-table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import UserActions from '@/data/datatable/user-actions';
import userColumns from '@/data/datatable/user-columns';
import { useFlashNotifications } from '@/hooks/use-flash-notifications';
import SidebarLayout from '@/layouts/sidebar-layout';
import { PaginatedData, User } from '@/types';
import { router } from '@inertiajs/react';
import { AlertDialogContent } from '@radix-ui/react-alert-dialog';
import { useMemo, useState } from 'react';

export default function Index({ users }: { users: PaginatedData<User> }) {
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, path: '' });
    const columsDef = useMemo(
        () =>
            userColumns({
                actions: (row) => (
                    <UserActions
                        row={row}
                        onDelete={(path) => {
                            setDeleteConfirm({ open: true, path: path });
                        }}
                        onEdit={router.get}
                        onShow={router.get}
                    />
                ),
            }),
        [],
    );

    useFlashNotifications();

    return (
        <SidebarLayout title="Users">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <AlertDialog
                    open={deleteConfirm.open}
                    onOpenChange={(open) => {
                        setDeleteConfirm((prev) => ({ ...prev, open }));
                    }}
                >
                    <AlertDialogPortal>
                        <AlertDialogOverlay className="fixed inset-0 z-50 bg-black/50" />
                        <AlertDialogContent className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] rounded bg-white p-8">
                            <AlertDialogHeader className="mb-4">
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the given user.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        router.delete(deleteConfirm.path, {
                                            onFinish: () => {
                                                setDeleteConfirm({ open: false, path: '' });
                                            },
                                        });
                                    }}
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogPortal>
                </AlertDialog>
                <PaginatedTable
                    columns={columsDef}
                    pager={users}
                    options={{
                        manualSorting: true,
                        enableMultiSort: false,
                    }}
                />
            </div>
        </SidebarLayout>
    );
}
