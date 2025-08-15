import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, TrendingDown, Download, Filter, Calendar, Globe, DollarSign, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();

  const exportStats = [
    {
      title: "Total Export Value",
      value: "₹2,45,00,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Orders",
      value: "47",
      change: "+8.2%",
      trend: "up", 
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Countries Served",
      value: "23",
      change: "+3",
      trend: "up",
      icon: Globe,
      color: "text-purple-600"
    },
    {
      title: "Monthly Growth",
      value: "18.7%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const topDestinations = [
    { country: "United States", value: "₹85,00,000", percentage: "34.7%" },
    { country: "Germany", value: "₹52,00,000", percentage: "21.2%" },
    { country: "United Kingdom", value: "₹38,00,000", percentage: "15.5%" },
    { country: "Australia", value: "₹28,00,000", percentage: "11.4%" },
    { country: "Canada", value: "₹22,00,000", percentage: "9.0%" }
  ];

  const topProducts = [
    { product: "Electronics Components", value: "₹78,00,000", percentage: "31.8%" },
    { product: "Textile Products", value: "₹65,00,000", percentage: "26.5%" },
    { product: "Pharmaceuticals", value: "₹45,00,000", percentage: "18.4%" },
    { product: "Food Products", value: "₹32,00,000", percentage: "13.1%" },
    { product: "Machinery Parts", value: "₹25,00,000", percentage: "10.2%" }
  ];

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

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {exportStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-medium transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
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
                    <p className="text-muted-foreground">Chart visualization would appear here</p>
                    <Button variant="outline" className="mt-4" onClick={() => navigate("/dashboard")}>
                      View Detailed Chart
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
                    <p className="text-muted-foreground">Geographic chart would appear here</p>
                    <Button variant="outline" className="mt-4" onClick={() => navigate("/dashboard")}>
                      View Map View
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
              <CardTitle>Top Export Destinations</CardTitle>
              <CardDescription>Countries with highest export values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDestinations.map((destination, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{index + 1}</Badge>
                      <div>
                        <h4 className="font-medium">{destination.country}</h4>
                        <p className="text-sm text-muted-foreground">{destination.percentage} of total exports</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{destination.value}</p>
                      <Button variant="ghost" size="sm" onClick={() => navigate("/buyers")}>
                        View Buyers
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Exported Products</CardTitle>
              <CardDescription>Products with highest export values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{index + 1}</Badge>
                      <div>
                        <h4 className="font-medium">{product.product}</h4>
                        <p className="text-sm text-muted-foreground">{product.percentage} of total exports</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{product.value}</p>
                      <Button variant="ghost" size="sm" onClick={() => navigate("/documentation")}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
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
                <h3 className="text-lg font-medium mb-2">Advanced Trend Analysis</h3>
                <p className="text-muted-foreground mb-6">Detailed trend analysis and market predictions will be available here.</p>
                <Button onClick={() => navigate("/dashboard")}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Enable Advanced Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;