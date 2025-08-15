import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search, Filter, Plus, Eye, Star, MapPin, Globe, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Buyers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const buyers = [
    {
      id: 1,
      name: "Global Trading Co.",
      country: "United States",
      city: "New York",
      rating: 4.8,
      verified: true,
      category: "Electronics",
      email: "contact@globaltrading.com",
      phone: "+1-555-0123",
      description: "Leading importer of electronic components and consumer electronics"
    },
    {
      id: 2,
      name: "European Imports Ltd",
      country: "Germany",
      city: "Hamburg",
      rating: 4.6,
      verified: true,
      category: "Textiles",
      email: "info@europeanports.de",
      phone: "+49-40-123456",
      description: "Specialized in high-quality textile imports from Asia"
    },
    {
      id: 3,
      name: "Pacific Trading House",
      country: "Australia",
      city: "Sydney",
      rating: 4.5,
      verified: false,
      category: "Food Products",
      email: "sales@pacifictrade.au",
      phone: "+61-2-9876543",
      description: "Major distributor of food products and agricultural goods"
    }
  ];

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
            Add Buyer
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {buyers.map((buyer) => (
              <Card key={buyer.id} className="hover:shadow-medium transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{buyer.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{buyer.city}, {buyer.country}</span>
                      </div>
                    </div>
                    {buyer.verified && (
                      <Badge className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{buyer.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{buyer.rating}</span>
                    </div>
                    <Badge variant="outline">{buyer.category}</Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{buyer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{buyer.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate("/documentation")}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                    <Button size="sm" onClick={() => navigate("/dashboard")}>
                      <Users className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                <Button onClick={() => navigate("/buyers")}>
                  <Users className="mr-2 h-4 w-4" />
                  Start Connecting
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Buyers;