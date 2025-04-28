import { transformSettingGroupsToFormValue } from '@/lib/setting-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

const schema = z.object({
    settings: z.record(z.string(), z.record(z.string(), z.string().or(z.number()))),
}) as ZodType<Pages.Settings.FormInput>;

export function useSettingForm(settingGroups: Pages.Settings.Props['settingGroups']) {
    const defaultValues = { settings: transformSettingGroupsToFormValue(settingGroups) };

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const onSubmit = (data: z.output<typeof schema>) => {
        const { settings } = data;
        router.put(route('settings.update'), { settings });
    };

    return {
        form,
        onSubmit,
    };
}
