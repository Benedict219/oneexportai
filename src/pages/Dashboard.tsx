import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe, 
  DollarSign,
  Package,
  Clock,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Exports",
      value: "₹45.2L",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-secondary"
    },
    {
      title: "Active Orders",
      value: "23",
      change: "+3",
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Pending Documents",
      value: "7",
      change: "-2",
      icon: FileText,
      color: "text-accent"
    },
    {
      title: "Verified Buyers",
      value: "156",
      change: "+18",
      icon: Users,
      color: "text-secondary"
    }
  ];

  const recentDocuments = [
    { name: "Commercial Invoice", status: "completed", date: "2024-01-15" },
    { name: "Packing List", status: "pending", date: "2024-01-14" },
    { name: "Certificate of Origin", status: "completed", date: "2024-01-13" },
    { name: "GST Invoice", status: "processing", date: "2024-01-12" },
  ];

  const upcomingTasks = [
    { task: "Submit ECGC application", deadline: "2 days", priority: "high" },
    { task: "Review GST returns", deadline: "5 days", priority: "medium" },
    { task: "Update buyer verification", deadline: "1 week", priority: "low" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Rajesh Kumar
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your export business performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-medium transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-secondary">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Documents */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Recent Documents</span>
              </CardTitle>
              <CardDescription>
                Your latest export documentation activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {doc.status === "completed" ? (
                        <CheckCircle className="w-4 h-4 text-secondary" />
                      ) : doc.status === "pending" ? (
                        <Clock className="w-4 h-4 text-accent" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-primary" />
                      )}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.date}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === "completed" 
                        ? "bg-secondary-light text-secondary" 
                        : doc.status === "pending"
                        ? "bg-accent-light text-accent"
                        : "bg-primary-light text-primary"
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Documents
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Tasks & Quick Actions */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Upcoming Tasks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">{task.task}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          Due in {task.deadline}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === "high" 
                            ? "bg-destructive/20 text-destructive"
                            : task.priority === "medium"
                            ? "bg-accent-light text-accent" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Create New Invoice
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Find New Buyers
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Apply for ECGC
                </Button>
                <Button className="w-full justify-start" variant="gradient">
                  <Globe className="w-4 h-4 mr-2" />
                  Start Export Training
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Export Progress Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Monthly Export Progress</span>
            </CardTitle>
            <CardDescription>
              Track your monthly export targets and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Export Target: ₹60L</span>
                <span className="text-sm text-muted-foreground">₹45.2L achieved (75%)</span>
              </div>
              <Progress value={75} className="h-3" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-secondary">₹45.2L</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">₹12.8L</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-accent">₹2L</p>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;