import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDashboard } from "@/components/admin/dashboards/AdminDashboard";
import { CompanyAdminDashboard } from "@/components/admin/dashboards/CompanyAdminDashboard";
import { ManagerDashboard } from "@/components/admin/dashboards/ManagerDashboard";
import { StaffDashboard } from "@/components/admin/dashboards/StaffDashboard";
import { RoleProvider, useRole } from "@/contexts/RoleContext";

function DashboardContent() {
  const { user } = useRole();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'company_admin':
        return <CompanyAdminDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'staff':
        return <StaffDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout>
      {renderDashboard()}
    </AdminLayout>
  );
}

const Index = () => {
  return (
    <RoleProvider>
      <DashboardContent />
    </RoleProvider>
  );
};

export default Index;
