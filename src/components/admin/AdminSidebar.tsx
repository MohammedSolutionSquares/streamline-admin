import { useState } from "react";
import { 
  Settings, 
  Users, 
  Building2, 
  Package, 
  Truck,
  BarChart3,
  Shield,
  Bell,
  Home,
  Droplets,
  MapPin,
  CreditCard,
  UserCheck
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const adminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Companies", url: "/companies", icon: Building2 },
  { title: "All Users", url: "/users", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Security", url: "/security", icon: Shield },
  { title: "System Settings", url: "/system", icon: Settings },
  { title: "List Demo", url: "/list-demo" , icon: Home},
];

const companyAdminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Orders", url: "/orders", icon: Package },
  { title: "Deliveries", url: "/deliveries", icon: Truck },
  { title: "Inventory", url: "/inventory", icon: Droplets },
  { title: "Customers", url: "/customers", icon: UserCheck },
  { title: "Delivery Areas", url: "/areas", icon: MapPin },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Staff", url: "/staff", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const managerMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Orders", url: "/orders", icon: Package },
  { title: "Deliveries", url: "/deliveries", icon: Truck },
  { title: "Customers", url: "/customers", icon: UserCheck },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const staffMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Deliveries", url: "/my-deliveries", icon: Truck },
  { title: "Orders", url: "/orders", icon: Package },
  { title: "Profile", url: "/profile", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user } = useRole();
  const currentPath = location.pathname;

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return adminMenuItems;
      case 'company_admin':
        return companyAdminMenuItems;
      case 'manager':
        return managerMenuItems;
      case 'staff':
        return staffMenuItems;
      default:
        return adminMenuItems;
    }
  };

  const isActive = (path: string) => currentPath === path;
  const menuItems = getMenuItems();
  const isExpanded = menuItems.some((item) => isActive(item.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-white font-medium shadow-sm" 
      : "text-white";
    
  const getRoleTitle = () => {
    switch (user?.role) {
      case 'admin':
        return 'System Admin';
      case 'company_admin':
        return 'Company Admin';
      case 'manager':
        return 'Manager';
      case 'staff':
        return 'Staff';
      default:
        return 'Admin';
    }
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r bg-white transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="p-4 bg-[#1B3C53]">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-white font-bold ">WaterSquares</h2>
                <p className="text-xs text-muted-foreground text-white/50">{getRoleTitle()}</p>
              </div>
            )}
          </div>
          {!collapsed && user?.companyName && user.role !== 'admin' && (
            <div className="text-xs px-2 py-1 bg-accent/20 rounded-md text-accent-foreground">
              {user.companyName}
            </div>
          )}
        </div>

        <SidebarGroup>
          {/* <SidebarGroupLabel className={collapsed ? "sr-only text-white" : "text-white"}>
            Navigation
          </SidebarGroupLabel> */}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-white
                        ${getNavCls({ isActive })}
                      `}
                    >
                      <item.icon className="h-5 w-5 flex-shrink"/>
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role Switcher - Only show for admin */}
        {/* {!collapsed && user?.role === 'admin' && (
          <div className="mt-auto pt-4 border-t">
            <SidebarGroup>
              <SidebarGroupLabel className="text-white">Quick Role Switch</SidebarGroupLabel>
              <div className="grid grid-cols-2 gap-2 text-xs text-white">
                <button 
                  onClick={() => user && user.role !== 'company_admin' && window.location.reload()}
                  className="px-2 py-1 bg-white text-[#1B3C53] rounded transition-colors"
                >
                  Company
                </button>
                <button 
                  onClick={() => user && user.role !== 'staff' && window.location.reload()}
                  className="px-2 py-1 bg-white  rounded transition-colors text-black"
                >
                  Staff
                </button>
              </div>
            </SidebarGroup>
          </div>
        )} */}
      </SidebarContent>
    </Sidebar>
  );
}