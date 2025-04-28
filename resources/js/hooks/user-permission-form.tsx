import { transformPermissionsToCheckbox, transformPermissionToDotNotation } from '@/helpers/permission-utils';
import type { Role } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

const schema = z.object({
    roles: z.record(z.string(), z.record(z.string(), z.boolean().optional())),
}) as ZodType<Pages.AccessControl.RolesInput>;

export function usePermissionForm(roles: Role[]) {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: transformPermissionsToCheckbox(roles),
    });

    const onSubmit = (values: z.output<typeof schema>) => {
        const roles = transformPermissionToDotNotation(values.roles);
        router.put(route('access-control.update'), { roles });
    };

    return { form, onSubmit };
}
