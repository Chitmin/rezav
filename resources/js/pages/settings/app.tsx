import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SidebarLayout from '@/layouts/sidebar-layout';
import { useForm } from 'react-hook-form';

const example = {
    General: [
        {
            name: 'version',
            value: '1.0.0',
            label: 'Version',
            group: 'general',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'name',
            value: 'My App',
            label: 'Name',
            group: 'general',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'description',
            value: 'My App is a great app!',
            label: 'Description',
            group: 'general',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'author',
            value: 'My Name',
            label: 'Author',
            group: 'general',
            type: 'string',
            isNumeric: false,
        },
    ],
    'Notifications Channel': [
        {
            name: 'email',
            value: '',
            label: 'Email',
            group: 'notifications-channel',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'slack',
            value: '',
            label: 'Slack',
            group: 'notifications-channel',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'discord',
            value: '',
            label: 'Discord',
            group: 'notifications-channel',
            type: 'string',
            isNumeric: false,
        },
    ],
    Security: [
        {
            name: 'password',
            value: '',
            label: 'Password',
            group: 'security',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'two-factor',
            value: '',
            label: 'Two-Factor',
            group: 'security',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'two-factor-recovery',
            value: '',
            label: 'Two-Factor Recovery',
            group: 'security',
            type: 'string',
            isNumeric: false,
        },
    ],
    'Privacy Policy': [
        {
            name: 'privacy-policy',
            value: '',
            label: 'Privacy Policy',
            group: 'privacy-policy',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'terms-of-service',
            value: '',
            label: 'Terms of Service',
            group: 'privacy-policy',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'consent',
            value: 0,
            label: 'Consent',
            group: 'privacy-policy',
            type: 'integer',
            isNumeric: true,
        },
    ],
    Language: [
        {
            name: 'language',
            value: '',
            label: 'Language',
            group: 'language',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'timezone',
            value: '',
            label: 'Timezone',
            group: 'language',
            type: 'string',
            isNumeric: false,
        },
    ],
    'About Site': [
        {
            name: 'version',
            value: '',
            label: 'Version',
            group: 'about-site',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'name',
            value: '',
            label: 'Name',
            group: 'about-site',
            type: 'string',
            isNumeric: false,
        },
        {
            name: 'description',
            value: '',
            label: 'Description',
            group: 'about-site',
            type: 'string',
            isNumeric: false,
        },
    ],
};

export default function App({ settingGroups }: Pages.Settings.Props) {
    console.log({ settingGroups });
    useForm();
    return (
        <SidebarLayout title="Settings">
            <div className="mt-8 grid grid-cols-none gap-4 p-4 pt-0 md:grid-cols-3">
                {Object.entries(example).map(([name, settings]) => (
                    <div className="mb-4" key={name}>
                        <h3 className="mb-4 text-lg font-semibold">{name}</h3>
                        {settings.map((setting) => {
                            const key = `${setting.group}.${setting.name}`;
                            return (
                                <div key={key} className="mb-4 flex flex-col gap-2">
                                    <Label htmlFor={key}>{setting.label}</Label>
                                    <Input id={key} name={key} type={setting.isNumeric ? 'number' : 'text'} />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </SidebarLayout>
    );
}
