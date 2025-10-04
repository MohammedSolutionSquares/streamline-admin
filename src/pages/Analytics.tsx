import React from 'react';
import { AnalyticsDashboard } from '../components/admin/analytics/AnalyticsDashboard';
import { AdminLayout } from '../components/admin/AdminLayout';

export default function Analytics() {
  return (
    <AdminLayout>
      <AnalyticsDashboard />
    </AdminLayout>
  );
}
