import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Ship, Plane, Package, MapPin, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logistics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

          <Card>
            <CardHeader>
              <CardTitle>Your Shipments</CardTitle>
              <CardDescription>Track and manage your export shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Ship className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Shipments Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first export shipment to start tracking your logistics.
                </p>
                <div className="space-y-4">
                  <Button onClick={() => navigate("/dashboard")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Shipment
                  </Button>
                  <div>
                    <Button variant="outline" onClick={() => navigate("/training")}>
                      Learn About Export Logistics
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                <h3 className="text-lg font-medium mb-2">No Carriers Added</h3>
                <p className="text-muted-foreground mb-6">Add and manage your preferred logistics carriers and service providers.</p>
                <div className="space-y-4">
                  <Button onClick={() => navigate("/dashboard")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Carrier
                  </Button>
                  <div>
                    <Button variant="outline" onClick={() => navigate("/training")}>
                      Find Trusted Carriers
                    </Button>
                  </div>
                </div>
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
                <h3 className="text-lg font-medium mb-2">No Warehouses Configured</h3>
                <p className="text-muted-foreground mb-6">Configure your warehouse locations and track inventory across facilities.</p>
                <div className="space-y-4">
                  <Button onClick={() => navigate("/dashboard")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Warehouse
                  </Button>
                  <div>
                    <Button variant="outline" onClick={() => navigate("/training")}>
                      Warehouse Management Guide
                    </Button>
                  </div>
                </div>
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
                <h3 className="text-lg font-medium mb-2">No Shipping Documents</h3>
                <p className="text-muted-foreground mb-6">Upload, organize, and track all your shipping and customs documents.</p>
                <div className="space-y-4">
                  <Button onClick={() => navigate("/documentation")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                  <div>
                    <Button variant="outline" onClick={() => navigate("/training")}>
                      Learn About Shipping Documents
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

export default Logistics;