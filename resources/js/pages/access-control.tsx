import { RoleSelector } from '@/components/role-selector';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import SidebarLayout from '@/layouts/sidebar-layout';
import type { PermissionDto, Role, SharedData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z, ZodType } from 'zod';

interface RolesInput {
    roles: Record<App.Enums.RolesEnum, Record<string, boolean>>;
}

const schema = z.object({
    roles: z.record(z.string(), z.record(z.string(), z.boolean().optional())),
}) as ZodType<RolesInput>;

export default function AccessControl({ roles, permissions }: { roles: Role[]; permissions: PermissionDto[] }) {
    const [activeRole, setActiveRole] = useState<App.Enums.RolesEnum | null>(null);
    const { flash } = usePage<SharedData>().props;

    function isRoleHasPermission(role: Role, permission: string) {
        return !!role.permissions?.find((p) => p.name === permission);
    }

    function transformPermissionsToCheckbox(roles: Role[]) {
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
            { roles: {} } as RolesInput,
        );
    }

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: transformPermissionsToCheckbox(roles),
    });

    function onRoleChange(role: App.Enums.RolesEnum) {
        setActiveRole(role);
    }

    function transformPermissionToDotNotation(roles: Record<App.Enums.RolesEnum, Record<string, boolean>>) {
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

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    function onSubmit(values: z.output<typeof schema>) {
        const roles = transformPermissionToDotNotation(values.roles);
        router.put(route('access-control.update'), { roles });
    }

    return (
        <SidebarLayout title="Access Control">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex gap-4">
                    <RoleSelector roles={roles} onValueChange={onRoleChange} />
                    {activeRole && (
                        <Button type="submit" color="primary" form="role-permission-sync" className="cursor-pointer">
                            Sync
                        </Button>
                    )}
                </div>
                <Form {...form}>
                    <form id="role-permission-sync" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-4 grid-cols-2 gap-2 md:grid">
                            {roles.map((role) =>
                                permissions.map((permissionsGroup) => (
                                    <div key={permissionsGroup.label} className={activeRole === role.name ? 'visible order-1' : 'invisible order-2'}>
                                        <h3 className="font-semibol mb-2 text-lg">{permissionsGroup.label}</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {permissionsGroup.permissions.map((permission) => {
                                                const name = `roles.${role.name}.${permission.replaceAll('.', '::')}` as const;

                                                return (
                                                    <FormField
                                                        key={name}
                                                        control={form.control}
                                                        name={name}
                                                        render={({ field }) => (
                                                            <FormItem key={name}>
                                                                <div className="flex items-center space-x-2">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            id={name}
                                                                            checked={field.value === true}
                                                                            onCheckedChange={field.onChange}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel htmlFor={name}>{permission}</FormLabel>
                                                                </div>
                                                                <div className="text-sm">
                                                                    <FormMessage />
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    ></FormField>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )),
                            )}
                        </div>
                    </form>
                </Form>
            </div>
        </SidebarLayout>
    );
}
