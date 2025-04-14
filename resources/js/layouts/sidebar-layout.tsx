import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb } from '@/components/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';

export default function SidebarLayout({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <SidebarProvider>
            <Head title={title} />
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <Breadcrumb />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
