import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider, useRole } from "./contexts/RoleContext";
import { CompaniesProvider } from "./contexts/CompaniesContext";
import { OrdersProvider } from "./contexts/OrdersContext";
import { UsersProvider } from "./contexts/UsersContext";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyDeliveries from "./pages/MyDeliveries";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { CompanyManagement } from "./pages/CompanyManagement";
import AdminDashboardHome from "./pages/AdminDashboardHome";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import { OrderManagement } from "./pages/OrderManagement";
import { DeliveryManagement } from "./pages/DeliveryManagement";
import { Sidebar } from "./components/ui/sidebar";
import { AdminLayout } from "./components/admin/AdminLayout";
import CommonListDemo from "./pages/CommonListDemo";
import RequireRole from "./components/RequireRole";



// const { user } = useRole();
// console.log(user.role);




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      
      <CompaniesProvider>
      <UsersProvider>
        <OrdersProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            
            <BrowserRouter>
        
          {/* <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter> */}
          {/* <AdminLayout > */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<AdminDashboardHome />} />
              <Route
                path="/analytics"
                element={
                  <RequireRole allowed={["admin"]}>
                    <Analytics />
                  </RequireRole>
                }
              />
              <Route
                path="/users"
                element={
                  <RequireRole allowed={["admin"]}>
                    <Users />
                  </RequireRole>
                }
              />
              <Route
                path="/companies"
                element={
                  <RequireRole allowed={["admin"]}>
                    <CompanyManagement />
                  </RequireRole>
                }
              />
              <Route
                path="/orders"
                element={
                  <RequireRole allowed={["company_admin", "manager"]}>
                    <OrderManagement />
                  </RequireRole>
                }
              />
              <Route
                path="/deliveries"
                element={
                  <RequireRole allowed={["company_admin", "manager"]}>
                    <DeliveryManagement />
                  </RequireRole>
                }
              />
              <Route path="/list-demo" element={<CommonListDemo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/dashboard-1" element={<Dashboard />} /> */}
              <Route path="/my-deliveries" element={<MyDeliveries />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
            {/* </AdminLayout> */}
          </BrowserRouter>
        </TooltipProvider>
        </OrdersProvider>
        </UsersProvider>
      </CompaniesProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
