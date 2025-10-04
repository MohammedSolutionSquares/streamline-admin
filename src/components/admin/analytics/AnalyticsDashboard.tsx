import React, { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Building2, 
  DollarSign, 
  Package,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { useCompanies } from '@/contexts/CompaniesContext';
import {
  timeRangeOptions,
  chartColors,
  formatCurrency,
  formatNumber,
  formatPercentage
} from '../../../data/analyticsData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function AnalyticsDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const { companies, metrics } = useCompanies();

  const revenueChartData = useMemo(() => {
    // Create a synthetic trailing 7 months including current based on totalRevenue and orders
    const labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    const totalRevenue = metrics.totalRevenue;
    const totalOrders = metrics.totalOrders;
    // Distribute totals over months for demo purposes
    const revenueSeries = labels.map((_, idx) => Math.round((totalRevenue / labels.length) * (0.8 + (idx / (labels.length * 5)))));
    const ordersSeries = labels.map((_, idx) => Math.round((totalOrders / labels.length) * (0.8 + (idx / (labels.length * 5)))));
    return {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: revenueSeries,
          borderColor: chartColors.primary,
          backgroundColor: chartColors.primary + '20',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Orders',
          data: ordersSeries,
          borderColor: chartColors.accent,
          backgroundColor: chartColors.accent + '20',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          yAxisID: 'y1',
        }
      ]
    };
  }, [metrics.totalRevenue, metrics.totalOrders]);

  const userGrowthChartData = useMemo(() => {
    const labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    const totalUsers = metrics.totalUsers;
    const newUsersSeries = labels.map((_, idx) => Math.round((totalUsers / labels.length) * (0.6 + (idx / (labels.length * 6)))));
    const activeUsersSeries = labels.map((v, idx) => Math.round(newUsersSeries[idx] * 6));
    return {
      labels,
      datasets: [
        {
          label: 'New Users',
          data: newUsersSeries,
          backgroundColor: chartColors.success,
          borderColor: chartColors.success,
          borderWidth: 2,
        },
        {
          label: 'Active Users',
          data: activeUsersSeries,
          backgroundColor: chartColors.accent,
          borderColor: chartColors.accent,
          borderWidth: 2,
        }
      ]
    };
  }, [metrics.totalUsers]);

  const companyPerformanceChartData = useMemo(() => {
    const labels = companies.map(c => c.name);
    const revenue = companies.map(c => c.totalRevenue || 0);
    return {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: revenue,
          backgroundColor: chartColors.gradient,
          borderColor: chartColors.primary,
          borderWidth: 2,
        }
      ]
    };
  }, [companies]);

  const revenueDistributionData = useMemo(() => {
    const labels = companies.map(c => c.name);
    const revenue = companies.map(c => c.totalRevenue || 0);
    return {
      labels,
      datasets: [
        {
          data: revenue,
          backgroundColor: chartColors.gradient,
          borderColor: '#ffffff',
          borderWidth: 2,
        }
      ]
    };
  }, [companies]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'WaterSquares Analytics Overview' }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: function(value: any) { return formatCurrency(value); } }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: { callback: function(value: any) { return formatNumber(value); } }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' as const } },
    scales: { y: { beginAtZero: true, ticks: { callback: function(value: any) { return formatNumber(value); } } } }
  };

  const pieChartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' as const } } };

  const StatCard = ({ title, value, change, icon: Icon, color }: { title: string; value: string; change: string; icon: any; color: string; }) => (
    <Card className="card bg-[#1B3C53]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs mt-1 text-white/50">{change}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1B3C53]">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive insights into your WaterSquares platform performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-[180px] bg-[#1B3C53] text-white"><SelectValue placeholder="Select time range"/></SelectTrigger>
              <SelectContent className="w-[180px] bg-[#1B3C53] text-white">
                {timeRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={formatCurrency(metrics.totalRevenue)} change={formatPercentage(0)} icon={DollarSign} color="text-green-600"/>
        <StatCard title="Total Users" value={formatNumber(metrics.totalUsers)} change={formatPercentage(0)} icon={Users} color="text-blue-600" />
        <StatCard title="Total Companies" value={formatNumber(metrics.totalCompanies)} change={`+0 this month`} icon={Building2} color="text-purple-600" />
        <StatCard title="Total Orders" value={formatNumber(metrics.totalOrders)} change={`${formatPercentage(0)} from last month`} icon={Package} color="text-orange-600" />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-[#1B3C53] text-white">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-card bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1B3C53]"><LineChart className="h-5 w-5 text-black"/>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue and order trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]"><Line data={revenueChartData} options={chartOptions} /></div>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1B3C53]"><PieChart className="h-5 w-5 text-[#1B3C53]" />Revenue Distribution</CardTitle>
                <CardDescription>Revenue share by company</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]"><Doughnut data={revenueDistributionData} options={pieChartOptions} /></div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-card bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1B3C53]"><BarChart3 className="h-5 w-5 text-[#1B3C53]" />Company Performance</CardTitle>
              <CardDescription>Revenue comparison across all companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h:[400px]"><Bar data={companyPerformanceChartData} options={barChartOptions} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-6">
            <Card className="shadow-card bg-white">
              <CardHeader>
                <CardTitle className='text-[#1B3C53]'>Revenue Analytics</CardTitle>
                <CardDescription>Detailed revenue analysis and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]"><Line data={revenueChartData} options={chartOptions} /></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-6">
            <Card className="shadow-card bg-white">
              <CardHeader>
                <CardTitle className="text-[#1B3C53]">User Growth Analytics</CardTitle>
                <CardDescription>User acquisition and engagement trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]"><Bar data={userGrowthChartData} options={barChartOptions} /></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <div className="grid gap-6">
            <Card className="shadow-card bg-white">
              <CardHeader>
                <CardTitle className='text-[#1B3C53]'>Company Performance</CardTitle>
                <CardDescription>Performance metrics for all companies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-[300px]"><Bar data={companyPerformanceChartData} options={barChartOptions} /></div>
                  <div className="mt-6">
                    <h3 className="text-lg text-[#1B3C53] font-semibold mb-4">Company Details</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b text-[#1B3C53]">
                            <th className="text-left p-2">Company</th>
                            <th className="text-left p-2">Users</th>
                            <th className="text-left p-2">Revenue</th>
                            <th className="text-left p-2">Orders</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Growth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {companies.map((company) => (
                            <tr key={company.id} className="border-b">
                              <td className="p-2 font-medium text-[#1B3C53]">{company.name}</td>
                              <td className="p-2 text-[#1B3C53]">{formatNumber(company.users)}</td>
                              <td className="p-2 text-[#1B3C53]">{formatCurrency(company.totalRevenue || 0)}</td>
                              <td className="p-2 text-[#1B3C53]">{formatNumber(company.orders)}</td>
                              <td className="p-2 text-[#1B3C53]">
                                <Badge 
                                  variant={
                                    company.status === 'active' ? 'default' : 
                                    company.status === 'pending' ? 'secondary' : 
                                    'destructive'
                                  }
                                >
                                  {company.status}
                                </Badge>
                              </td>
                              <td className="p-2">
                                <span className={`flex items-center gap-1 text-green-600 `}>
                                  <TrendingUp className="h-3 w-3" />
                                  {formatPercentage(5.2)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
