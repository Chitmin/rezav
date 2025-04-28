import SettingGroup from '@/components/setting-value/setting-group';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useSettingForm } from '@/hooks/use-setting-form';
import SidebarLayout from '@/layouts/sidebar-layout';

export default function App({ settingGroups }: Pages.Settings.Props) {
    const { form, onSubmit } = useSettingForm(settingGroups);

    return (
        <SidebarLayout title="Settings">
            <Form {...form}>
                <form id="settings-sync" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mt-8 p-4 pt-0">
                        <div className="grid grid-cols-none gap-4 md:grid-cols-3">
                            {Object.entries(settingGroups).map(([name, settings]) => (
                                <SettingGroup key={name} name={name} settings={settings} control={form.control} />
                            ))}
                        </div>
                        <Button type="submit" className="mt-4">
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </SidebarLayout>
    );
}
