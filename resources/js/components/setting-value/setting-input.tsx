import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Control } from 'react-hook-form';

type Props = {
    name: `settings.${string}.${string}`;
    setting: App.Dtos.SettingValue;
    control: Control<Pages.Settings.FormInput>;
};

export default function SettingInput({ name, setting, control }: Props) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) =>
                setting.type === 'boolean' ? (
                    <FormItem>
                        <div className="flex items-center space-x-2">
                            <FormControl>
                                <Checkbox id={name} checked={!!field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel htmlFor={name}>{setting.label}</FormLabel>
                        </div>
                        <div className="text-sm">
                            <FormMessage />
                        </div>
                    </FormItem>
                ) : (
                    <FormItem>
                        <FormLabel htmlFor={name}>{setting.label}</FormLabel>
                        <FormControl>
                            <Input
                                required
                                id={name}
                                name={name}
                                value={field.value}
                                onChange={field.onChange}
                                type={setting.isNumeric ? 'number' : 'text'}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }
        />
    );
}
