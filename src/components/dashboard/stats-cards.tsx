import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { stats } from '@/lib/mock-data';
import { ArrowUp, ArrowDown, Star, Shield, FolderGit, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  "Average Quality Score": <Star className="size-6 text-muted-foreground" />,
  "Vulnerabilities Found": <Shield className="size-6 text-muted-foreground" />,
  "Projects Analyzed": <FolderGit className="size-6 text-muted-foreground" />,
  "Active Reviews": <ScanLine className="size-6 text-muted-foreground" />,
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            {iconMap[stat.label as keyof typeof iconMap]}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stat.change && (
                <span className={cn(
                  "flex items-center gap-1 mr-2",
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                )}>
                  {stat.change.startsWith('+') ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                  {stat.change}
                </span>
              )}
              <span>{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
