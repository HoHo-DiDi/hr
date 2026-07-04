export type * from './auth';
export type * from './navigation';
export type * from './ui';

import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface FLashMessage {
    success: string | null;
    error: string | null;
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface SharedData extends InertiaPageProps {
    name: string;
    auth: {
        user: AuthUser | null;
    };
    siderbarOpen: boolean;
    flash: FLashMessage;
}
export interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

export interface LaravelPagination<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}
