import {
    Breadcrumb as BreadCrumbRoot,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react';

export function Breadcrumb() {
    const { breadcrumbs } = usePage<SharedData>().props;

    return (
        <BreadCrumbRoot>
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={breadcrumb.url}>
                        <BreadcrumbItem className="hidden md:block">
                            {breadcrumb.is_current_page ? (
                                <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={breadcrumb.url}>{breadcrumb.title}</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </BreadCrumbRoot>
    );
}
