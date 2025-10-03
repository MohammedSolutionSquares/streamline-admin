import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Truck, Users, BarChart3, Clock, MapPin, AlertTriangle, CheckCircle } from "lucide-react";

export function ManagerDashboard() {
  const stats = [
    {
      title: "Orders Today",
      value: "32",
      change: "8 pending review",
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Active Routes",
      value: "6",
      change: "2 delayed",
      icon: Truck,
      color: "text-accent"
    },
    {
      title: "Team Members",
      value: "12",
      change: "3 on duty",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Efficiency",
      value: "94%",
      change: "+2% from yesterday",
      icon: BarChart3,
      color: "text-warning"
    }
  ];

  const teamUpdates = [
    { driver: "Alex Thompson", status: "delivering", orders: 4, area: "Zone A", eta: "45 min" },
    { driver: "Maria Garcia", status: "break", orders: 6, area: "Zone B", eta: "15 min" },
    { driver: "David Chen", status: "loading", orders: 3, area: "Zone C", eta: "30 min" },
  ];

  const priorities = [
    { type: "urgent", message: "Customer complaint - Order #ORD-045", time: "10 min ago" },
    { type: "attention", message: "Route optimization needed for Zone D", time: "1 hour ago" },
    { type: "success", message: "Monthly targets achieved", time: "2 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1B3C53]">Management Dashboard</h2>
          <p className="text-black/50">
            Oversee operations and team performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-[#1B3C53]">
            <Clock className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button size="sm" className="bg-[#1B3C53]">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-shadow bg-[#1B3C53]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 text-white ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-white">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Team Status */}
        <Card className="shadow-card bg-white border border-[#1B3C53]">
          <CardHeader>
            <CardTitle className="text-black">Team Status</CardTitle>
            <CardDescription className="text-black">
              Real-time delivery team updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamUpdates.map((team, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-black">{team.driver}</p>
                    <p className="text-xs text-black">
                      {team.orders} orders • {team.area}
                    </p>
                  </div>
                  <div className="text-right space-y-1 ">
                    <Badge 
                    className="bg-[#1B3C53] border border-[#1B3C53]"
                      variant={
                        team.status === 'delivering' ? 'default' : 
                        team.status === 'loading' ? 'black' : 
                        'outline'
                      }
                    >
                      {team.status}
                    </Badge>
                    <p className="text-xs text-black flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {team.eta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Priorities */}
        <Card className="shadow-card border border-[#1B3C53] bg-white">
          <CardHeader>
            <CardTitle className="text-black">Priority Items</CardTitle>
            <CardDescription className="text-black">
              Issues requiring management attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorities.map((priority, index) => (
                <div key={index} className="flex gap-3">
                  {priority.type === 'urgent' && <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />}
                  {priority.type === 'attention' && <Clock className="h-4 w-4 text-warning mt-0.5" />}
                  {priority.type === 'success' && <CheckCircle className="h-4 w-4 text-success mt-0.5" />}
                  <div className="space-y-1">
                    <p className="text-sm text-black">{priority.message}</p>
                    <p className="text-xs text-black">{priority.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card bg-[#1B3C53]">
        <CardHeader>
          <CardTitle>Quick Management Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <Users className="h-6 w-6 text-black" />
              <span className="text-black">Manage Staff</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <MapPin className="h-6 w-6 text-black" />
              <span className="text-black">Route Planning</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <BarChart3 className="h-6 w-6 text-black" />
              <span className="text-black">Performance</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <Clock className="h-6 w-6 text-black" />
              <span className="text-black">Scheduling</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-white">
              <AlertTriangle className="h-6 w-6 text-black" />
              <span className="text-black">Issues</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}