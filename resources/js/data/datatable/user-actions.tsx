import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from '@/types';
import { Row } from '@tanstack/react-table';
import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';

type Porps = {
    row: Row<User>;
    onShow: (path: string) => void;
    onEdit: (path: string) => void;
    onDelete: (path: string) => void;
};

export default function UserActions({ row, onShow, onDelete, onEdit }: Porps) {
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
                    <DropdownMenuItem onClick={() => onShow(route('users.show', row.original.id))}>
                        <Eye /> View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(route('users.edit', row.original.id))}>
                        <Pencil /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(route('users.destroy', row.original.id))}>
                        <Trash2 /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
