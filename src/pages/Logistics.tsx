import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Ship, Plane, Package, MapPin, Clock, Search, Plus, Eye, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logistics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const shipments = [
    {
      id: "EXP-2024-001",
      destination: "New York, USA",
      mode: "ship",
      status: "in-transit",
      estimatedDelivery: "2024-03-15",
      value: "₹15,00,000",
      carrier: "Maersk Line"
    },
    {
      id: "EXP-2024-002", 
      destination: "Hamburg, Germany",
      mode: "ship",
      status: "delivered",
      estimatedDelivery: "2024-02-28",
      value: "₹8,50,000",
      carrier: "Hapag-Lloyd"
    },
    {
      id: "EXP-2024-003",
      destination: "Sydney, Australia",
      mode: "air",
      status: "preparing",
      estimatedDelivery: "2024-03-20",
      value: "₹22,00,000",
      carrier: "Emirates Cargo"
    }
  ];

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "ship": return <Ship className="h-4 w-4" />;
      case "air": return <Plane className="h-4 w-4" />;
      case "truck": return <Truck className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-transit": return <Clock className="h-4 w-4 text-blue-600" />;
      case "preparing": return <Package className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "in-transit": return "bg-blue-100 text-blue-800";
      case "preparing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Logistics Management</h1>
          <p className="text-muted-foreground">Track shipments and manage logistics operations</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/analytics")}>
            <MapPin className="mr-2 h-4 w-4" />
            Track Shipment
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            <Plus className="mr-2 h-4 w-4" />
            New Shipment
          </Button>
        </div>
      </div>

      <Tabs defaultValue="shipments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="carriers">Carriers</TabsTrigger>
          <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="shipments" className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search shipments by ID, destination, or carrier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shipments.map((shipment) => (
              <Card key={shipment.id} className="hover:shadow-medium transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{shipment.id}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(shipment.status)}
                      <Badge className={getStatusColor(shipment.status)}>
                        {shipment.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{shipment.destination}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Transport Mode</p>
                      <div className="flex items-center gap-2">
                        {getModeIcon(shipment.mode)}
                        <span className="font-medium capitalize">{shipment.mode}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Value</p>
                      <p className="font-medium">{shipment.value}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Carrier</p>
                      <p className="font-medium">{shipment.carrier}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ETA</p>
                      <p className="font-medium">{shipment.estimatedDelivery}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate("/analytics")}>
                      <Eye className="mr-2 h-4 w-4" />
                      Track
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate("/documentation")}>
                      <Package className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="carriers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logistics Partners</CardTitle>
              <CardDescription>Manage your preferred carriers and logistics partners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Truck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Carrier Management</h3>
                <p className="text-muted-foreground mb-6">Add and manage your preferred logistics carriers and service providers.</p>
                <Button onClick={() => navigate("/dashboard")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Carrier
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warehouses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Network</CardTitle>
              <CardDescription>Manage your warehouse locations and inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Warehouse Management</h3>
                <p className="text-muted-foreground mb-6">Configure your warehouse locations and track inventory across facilities.</p>
                <Button onClick={() => navigate("/dashboard")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Warehouse
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Documents</CardTitle>
              <CardDescription>Manage bills of lading, customs forms, and other shipping documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Document Management</h3>
                <p className="text-muted-foreground mb-6">Upload, organize, and track all your shipping and customs documents.</p>
                <Button onClick={() => navigate("/documentation")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Logistics;