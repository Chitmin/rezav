import { LayoutDashboard, ShieldCheck } from 'lucide-react';

const GeneralNav = [
    {
        title: 'Dashboard',
        url: route('dashboard'),
        icon: LayoutDashboard,
        isActive: () => route().current('dashboard'),
    },
    {
        title: 'Access Control',
        url: route('access-control'),
        icon: ShieldCheck,
        isActive: () => route().current('access-control'),
    },
    // {
    //     title: 'Settings',
    //     url: '#',
    //     icon: Settings2,
    //     items: [
    //         {
    //             title: 'General',
    //             url: '#',
    //         },
    //         {
    //             title: 'Team',
    //             url: '#',
    //         },
    //         {
    //             title: 'Billing',
    //             url: '#',
    //         },
    //         {
    //             title: 'Limits',
    //             url: '#',
    //         },
    //     ],
    // },
];

export default GeneralNav;
