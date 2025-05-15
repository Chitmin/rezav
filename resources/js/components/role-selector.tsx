import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Role } from '@/types';

export function RoleSelector({
    roles,
    onValueChange,
}: {
    roles: Role[];
    onValueChange: (value: App.Enums.RolesEnum) => void;
}) {
    return (
        <Select onValueChange={onValueChange}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
                {roles.map((role) => (
                    <SelectItem key={role.id} value={`${role.name}`}>
                        {role.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
