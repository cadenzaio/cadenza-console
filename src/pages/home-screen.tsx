import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim.tsx";
import { AIAssistantMessageMenu } from "@/components/application/slideout-menus/ai-assistant-message-menu.tsx";
import FlowWithProvider from "@/components/cadenza/flow";
import {
    Archive,
    BarChartSquare02,
    CheckDone01,
    ClockFastForward,
    CurrencyDollarCircle,
    FileCode01,
    Grid03,
    HomeLine,
    Inbox01,
    LineChartUp03,
    NotificationBox,
    Package,
    PieChart03,
    Rows01,
    Settings03,
    Star01,
    Stars01,
    User01,
    UserSquare,
    Users01,
    UsersPlus,
} from "@untitledui/icons";
import { useState } from "react";

export const HomeScreen = () => {

    const items = [
        {
            label: "Home",
            href: "/",
            icon: HomeLine,
            items: [
                { label: "Overview", href: "/overview", icon: Grid03 },
                { label: "Products", href: "/products", icon: Package },
                { label: "Orders", href: "/orders", icon: CurrencyDollarCircle },
                { label: "Customers", href: "/customers", icon: Users01 },
                { label: "Inbox", href: "/inbox", icon: Inbox01, badge: 4 },
                { label: "What's new?", href: "/whats-new", icon: Stars01 },
            ],
        },
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: BarChartSquare02,
            items: [
                { label: "Overview", href: "/dashboard/overview", icon: Grid03 },
                { label: "Notifications", href: "/dashboard/notifications", icon: NotificationBox, badge: 10 },
                { label: "Analytics", href: "/dashboard/analytics", icon: LineChartUp03 },
                { label: "Saved reports", href: "/dashboard/saved-reports", icon: Star01 },
                { label: "Scheduled reports", href: "/dashboard/scheduled-reports", icon: ClockFastForward },
                { label: "User reports", href: "/dashboard/user-reports", icon: UserSquare },
                { label: "Manage notifications", href: "/dashboard/manage-notifications", icon: Settings03 },
            ],
        },
        {
            label: "Projects",
            href: "/projects",
            icon: Rows01,
            items: [
                { label: "View all", href: "/projects/all", icon: Rows01 },
                { label: "Personal", href: "/projects/personal", icon: User01 },
                { label: "Team", href: "/projects/team", icon: Users01 },
                { label: "Shared with me", href: "/projects/shared-with-me", icon: UsersPlus },
                { label: "Archive", href: "/projects/archive", icon: Archive },
            ],
        },
        {
            label: "Docs",
            href: "/docs",
            icon: FileCode01,
            items: [
                { label: "PostgresActor Guide", href: "/docs/postgres-actor-guide", icon: FileCode01 },
                { label: "PostgresActor Reference", href: "/docs/postgres-actor-reference", icon: FileCode01 },
            ],
        },
        {
            label: "Tasks",
            href: "/tasks",
            icon: CheckDone01,
            badge: 10,
        },
        {
            label: "Reporting",
            href: "/reporting",
            icon: PieChart03,
        },
        {
            label: "Users",
            href: "/users",
            icon: Users01,
        },
    ]

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleOpenMenu = () => {
        setIsMenuOpen(true);
    };

    return (
        <div className="flex h-dvh flex-col">
            <SidebarNavigationSlim items={items}/>
            <FlowWithProvider onNodeClick={handleOpenMenu}/>
            <AIAssistantMessageMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}/>
        </div>
    );
};
