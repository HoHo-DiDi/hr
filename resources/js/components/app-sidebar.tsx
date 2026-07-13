import { Link } from '@inertiajs/react';
import {
    BookOpen,
    CircleDollarSign,
    FolderGit2,
    House,
    LayoutGrid,
    UserCog,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import departments from '@/routes/departments';
import allowances from '@/routes/allowances';
import designations from '@/routes/designations';
import leaveTypes from '@/routes/leave-types';
import employees from '@/routes/employees';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Departments',
        href: departments.index(),
        icon: House,
    },
    {
        title: 'Designations',
        href: designations.index(),
        icon: UserCog,
    },
    {
        title: 'Allowances',
        href: allowances.index(),
        icon: CircleDollarSign,
    },
    {
        title: 'Leave Types',
        href: leaveTypes.index().url,
    },
    {
        title: 'Employees',
        href: employees.index().url
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
