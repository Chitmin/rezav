import { ShieldCheck } from 'lucide-react';

const activeOn = (name: string) => route().current(name);

const UserNav = [
    {
        title: 'Access Control',
        url: route('access-control'),
        icon: ShieldCheck,
        isActive: () => activeOn('access-control'),
    },
];

export default UserNav;
