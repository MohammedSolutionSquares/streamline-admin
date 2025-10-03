import React, { useState } from 'react';
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
  Activity,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import {
  systemAnalytics,
  companiesAnalytics,
  revenueData,
  userGrowthData,
  companyPerformanceData,
  timeRangeOptions,
  chartColors,
  formatCurrency,
  formatNumber,
  formatPercentage
} from '../../../data/analyticsData';

// Register Chart.js components
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

  // Revenue trend chart data
  const revenueChartData = {
    labels: revenueData.map(item => item.month),
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.map(item => item.revenue),
        borderColor: chartColors.primary,
        backgroundColor: chartColors.primary + '20',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Orders',
        data: revenueData.map(item => item.orders),
        borderColor: chartColors.accent,
        backgroundColor: chartColors.accent + '20',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        yAxisID: 'y1',
      }
    ]
  };

  // User growth chart data
  const userGrowthChartData = {
    labels: userGrowthData.map(item => item.month),
    datasets: [
      {
        label: 'New Users',
        data: userGrowthData.map(item => item.newUsers),
        backgroundColor: chartColors.success,
        borderColor: chartColors.success,
        borderWidth: 2,
      },
      {
        label: 'Active Users',
        data: userGrowthData.map(item => item.activeUsers),
        backgroundColor: chartColors.accent,
        borderColor: chartColors.accent,
        borderWidth: 2,
      }
    ]
  };

  // Company performance chart data
  const companyPerformanceChartData = {
    labels: companyPerformanceData.map(item => item.companyName),
    datasets: [
      {
        label: 'Revenue',
        data: companyPerformanceData.map(item => item.revenue),
        backgroundColor: chartColors.gradient,
        borderColor: chartColors.primary,
        borderWidth: 2,
      }
    ]
  };

  // Revenue distribution pie chart data
  const revenueDistributionData = {
    labels: companyPerformanceData.map(item => item.companyName),
    datasets: [
      {
        data: companyPerformanceData.map(item => item.revenue),
        backgroundColor: chartColors.gradient,
        borderColor: '#ffffff',
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'WaterSquares Analytics Overview'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatCurrency(value);
          }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return formatNumber(value);
          }
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return formatNumber(value);
          }
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      }
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color }: {
    title: string;
    value: string;
    change: string;
    icon: any;
    color: string;
  }) => (
    <Card className="shadow-card hover:shadow-elevated transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className="text-xs text-gray-500 mt-1">
          {change}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1B3C53]">
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground">
            Comprehensive insights into your WaterSquares platform performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {timeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(systemAnalytics.totalRevenue)}
          change={formatPercentage(systemAnalytics.monthlyRevenueGrowth)}
          icon={DollarSign}
          color="text-green-600"
        />
        <StatCard
          title="Total Users"
          value={formatNumber(systemAnalytics.totalUsers)}
          change={formatPercentage(systemAnalytics.monthlyUserGrowth)}
          icon={Users}
          color="text-blue-600"
        />
        <StatCard
          title="Total Companies"
          value={formatNumber(systemAnalytics.totalCompanies)}
          change={`+${systemAnalytics.newCompaniesThisMonth} this month`}
          icon={Building2}
          color="text-purple-600"
        />
        <StatCard
          title="Total Orders"
          value={formatNumber(systemAnalytics.totalOrders)}
          change={`${formatPercentage(15.2)} from last month`}
          icon={Package}
          color="text-orange-600"
        />
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Revenue Trend */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-[#1B3C53]" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>
                  Monthly revenue and order trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Line data={revenueChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Revenue Distribution */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-[#1B3C53]" />
                  Revenue Distribution
                </CardTitle>
                <CardDescription>
                  Revenue share by company
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Doughnut data={revenueDistributionData} options={pieChartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Performance */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[#1B3C53]" />
                Company Performance
              </CardTitle>
              <CardDescription>
                Revenue comparison across all companies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Bar data={companyPerformanceChartData} options={barChartOptions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>
                  Detailed revenue analysis and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Line data={revenueChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>User Growth Analytics</CardTitle>
                <CardDescription>
                  User acquisition and engagement trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Bar data={userGrowthChartData} options={barChartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <div className="grid gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Company Performance</CardTitle>
                <CardDescription>
                  Performance metrics for all companies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-[300px]">
                    <Bar data={companyPerformanceChartData} options={barChartOptions} />
                  </div>
                  
                  {/* Company Details Table */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Company Details</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Company</th>
                            <th className="text-left p-2">Users</th>
                            <th className="text-left p-2">Revenue</th>
                            <th className="text-left p-2">Orders</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Growth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {companiesAnalytics.map((company) => (
                            <tr key={company.id} className="border-b">
                              <td className="p-2 font-medium">{company.name}</td>
                              <td className="p-2">{formatNumber(company.totalUsers)}</td>
                              <td className="p-2">{formatCurrency(company.totalRevenue)}</td>
                              <td className="p-2">{formatNumber(company.totalOrders)}</td>
                              <td className="p-2">
                                <Badge 
                                  variant={
                                    company.status === 'active' ? 'default' : 
                                    company.status === 'inactive' ? 'secondary' : 
                                    'destructive'
                                  }
                                >
                                  {company.status}
                                </Badge>
                              </td>
                              <td className="p-2">
                                <span className={`flex items-center gap-1 ${
                                  company.userGrowthRate > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {company.userGrowthRate > 0 ? (
                                    <TrendingUp className="h-3 w-3" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3" />
                                  )}
                                  {formatPercentage(company.userGrowthRate)}
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
