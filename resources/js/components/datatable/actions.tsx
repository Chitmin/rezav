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
import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { ReactNode } from 'react';

function EditActionButton({ onClick }: { onClick: () => void }) {
    return (
        <Button size="icon" variant="secondary" onClick={onClick}>
            <Pencil />
        </Button>
    );
}

function DeleteActionButton({ onClick }: { onClick: () => void }) {
    return (
        <Button size="icon" variant="destructive" onClick={onClick}>
            <Trash2 />
        </Button>
    );
}

function ViewActionButton({ onClick }: { onClick: () => void }) {
    return (
        <Button size="icon" variant="default" onClick={onClick}>
            <Eye />
        </Button>
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

function DropdownActions({
    onShow,
    onEdit,
    onDelete,
    children,
}: {
    onShow: () => void;
    onEdit: () => void;
    onDelete: () => void;
    children?: ReactNode;
}) {
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
                    <DropdownMenuItem onClick={onShow}>
                        <Eye /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onEdit}>
                        <Pencil /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}>
                        <Trash2 /> Delete
                    </DropdownMenuItem>
                    {children}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export { DeleteActionButton, DeleteConfirmModal, DropdownActions, EditActionButton, ViewActionButton };
