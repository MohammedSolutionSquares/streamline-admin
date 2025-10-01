import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useRole } from "@/contexts/RoleContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, switchRole } = useRole();
  const navigate = useNavigate();

  const handleProfile = (): void => {
    // Implement navigation to profile when routing is available
    console.log("Open profile");
  };

  const handleSettings = (): void => {
    console.log("Open settings");
  };

  const handleLogout = (): void => {
    // console.log("Logout clicked");
    navigate("/login");
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'company_admin':
        return 'secondary';
      case 'manager':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-14 md:h-16 bg-white border-b shadow-sm flex items-center justify-between gap-4 md:gap-6 px-4 md:px-6 sticky top-0 z-40">
            {/* Left cluster: menu + title */}
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <SidebarTrigger className="text-zinc-600 hover:text-zinc-900" />
              <div className="h-6 w-px bg-zinc-200" />
              <h1 className="font-semibold text-zinc-900 text-sm md:text-base lg:text-lg truncate">
                {user?.role === 'admin' && 'System Administration'}
                {user?.role === 'company_admin' && 'Company Dashboard'}
                {user?.role === 'manager' && 'Management Panel'}
                {user?.role === 'staff' && 'Staff Portal'}
              </h1>
            </div>
            
            {/* Right cluster */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Role Switcher for Demo */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">Role:</span>
                <select 
                  value={user?.role}
                  onChange={(e) => switchRole(e.target.value as any)}
                  className="bg-[#1B3C53] text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5458FF]/40"
                >
                  <option value="admin">Admin</option>
                  <option value="company_admin">Company Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <Button variant="ghost" size="icon" className="relative text-zinc-600 hover:bg-zinc-100">
                <Bell className="h-5 w-5 text-zinc-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 outline-none">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1B3C53]">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="hidden sm:block text-sm text-zinc-900 text-left">
                      <div className="font-medium leading-tight ">{user?.name}</div>
                      <Badge variant={getRoleBadgeVariant(user?.role || '')} className="text-[10px] md:text-xs rounded-full px-2 bg-[#1B3C53] text-white border-0">
                        {user?.role?.replace('_', ' ')}
                      </Badge>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#1B3C53]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSettings}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-white">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
} 