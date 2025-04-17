import { PermissionGroup } from '@/components/access-control/permission-group';
import { SyncButton } from '@/components/access-control/sync-button';
import { RoleSelector } from '@/components/role-selector';
import { Form } from '@/components/ui/form';
import { useFlashNotifications } from '@/hooks/use-flash-notifications';
import { usePermissionForm } from '@/hooks/user-permission-form';
import SidebarLayout from '@/layouts/sidebar-layout';
import type { AccessControl } from '@/types';
import { useState } from 'react';

export default function AccessControl({ roles, permissions }: AccessControl.Props) {
    const { form, onSubmit } = usePermissionForm(roles);
    const [activeRole, setActiveRole] = useState<App.Enums.RolesEnum | null>(null);

    function onRoleChange(role: App.Enums.RolesEnum) {
        setActiveRole(role);
    }

    useFlashNotifications();

    return (
        <SidebarLayout title="Access Control">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="flex gap-4">
                    <RoleSelector roles={roles} onValueChange={onRoleChange} />
                    {activeRole && <SyncButton formName="role-permission-sync" />}
                </div>
                <Form {...form}>
                    <form id="role-permission-sync" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-4 grid-cols-2 gap-2 md:grid">
                            {roles.map((role) =>
                                permissions.map((permissionsGroup) => (
                                    <PermissionGroup
                                        key={`${role.id}-${permissionsGroup.label}`}
                                        role={role}
                                        permissionsGroup={permissionsGroup}
                                        activeRole={activeRole}
                                        control={form.control}
                                    />
                                )),
                            )}
                        </div>
                    </form>
                </Form>
            </div>
        </SidebarLayout>
    );
}
