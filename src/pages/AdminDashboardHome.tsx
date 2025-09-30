import { useRole } from "@/contexts/RoleContext";
import { AdminDashboard } from "@/components/admin/dashboards/AdminDashboard";
import { CompanyAdminDashboard } from "@/components/admin/dashboards/CompanyAdminDashboard";
import { ManagerDashboard } from "@/components/admin/dashboards/ManagerDashboard";
import { StaffDashboard } from "@/components/admin/dashboards/StaffDashboard";

const AdminDashboardHome = () => {
  const { user } = useRole();

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

export default AdminDashboardHome;


