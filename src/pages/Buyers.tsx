import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search, Filter, Plus, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Buyers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Buyer Discovery</h1>
          <p className="text-muted-foreground">Find verified overseas buyers for your products</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/analytics")}>
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Buyer Request
          </Button>
        </div>
      </div>

      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover Buyers</TabsTrigger>
          <TabsTrigger value="favorites">Saved Buyers</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by company name, product category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => navigate("/analytics")}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Buyer Discovery</CardTitle>
              <CardDescription>Find and connect with verified international buyers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Start Your Buyer Search</h3>
                <p className="text-muted-foreground mb-6">
                  Use our advanced search to find verified buyers matching your products and target markets.
                </p>
                <div className="space-y-4 max-w-sm mx-auto">
                  <Button className="w-full" onClick={() => navigate("/documentation")}>
                    <Search className="mr-2 h-4 w-4" />
                    Advanced Buyer Search
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate("/training")}>
                    <Globe className="mr-2 h-4 w-4" />
                    Learn About Buyer Discovery
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Buyers</CardTitle>
              <CardDescription>Buyers you've saved for future reference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Saved Buyers</h3>
                <p className="text-muted-foreground mb-6">Start saving buyers that interest you for quick access later.</p>
                <Button onClick={() => navigate("/buyers")}>
                  <Search className="mr-2 h-4 w-4" />
                  Discover Buyers
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connected" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Buyers</CardTitle>
              <CardDescription>Buyers you've successfully connected with</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Connections Yet</h3>
                <p className="text-muted-foreground mb-6">Your connected buyers will appear here once you establish business relationships.</p>
                <div className="space-y-4">
                  <Button onClick={() => navigate("/buyers")}>
                    <Users className="mr-2 h-4 w-4" />
                    Start Connecting
                  </Button>
                  <div>
                    <Button variant="outline" onClick={() => navigate("/training")}>
                      Learn How to Connect with Buyers
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

export default Buyers;