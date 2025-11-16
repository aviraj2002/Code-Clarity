'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LayoutGrid, Code, BookText, PanelLeft } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from './ui/button';
import { useSidebar } from './ui/sidebar';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutGrid,
  },
  {
    href: '/review',
    label: 'Code Review',
    icon: Code,
  },
  {
    href: '/style-guide',
    label: 'Style Guide',
    icon: BookText,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border bg-sidebar"
    >
      <SidebarHeader className="h-14 items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <Logo className="size-8 shrink-0 text-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">
            CodeClarity
          </span>
        </div>
        {isMobile && <SidebarTrigger asChild><PanelLeft /></SidebarTrigger>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
