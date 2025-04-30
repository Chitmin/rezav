import { isActiveRoute } from '@/lib/utils';
import { ShieldCheck, User } from 'lucide-react';

const UserNav = [
    {
        title: 'Users',
        url: route('users'),
        icon: User,
        isActive: () => isActiveRoute('users'),
    },
    {
        title: 'Access Control',
        url: route('access-control'),
        icon: ShieldCheck,
        isActive: () => isActiveRoute('access-control'),
    },
];

export default UserNav;
