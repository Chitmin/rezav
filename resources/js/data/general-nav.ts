import { Settings2 } from 'lucide-react';

const activeOn = (name: string) => route().current(name);

const GeneralNav = [
    {
        title: 'Settings',
        url: route('settings'),
        icon: Settings2,
        isActive: () => activeOn('settings'),
    },
];

export default GeneralNav;
