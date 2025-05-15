import type { PermissionDto, Role } from '@/types';
import type { Control } from 'react-hook-form';
import { PermissionCheckbox } from './permission-checkbox';

export function PermissionGroup({
    role,
    permissionsGroup,
    activeRole,
    control,
}: {
    role: Role;
    permissionsGroup: PermissionDto;
    activeRole: App.Enums.RolesEnum | null;
    control: Control<Pages.AccessControl.RolesInput>;
}) {
    return (
        <div
            key={permissionsGroup.label}
            className={activeRole === role.name ? 'visible order-1' : 'invisible order-2'}
        >
            <h3 className="mb-2 text-lg font-semibold">{permissionsGroup.label}</h3>
            <div className="grid grid-cols-2 gap-4">
                {permissionsGroup.permissions.map((permission) => (
                    <PermissionCheckbox
                        key={`${role.name}-${permission}`}
                        role={role}
                        permission={permission}
                        control={control}
                    />
                ))}
            </div>
        </div>
    );
}
