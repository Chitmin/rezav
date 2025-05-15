import * as React from 'react';

import { NavAuth } from '@/components/nav-auth';
import { NavGroup } from '@/components/nav-group';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import GeneralNav from '@/data/general-nav';
import UserNav from '@/data/user-nav';
import { Link } from '@inertiajs/react';
import { LayoutDashboard } from 'lucide-react';
import { Branding } from './branding';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Branding />
            </SidebarHeader>
            <SidebarContent>
                <DashboardMenuItem />
                <NavGroup items={GeneralNav} title="General" />
                <NavGroup items={UserNav} title="User" />
            </SidebarContent>
            <SidebarFooter>
                <NavAuth />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

function DashboardMenuItem() {
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href={route('dashboard')}>
                        <SidebarMenuButton
                            tooltip="Dashboard"
                            className="cursor-pointer"
                            isActive={route().current('dashboard')}
                        >
                            <LayoutDashboard />
                            <span>Dashboard</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
