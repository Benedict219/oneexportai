import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Share
} from "lucide-react";

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const documentTypes = [
    {
      id: 1,
      name: "Commercial Invoice",
      description: "Primary billing document for international trade",
      status: "template_ready",
      language: "English/Hindi",
      lastModified: "2024-01-15",
      autoGenerate: true
    },
    {
      id: 2,
      name: "Packing List",
      description: "Detailed list of goods being exported",
      status: "completed",
      language: "English/Tamil",
      lastModified: "2024-01-14",
      autoGenerate: true
    },
    {
      id: 3,
      name: "Certificate of Origin",
      description: "Document certifying country of manufacture",
      status: "pending",
      language: "English",
      lastModified: "2024-01-13",
      autoGenerate: false
    },
    {
      id: 4,
      name: "GST Invoice",
      description: "Tax invoice as per Indian GST regulations",
      status: "completed",
      language: "Hindi/English",
      lastModified: "2024-01-12",
      autoGenerate: true
    },
    {
      id: 5,
      name: "Shipping Bill",
      description: "Customs document for export clearance",
      status: "processing",
      language: "English/Bengali",
      lastModified: "2024-01-11",
      autoGenerate: true
    },
    {
      id: 6,
      name: "E-way Bill",
      description: "Electronic waybill for goods movement",
      status: "completed",
      language: "Telugu/English",
      lastModified: "2024-01-10",
      autoGenerate: true
    }
  ];

  const recentDocuments = [
    { name: "Commercial Invoice #INV-2024-001", client: "ABC Imports LLC", date: "2024-01-15", status: "sent" },
    { name: "Packing List #PL-2024-012", client: "XYZ Trading", date: "2024-01-14", status: "draft" },
    { name: "GST Invoice #GST-2024-045", client: "Global Exports", date: "2024-01-13", status: "approved" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "sent":
      case "approved":
        return <CheckCircle className="w-4 h-4 text-secondary" />;
      case "pending":
      case "draft":
        return <Clock className="w-4 h-4 text-accent" />;
      case "processing":
        return <AlertCircle className="w-4 h-4 text-primary" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "sent":
      case "approved":
        return "bg-secondary-light text-secondary";
      case "pending":
      case "draft":
        return "bg-accent-light text-accent";
      case "processing":
        return "bg-primary-light text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Export Documentation</h1>
          <p className="text-muted-foreground">
            AI-powered document generation with multilingual support
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Button className="h-20 flex-col space-y-2 bg-gradient-primary text-white">
            <Plus className="w-6 h-6" />
            <span>New Document</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Upload className="w-6 h-6" />
            <span>Bulk Upload</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Download className="w-6 h-6" />
            <span>Download Templates</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <FileText className="w-6 h-6" />
            <span>Auto-Generate</span>
          </Button>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Document Templates</TabsTrigger>
            <TabsTrigger value="recent">Recent Documents</TabsTrigger>
            <TabsTrigger value="generated">AI Generated</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Document Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTypes.map((doc) => (
                <Card key={doc.id} className="hover:shadow-medium transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(doc.status)}
                        <CardTitle className="text-lg">{doc.name}</CardTitle>
                      </div>
                      {doc.autoGenerate && (
                        <Badge variant="secondary" className="text-xs">
                          AI Ready
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Language:</span>
                        <span className="font-medium">{doc.language}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Modified:</span>
                        <span className="font-medium">{doc.lastModified}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>
                  Your latest document activity and submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(doc.status)}
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Client: {doc.client} • {doc.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                        <Button size="sm" variant="outline">
                          <Share className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generated" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Document Generator</CardTitle>
                <CardDescription>
                  Let our AI create your export documents automatically
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label htmlFor="client-name">Client Information</Label>
                    <Input id="client-name" placeholder="Enter client name..." />
                    <Input placeholder="Enter destination country..." />
                    <Input placeholder="Enter product details..." />
                  </div>
                  <div className="space-y-4">
                    <Label>Document Language</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">English</Button>
                      <Button variant="outline" size="sm">हिंदी</Button>
                      <Button variant="outline" size="sm">தமிழ்</Button>
                      <Button variant="outline" size="sm">తెలుగు</Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-primary">
                  Generate Documents with AI
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;