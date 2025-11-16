import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RecentActivityItem = {
    repo: string;
    pr: string;
    status: "Passed" | "Failed" | "Needs Review";
    author: string;
    avatar: string;
    time: string;
};

type RecentActivityProps = {
    items: RecentActivityItem[];
};

export function RecentActivity({ items }: RecentActivityProps) {
    return (
        <div className="space-y-6">
            {items.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={item.avatar} alt={item.author} data-ai-hint="person face" />
                        <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {item.repo}
                        </p>
                        <p className="text-sm text-muted-foreground">{item.pr}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <Badge variant={
                            item.status === 'Passed' ? 'secondary' : item.status === 'Failed' ? 'destructive' : 'default'
                        }
                        className={cn(item.status === 'Passed' && 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800')}>
                            {item.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
