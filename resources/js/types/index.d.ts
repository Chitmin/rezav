import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface GretelBreadcrumbItem {
    title: string;
    url: string;
    is_current_page: boolean;
}

export interface SharedData {
    name: string;
    auth: Auth;
    ziggy: Config & { location: string };
    breadcrumbs: GretelBreadcrumbItem[];
    flash: {
        success?: string;
        error?: string;
        danger?: string;
        warning?: string;
        info?: string;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: App.Enums.RolesEnum;
    label: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions?: Permission[];
    [key: string]: unknown;
}

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface PermissionDto {
    label: string;
    permissions: string[];
}
