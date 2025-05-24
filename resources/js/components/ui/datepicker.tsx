import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { PropsBase } from 'react-day-picker';

type StaticAttributes = 'selected' | 'onSelect' | 'mode';

type Props = {
    date?: Date;
    setDate?: Dispatch<SetStateAction<Date | undefined>>;
} & Omit<PropsBase, StaticAttributes>;

export function DatePicker({ date, setDate, id, ...rest }: Props) {
    const [selected, onSelect] = useState<Date | undefined>(date);
    console.log(date);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button id={id} variant={'outline'} className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selected}
                    onSelect={(newSelected) => {
                        onSelect(newSelected);
                        setDate && setDate(newSelected);
                    }}
                    {...rest}
                />
            </PopoverContent>
        </Popover>
    );
}
