import * as React from 'react';

import { NavAuth } from '@/components/nav-auth';
import { NavGroup } from '@/components/nav-group';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import GeneralNav from '@/data/general-nav';
import { Branding } from './branding';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Branding />
            </SidebarHeader>
            <SidebarContent>
                <NavGroup items={GeneralNav} title="General" />
            </SidebarContent>
            <SidebarFooter>
                <NavAuth />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
