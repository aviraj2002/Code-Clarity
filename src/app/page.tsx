import { PageHeader } from '@/components/page-header';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { QualityChart } from '@/components/dashboard/quality-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { recentActivity } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's a summary of your code analysis."
      />
      <StatsCards />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Code Quality Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <QualityChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity items={recentActivity} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
