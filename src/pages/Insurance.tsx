import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, Plus, Search, Filter, Download, Upload, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Insurance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const insurancePolicies = [
    {
      id: 1,
      type: "Export Credit Insurance",
      provider: "ECGC",
      coverage: "₹10,00,000",
      premium: "₹25,000",
      status: "active",
      expiryDate: "2024-12-31",
      description: "Comprehensive coverage for export credit risks"
    },
    {
      id: 2,
      type: "Marine Cargo Insurance",
      provider: "Oriental Insurance",
      coverage: "₹5,00,000",
      premium: "₹15,000",
      status: "pending",
      expiryDate: "2024-11-15",
      description: "Protection against loss or damage of goods in transit"
    },
    {
      id: 3,
      type: "Product Liability Insurance",
      provider: "Bajaj Allianz",
      coverage: "₹20,00,000",
      premium: "₹35,000",
      status: "expired",
      expiryDate: "2024-06-30",
      description: "Coverage for product-related liability claims"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "expired": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Insurance Management</h1>
          <p className="text-muted-foreground">Manage your export insurance policies and coverage</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/documentation")}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Policy
          </Button>
          <Button variant="outline" onClick={() => navigate("/analytics")}>
            <Download className="mr-2 h-4 w-4" />
            Download Reports
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            <Plus className="mr-2 h-4 w-4" />
            New Policy
          </Button>
        </div>
      </div>

      <Tabs defaultValue="policies" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="policies">Active Policies</TabsTrigger>
          <TabsTrigger value="quotes">Get Quotes</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" onClick={() => navigate("/analytics")}>
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insurancePolicies.map((policy) => (
              <Card key={policy.id} className="hover:shadow-medium transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{policy.type}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(policy.status)}
                      <Badge className={getStatusColor(policy.status)}>
                        {policy.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{policy.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Provider</p>
                      <p className="font-medium">{policy.provider}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Coverage</p>
                      <p className="font-medium">{policy.coverage}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Premium</p>
                      <p className="font-medium">{policy.premium}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expiry</p>
                      <p className="font-medium">{policy.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate("/documentation")}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quotes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get Insurance Quote</CardTitle>
              <CardDescription>Fill out the form below to get personalized insurance quotes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Enter your company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverage-type">Coverage Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="export-credit">Export Credit Insurance</SelectItem>
                      <SelectItem value="marine-cargo">Marine Cargo Insurance</SelectItem>
                      <SelectItem value="product-liability">Product Liability Insurance</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive Coverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverage-amount">Coverage Amount (₹)</Label>
                  <Input id="coverage-amount" placeholder="Enter desired coverage amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="export-destination">Export Destination</Label>
                  <Input id="export-destination" placeholder="Enter destination country" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea 
                  id="additional-info" 
                  placeholder="Provide any additional details about your insurance needs..."
                  rows={4}
                />
              </div>
              <div className="flex gap-4">
                <Button onClick={() => navigate("/documentation")}>
                  <Shield className="mr-2 h-4 w-4" />
                  Get Quote
                </Button>
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Claims</CardTitle>
              <CardDescription>Track and manage your insurance claims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Active Claims</h3>
                <p className="text-muted-foreground mb-6">You don't have any active insurance claims at the moment.</p>
                <Button onClick={() => navigate("/documentation")}>
                  <Plus className="mr-2 h-4 w-4" />
                  File New Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Insurance;