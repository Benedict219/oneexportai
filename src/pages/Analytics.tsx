import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Download, Filter, Calendar, Globe, DollarSign, Package, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Export Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into your export performance</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/documentation")}>
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            <Filter className="mr-2 h-4 w-4" />
            Filter Data
          </Button>
          <Button onClick={() => navigate("/documentation")}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Empty State - No Data */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="hover:shadow-medium transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Export Value</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹0</div>
            <p className="text-xs text-muted-foreground">
              Start exporting to see data
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Create your first order
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries Served</CardTitle>
            <Globe className="h-4 w-4 text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Find buyers globally
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">
              Track growth over time
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Export Performance</CardTitle>
                <CardDescription>Monthly export values over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Export Data</h3>
                    <p className="text-muted-foreground mb-4">Start creating export documents to see performance charts</p>
                    <Button onClick={() => navigate("/documentation")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Document
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
                <CardDescription>Export value distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Regional Data</h3>
                    <p className="text-muted-foreground mb-4">Connect with buyers to see geographic distribution</p>
                    <Button onClick={() => navigate("/buyers")}>
                      <Globe className="mr-2 h-4 w-4" />
                      Find Buyers
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="destinations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Destinations</CardTitle>
              <CardDescription>Countries you're exporting to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Export Destinations</h3>
                <p className="text-muted-foreground mb-6">Start connecting with international buyers to see your export destinations.</p>
                <Button onClick={() => navigate("/buyers")}>
                  <Globe className="mr-2 h-4 w-4" />
                  Discover Buyers
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exported Products</CardTitle>
              <CardDescription>Your product performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Product Data</h3>
                <p className="text-muted-foreground mb-6">Create export documents to track your product performance.</p>
                <Button onClick={() => navigate("/documentation")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Export Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>Analysis of export trends and market opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Advanced Analytics Available</h3>
                <p className="text-muted-foreground mb-6">Upgrade to access detailed trend analysis and market predictions.</p>
                <div className="space-y-4">
                  <Button onClick={() => navigate("/dashboard")}>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Upgrade for Advanced Analytics
                  </Button>
                  <div>
                    <Button variant="outline" onClick={() => navigate("/training")}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Learn About Market Analysis
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;