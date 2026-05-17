export type * from './auth';
export type * from './navigation';
export type * from './ui';

import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface FlashMessage {
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
    sidebarOpen: boolean;
    flash: FlashMessage;
}
