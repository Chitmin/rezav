import { LayoutDashboard, Settings2, ShieldCheck } from 'lucide-react';

const activeOn = (name: string) => route().current(name);

const GeneralNav = [
    {
        title: 'Dashboard',
        url: route('dashboard'),
        icon: LayoutDashboard,
        isActive: () => activeOn('dashboard'),
    },
    {
        title: 'Access Control',
        url: route('access-control'),
        icon: ShieldCheck,
        isActive: () => activeOn('access-control'),
    },
    {
        title: 'Settings',
        url: route('settings'),
        icon: Settings2,
        isActive: () => activeOn('settings'),
    },
];

export default GeneralNav;
