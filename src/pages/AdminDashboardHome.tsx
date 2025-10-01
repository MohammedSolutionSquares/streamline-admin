import { useRole } from "@/contexts/RoleContext";
import { AdminDashboard } from "@/components/admin/dashboards/AdminDashboard";
import { CompanyAdminDashboard } from "@/components/admin/dashboards/CompanyAdminDashboard";
import { ManagerDashboard } from "@/components/admin/dashboards/ManagerDashboard";
import { StaffDashboard } from "@/components/admin/dashboards/StaffDashboard";
import { AdminLayout } from "@/components/admin/AdminLayout";

const AdminDashboardHome = () => {
  const { user } = useRole();

  const content = (() => {
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
  })();

  return (
    <AdminLayout>
      {content}
    </AdminLayout>
  );
};

export default AdminDashboardHome;


