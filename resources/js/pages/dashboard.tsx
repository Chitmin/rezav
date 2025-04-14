import SidebarContentSkeleton from '@/components/sidebar-content-skeleton';
import SidebarLayout from '@/layouts/sidebar-layout';

export default function Dashboard() {
    return (
        <SidebarLayout title="Dashboard">
            <SidebarContentSkeleton />
        </SidebarLayout>
    );
}
