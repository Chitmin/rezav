import { isActiveRoute } from '@/lib/utils';
import { Settings2 } from 'lucide-react';

const GeneralNav = [
    {
        title: 'Settings',
        url: route('settings'),
        icon: Settings2,
        isActive: () => isActiveRoute('settings'),
    },
];

export default GeneralNav;
