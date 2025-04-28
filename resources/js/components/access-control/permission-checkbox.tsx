import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { Role } from '@/types';
import type { Control } from 'react-hook-form';

export function PermissionCheckbox({
    role,
    permission,
    control,
}: {
    role: Role;
    permission: string;
    control: Control<Pages.AccessControl.RolesInput>;
}) {
    const name = `roles.${role.name}.${permission.replaceAll('.', '::')}` as const;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className="flex items-center space-x-2">
                        <FormControl>
                            <Checkbox id={name} checked={field.value === true} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel htmlFor={name}>{permission}</FormLabel>
                    </div>
                    <div className="text-sm">
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    );
}
