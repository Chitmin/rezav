import { Button } from '@/components/ui/button';

export function SyncButton({ formName }: { formName: string }) {
    return (
        <Button type="submit" color="primary" form={formName} className="cursor-pointer">
            Sync
        </Button>
    );
}
