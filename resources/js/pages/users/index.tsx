import SidebarLayout from '@/layouts/sidebar-layout';

export default function Index() {
    return (
        <SidebarLayout title="Users">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">Users Table</div>
        </SidebarLayout>
    );
}
