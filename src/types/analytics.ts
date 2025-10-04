export interface CompanyAnalytics {
  id: string;
  name: string;
  totalUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  monthlyOrders: number;
  activeUsers: number;
  userGrowthRate: number;
  revenueGrowthRate: number;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActivity: string;
}

export interface SystemAnalytics {
  totalCompanies: number;
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  monthlyRevenue: number;
  monthlyOrders: number;
  monthlyUserGrowth: number;
  monthlyRevenueGrowth: number;
  averageRevenuePerUser: number;
  averageOrderValue: number;
  systemUptime: number;
  activeCompanies: number;
  newCompaniesThisMonth: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
  users: number;
  companies: number;
}

export interface UserGrowthData {
  month: string;
  newUsers: number;
  activeUsers: number;
  totalUsers: number;
}

export interface CompanyPerformanceData {
  companyId: string;
  companyName: string;
  revenue: number;
  orders: number;
  users: number;
  efficiency: number; // orders per user
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}

export interface AnalyticsTimeRange {
  label: string;
  value: '7d' | '30d' | '90d' | '1y' | 'all';
  days: number;
}
