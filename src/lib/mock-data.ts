export const stats = [
    {
      label: "Average Quality Score",
      value: "92.1",
      change: "+2.5%",
      description: "from last month",
    },
    {
      label: "Vulnerabilities Found",
      value: "14",
      change: "-10.2%",
      description: "from last week",
    },
    {
      label: "Projects Analyzed",
      value: "128",
      change: "+5",
      description: "this week",
    },
    {
      label: "Active Reviews",
      value: "3",
      change: "",
      description: "currently in progress",
    }
  ];
  
  export const recentActivity = [
    {
      repo: "ProjectPhoenix/frontend",
      pr: "#281: Refactor auth flow",
      status: "Passed",
      author: "Alex Johnson",
      avatar: "https://picsum.photos/seed/avatar1/40/40",
      time: "2h ago",
    },
    {
      repo: "ProjectPhoenix/backend",
      pr: "#105: Add new payment gateway",
      status: "Needs Review",
      author: "Samantha Lee",
      avatar: "https://picsum.photos/seed/avatar2/40/40",
      time: "8h ago",
    },
    {
      repo: "CoolApp/mobile",
      pr: "#54: Fix login button style",
      status: "Failed",
      author: "David Chen",
      avatar: "https://picsum.photos/seed/avatar3/40/40",
      time: "1d ago",
    },
    {
      repo: "ProjectPhoenix/frontend",
      pr: "#280: Update dependencies",
      status: "Passed",
      author: "Maria Garcia",
      avatar: "https://picsum.photos/seed/avatar4/40/40",
      time: "2d ago",
    },
  ];
  
  export const qualityChartData = [
    { date: "Jan", "ProjectPhoenix/frontend": 88, "ProjectPhoenix/backend": 82 },
    { date: "Feb", "ProjectPhoenix/frontend": 91, "ProjectPhoenix/backend": 85 },
    { date: "Mar", "ProjectPhoenix/frontend": 90, "ProjectPhoenix/backend": 89 },
    { date: "Apr", "ProjectPhoenix/frontend": 93, "ProjectPhoenix/backend": 90 },
    { date: "May", "ProjectPhoenix/frontend": 95, "ProjectPhoenix/backend": 91 },
    { date: "Jun", "ProjectPhoenix/frontend": 92, "ProjectPhoenix/backend": 94 },
  ];
  
  export const qualityChartConfig = {
    "ProjectPhoenix/frontend": {
      label: "Frontend",
      color: "hsl(var(--chart-1))",
    },
    "ProjectPhoenix/backend": {
      label: "Backend",
      color: "hsl(var(--chart-2))",
    },
  };
  