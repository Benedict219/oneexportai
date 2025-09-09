import Layout from "../components/Layout";
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
  CheckCircle,
  Plus,
  Brain,
  Search,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout showNavbar={true}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to OneExportAI
          </h1>
          <p className="text-muted-foreground">
            Start your export journey with our comprehensive AI-powered platform.
          </p>
        </div>

        {/* AI Features Highlight */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                AI-Powered Trade Analytics
              </CardTitle>
              <CardDescription>
                Search by product name or HS code to get comprehensive trade analytics and AI-powered insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <Search className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Smart Product Search</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium">Trade Data Analytics</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <Brain className="w-5 h-5 text-accent-foreground" />
                  <span className="text-sm font-medium">AI Market Insights</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-medium transition-all duration-200 cursor-pointer" onClick={() => navigate("/documentation")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Documentation
              </CardTitle>
              <FileText className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Get Started</div>
              <p className="text-xs text-muted-foreground">
                Create export documents
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-200 cursor-pointer" onClick={() => navigate("/buyers")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Find Buyers
              </CardTitle>
              <Users className="w-4 h-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">Discover</div>
              <p className="text-xs text-muted-foreground">
                Connect with verified buyers
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-200 cursor-pointer" onClick={() => navigate("/analytics")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Analytics
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-foreground">Analyze</div>
              <p className="text-xs text-muted-foreground">
                Track your performance
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-200 cursor-pointer" onClick={() => navigate("/training")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Training
              </CardTitle>
              <Globe className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Learn</div>
              <p className="text-xs text-muted-foreground">
                Export training modules
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Getting Started */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Getting Started</span>
              </CardTitle>
              <CardDescription>
                Complete these steps to start exporting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-secondary" />
                    <div>
                      <p className="font-medium">Account Setup</p>
                      <p className="text-sm text-muted-foreground">Complete your profile</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary-light text-secondary">
                    Completed
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">Create First Export Document</p>
                      <p className="text-sm text-muted-foreground">Generate your invoice or certificate</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => navigate("/documentation")}>
                    Start Now
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Find Your First Buyer</p>
                      <p className="text-sm text-muted-foreground">Connect with verified overseas buyers</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate("/buyers")}>
                    Explore
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Resources */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" onClick={() => navigate("/documentation")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/buyers")}>
                  <Users className="w-4 h-4 mr-2" />
                  Find Buyers
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/insurance")}>
                  <Shield className="w-4 h-4 mr-2" />
                  Get Insurance
                </Button>
                <Button className="w-full justify-start" onClick={() => navigate("/training")}>
                  <Globe className="w-4 h-4 mr-2" />
                  Start Training
                </Button>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
                <CardDescription>Essential export resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-sm">Export Regulations</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Latest government guidelines
                  </p>
                  <Button size="sm" variant="outline" onClick={() => navigate("/documentation")}>
                    View Guide
                  </Button>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-sm">GST for Exporters</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Complete GST compliance guide
                  </p>
                  <Button size="sm" variant="outline" onClick={() => navigate("/documentation")}>
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Your Export Journey</span>
            </CardTitle>
            <CardDescription>
              Track your progress on OneExportAI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm text-muted-foreground">100% completed</span>
              </div>
              <Progress value={100} className="h-3" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-secondary">0</p>
                  <p className="text-sm text-muted-foreground">Documents Created</p>
                  <Button size="sm" className="mt-2" onClick={() => navigate("/documentation")}>
                    <Plus className="w-3 h-3 mr-1" />
                    Create First
                  </Button>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground">Buyer Connections</p>
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => navigate("/buyers")}>
                    <Plus className="w-3 h-3 mr-1" />
                    Find Buyers
                  </Button>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-accent-foreground">0</p>
                  <p className="text-sm text-muted-foreground">Export Value</p>
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => navigate("/analytics")}>
                    View Analytics
                  </Button>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">0%</p>
                  <p className="text-sm text-muted-foreground">Training Progress</p>
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => navigate("/training")}>
                    Start Learning
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </Layout>
  );
};

export default Dashboard;