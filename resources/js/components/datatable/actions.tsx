import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';

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

export { DeleteActionButton, EditActionButton, ViewActionButton };
