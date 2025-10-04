import { 
  CompanyAnalytics, 
  SystemAnalytics, 
  RevenueData, 
  UserGrowthData, 
  CompanyPerformanceData,
  AnalyticsTimeRange 
} from '../types/analytics';

// Mock system analytics data
export const systemAnalytics: SystemAnalytics = {
  totalCompanies: 24,
  totalUsers: 1247,
  totalRevenue: 452310,
  totalOrders: 5489,
  monthlyRevenue: 67250,
  monthlyOrders: 823,
  monthlyUserGrowth: 12.5,
  monthlyRevenueGrowth: 18.3,
  averageRevenuePerUser: 362.8,
  averageOrderValue: 82.4,
  systemUptime: 99.7,
  activeCompanies: 21,
  newCompaniesThisMonth: 3
};

// Mock company analytics data
export const companiesAnalytics: CompanyAnalytics[] = [
  {
    id: '1',
    name: 'PureWater Solutions',
    totalUsers: 245,
    totalRevenue: 89250,
    monthlyRevenue: 12500,
    totalOrders: 1080,
    monthlyOrders: 145,
    activeUsers: 198,
    userGrowthRate: 15.2,
    revenueGrowthRate: 22.1,
    status: 'active',
    joinDate: '2023-01-15',
    lastActivity: '2024-01-20'
  },
  {
    id: '2',
    name: 'AquaFresh Delivery',
    totalUsers: 156,
    totalRevenue: 67800,
    monthlyRevenue: 8900,
    totalOrders: 745,
    monthlyOrders: 98,
    activeUsers: 134,
    userGrowthRate: 8.7,
    revenueGrowthRate: 14.5,
    status: 'active',
    joinDate: '2023-03-22',
    lastActivity: '2024-01-19'
  },
  {
    id: '3',
    name: 'Crystal Clear Water',
    totalUsers: 312,
    totalRevenue: 145600,
    monthlyRevenue: 18200,
    totalOrders: 1650,
    monthlyOrders: 208,
    activeUsers: 278,
    userGrowthRate: 19.8,
    revenueGrowthRate: 28.3,
    status: 'active',
    joinDate: '2022-11-08',
    lastActivity: '2024-01-20'
  },
  {
    id: '4',
    name: 'Blue Drop Services',
    totalUsers: 89,
    totalRevenue: 32400,
    monthlyRevenue: 4200,
    totalOrders: 365,
    monthlyOrders: 48,
    activeUsers: 67,
    userGrowthRate: 5.2,
    revenueGrowthRate: 9.8,
    status: 'active',
    joinDate: '2023-07-12',
    lastActivity: '2024-01-18'
  },
  {
    id: '5',
    name: 'HydroMax Delivery',
    totalUsers: 203,
    totalRevenue: 78100,
    monthlyRevenue: 10200,
    totalOrders: 890,
    monthlyOrders: 112,
    activeUsers: 175,
    userGrowthRate: 12.3,
    revenueGrowthRate: 16.7,
    status: 'active',
    joinDate: '2023-02-28',
    lastActivity: '2024-01-20'
  },
  {
    id: '6',
    name: 'AquaPure Systems',
    totalUsers: 67,
    totalRevenue: 23400,
    monthlyRevenue: 3100,
    totalOrders: 267,
    monthlyOrders: 35,
    activeUsers: 52,
    userGrowthRate: 3.1,
    revenueGrowthRate: 7.2,
    status: 'inactive',
    joinDate: '2023-09-15',
    lastActivity: '2024-01-10'
  }
];

// Mock revenue data for charts
export const revenueData: RevenueData[] = [
  { month: 'Jul 2023', revenue: 38450, orders: 456, users: 892, companies: 18 },
  { month: 'Aug 2023', revenue: 42100, orders: 512, users: 945, companies: 19 },
  { month: 'Sep 2023', revenue: 45800, orders: 567, users: 1023, companies: 20 },
  { month: 'Oct 2023', revenue: 49200, orders: 612, users: 1089, companies: 21 },
  { month: 'Nov 2023', revenue: 53600, orders: 678, users: 1156, companies: 22 },
  { month: 'Dec 2023', revenue: 58900, orders: 734, users: 1189, companies: 22 },
  { month: 'Jan 2024', revenue: 67250, orders: 823, users: 1247, companies: 24 }
];

// Mock user growth data
export const userGrowthData: UserGrowthData[] = [
  { month: 'Jul 2023', newUsers: 45, activeUsers: 892, totalUsers: 892 },
  { month: 'Aug 2023', newUsers: 53, activeUsers: 945, totalUsers: 945 },
  { month: 'Sep 2023', newUsers: 78, activeUsers: 1023, totalUsers: 1023 },
  { month: 'Oct 2023', newUsers: 66, activeUsers: 1089, totalUsers: 1089 },
  { month: 'Nov 2023', newUsers: 67, activeUsers: 1156, totalUsers: 1156 },
  { month: 'Dec 2023', newUsers: 33, activeUsers: 1189, totalUsers: 1189 },
  { month: 'Jan 2024', newUsers: 58, activeUsers: 1247, totalUsers: 1247 }
];

// Mock company performance data
export const companyPerformanceData: CompanyPerformanceData[] = [
  { companyId: '1', companyName: 'Crystal Clear Water', revenue: 145600, orders: 1650, users: 312, efficiency: 5.3 },
  { companyId: '2', companyName: 'PureWater Solutions', revenue: 89250, orders: 1080, users: 245, efficiency: 4.4 },
  { companyId: '3', companyName: 'HydroMax Delivery', revenue: 78100, orders: 890, users: 203, efficiency: 4.4 },
  { companyId: '4', companyName: 'AquaFresh Delivery', revenue: 67800, orders: 745, users: 156, efficiency: 4.8 },
  { companyId: '5', companyName: 'Blue Drop Services', revenue: 32400, orders: 365, users: 89, efficiency: 4.1 },
  { companyId: '6', companyName: 'AquaPure Systems', revenue: 23400, orders: 267, users: 67, efficiency: 4.0 }
];

// Time range options for analytics
export const timeRangeOptions: AnalyticsTimeRange[] = [
  { label: 'Last 7 days', value: '7d', days: 7 },
  { label: 'Last 30 days', value: '30d', days: 30 },
  { label: 'Last 90 days', value: '90d', days: 90 },
  { label: 'Last year', value: '1y', days: 365 },
  { label: 'All time', value: 'all', days: 0 }
];

// Chart color schemes
export const chartColors = {
  primary: '#1B3C53',
  secondary: '#2D5A77',
  accent: '#4A90A4',
  success: '#52C41A',
  warning: '#FAAD14',
  error: '#F5222D',
  info: '#1890FF',
  gradient: ['#1B3C53', '#2D5A77', '#4A90A4', '#6BB6CC', '#8CC8E0']
};

// Helper functions for data formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatPercentage = (num: number): string => {
  return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
};
