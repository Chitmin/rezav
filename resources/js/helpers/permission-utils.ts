import { Role } from '@/types';

export function isRoleHasPermission(role: Role, permission: string) {
    return !!role.permissions?.find((p) => p.name === permission);
}

export function transformPermissionsToCheckbox(roles: Role[]) {
    return roles.reduce(
        (prev, curr) => {
            const role = curr.name;
            const permissions = curr.permissions?.reduce(
                (p, c) => {
                    p[c.name.replaceAll('.', '::')] = isRoleHasPermission(curr, c.name);
                    return p;
                },
                {} as Record<string, boolean>,
            );

            prev.roles[role] = permissions ?? {};

            return prev;
        },
        { roles: {} } as Pages.AccessControl.RolesInput,
    );
}

export function transformPermissionToDotNotation(roles: Record<App.Enums.RolesEnum, Record<string, boolean>>) {
    return Object.keys(roles).reduce(
        (prev, curr) => {
            const role = curr as App.Enums.RolesEnum;
            const permissions = Object.keys(roles[role])
                .filter((permission) => roles[role][permission] === true)
                .map((permission) => permission.replaceAll('::', '.'));
            prev[role] = permissions;

            return prev;
        },
        {} as Record<App.Enums.RolesEnum, string[]>,
    );
}
