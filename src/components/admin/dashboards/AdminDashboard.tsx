import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Package, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { CompanyManagement } from "../CompanyManagement";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const stats = [
    {
      title: "Total Companies",
      value: "24",
      change: "+2 this month",
      icon: Building2,
      color: "text-primary"
    },
    {
      title: "Total Users",
      value: "1,247",
      change: "+12% from last month",
      icon: Users,
      color: "text-accent"
    },
    {
      title: "Total Orders",
      value: "5,489",
      change: "+23% from last month",
      icon: Package,
      color: "text-success"
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+18% from last month",
      icon: TrendingUp,
      color: "text-warning"
    }
  ];

  const recentCompanies = [
    { id: 1, name: "PureWater Solutions", status: "active", users: 45, orders: 234 },
    { id: 2, name: "AquaFresh Delivery", status: "pending", users: 12, orders: 0 },
    { id: 3, name: "Crystal Clear Water", status: "active", users: 78, orders: 456 },
    { id: 4, name: "Blue Drop Services", status: "suspended", users: 23, orders: 89 },
  ];

  const systemAlerts = [
    { type: "warning", message: "Server maintenance scheduled for tonight", time: "2 hours ago" },
    { type: "info", message: "New company registration: AquaFresh Delivery", time: "4 hours ago" },
    { type: "success", message: "Monthly backup completed successfully", time: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Monitor and manage your entire water delivery platform
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Companies */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Companies</CardTitle>
                <CardDescription>
                  Latest registered water delivery companies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCompanies.map((company) => (
                    <div key={company.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {company.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {company.users} users • {company.orders} orders
                        </p>
                      </div>
                      <Badge 
                        variant={
                          company.status === 'active' ? 'default' : 
                          company.status === 'pending' ? 'secondary' : 
                          'destructive'
                        }
                      >
                        {company.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>
                  Important system notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className="flex gap-3">
                      {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />}
                      {alert.type === 'info' && <Package className="h-4 w-4 text-info mt-0.5" />}
                      {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-success mt-0.5" />}
                      <div className="space-y-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="companies">
          <CompanyManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}