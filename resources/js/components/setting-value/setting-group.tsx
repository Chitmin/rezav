import SettingInput from '@/components/setting-value/setting-input';
import type { Control } from 'react-hook-form';

type Props = {
    name: string;
    settings: App.Dtos.SettingValue[];
    control: Control<Pages.Settings.FormInput>;
};

export default function SettingGroup({ name, settings, control }: Props) {
    return (
        <div className="mb-4">
            <h3 className="mb-4 text-lg font-semibold">{name}</h3>
            {settings.map((setting) => {
                const key = `settings.${setting.group}.${setting.name}` as const;

                return (
                    <div className="mb-4 flex flex-col gap-2" key={key}>
                        <SettingInput name={key} setting={setting} control={control} />
                    </div>
                );
            })}
        </div>
    );
}
