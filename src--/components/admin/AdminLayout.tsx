import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useRole } from "@/contexts/RoleContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, switchRole } = useRole();

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
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="h-6 w-px bg-border" />
              <h1 className="font-semibold text-foreground">
                {user?.role === 'admin' && 'System Administration'}
                {user?.role === 'company_admin' && 'Company Dashboard'}
                {user?.role === 'manager' && 'Management Panel'}
                {user?.role === 'staff' && 'Staff Portal'}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Role Switcher for Demo */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Role:</span>
                <select 
                  value={user?.role}
                  onChange={(e) => switchRole(e.target.value as any)}
                  className="bg-background border rounded-md px-2 py-1 text-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="company_admin">Company Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm">
                  <div className="font-medium">{user?.name}</div>
                  <Badge variant={getRoleBadgeVariant(user?.role || '')} className="text-xs">
                    {user?.role?.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-muted/20">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}