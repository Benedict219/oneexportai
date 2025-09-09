import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  const [documents, setDocuments] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [recentDocs, setRecentDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const { toast } = useToast();

  // Fetch templates and documents
  useEffect(() => {
    fetchTemplates();
    fetchDocuments();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('document_templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch document templates",
        variant: "destructive",
      });
    }
  };

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      setRecentDocs(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to fetch recent documents",
        variant: "destructive",
      });
    }
  };

  const handleNewDocument = () => {
    toast({
      title: "New Document",
      description: "Creating a new document...",
    });
  };

  const handleBulkUpload = () => {
    toast({
      title: "Bulk Upload",
      description: "Feature coming soon!",
    });
  };

  const handleDownloadTemplates = () => {
    toast({
      title: "Download Templates",
      description: "Downloading document templates...",
    });
  };

  const handleAutoGenerate = () => {
    toast({
      title: "Auto-Generate",
      description: "Opening AI document generator...",
    });
    // You can add logic to switch to the AI Generated tab here
  };

  const handlePreviewTemplate = (template: any) => {
    toast({
      title: "Preview",
      description: `Opening preview for ${template.name}`,
    });
  };

  const handleUseTemplate = async (template: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to use templates",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          name: `${template.name} - ${new Date().toLocaleDateString()}`,
          type: template.type,
          description: template.description,
          content: template.template_content,
          language: template.language,
          status: 'draft',
          auto_generate: false,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: `Created new document from ${template.name} template`,
      });
      
      fetchDocuments();
    } catch (error) {
      console.error('Error using template:', error);
      toast({
        title: "Error",
        description: "Failed to create document from template",
        variant: "destructive",
      });
    }
  };

  const handleShareDocument = (doc: any) => {
    toast({
      title: "Share Document",
      description: `Sharing ${doc.name}...`,
    });
  };

  const handleDownloadDocument = (doc: any) => {
    toast({
      title: "Download",
      description: `Downloading ${doc.name}...`,
    });
  };

  const generateDocumentWithAI = async () => {
    if (!clientName || !clientCountry || !productDetails) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to generate documents",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('generate-document', {
        body: {
          clientName,
          clientCountry,
          productDetails,
          language: selectedLanguage,
          documentType: "Commercial Invoice",
          userId: user.id,
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "AI document generated successfully!",
      });

      // Clear form
      setClientName("");
      setClientCountry("");
      setProductDetails("");
      setSelectedLanguage("English");
      
      // Refresh documents
      fetchDocuments();
    } catch (error) {
      console.error('Error generating document:', error);
      toast({
        title: "Error",
        description: "Failed to generate document with AI",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <Button 
            onClick={handleNewDocument}
            className="h-20 flex-col space-y-2 bg-gradient-primary text-white"
          >
            <Plus className="w-6 h-6" />
            <span>New Document</span>
          </Button>
          <Button 
            onClick={handleBulkUpload}
            variant="outline" 
            className="h-20 flex-col space-y-2"
          >
            <Upload className="w-6 h-6" />
            <span>Bulk Upload</span>
          </Button>
          <Button 
            onClick={handleDownloadTemplates}
            variant="outline" 
            className="h-20 flex-col space-y-2"
          >
            <Download className="w-6 h-6" />
            <span>Download Templates</span>
          </Button>
          <Button 
            onClick={handleAutoGenerate}
            variant="outline" 
            className="h-20 flex-col space-y-2"
          >
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
              {templates.filter(template => 
                template.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((doc) => (
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
                        <span className="font-medium">{new Date(doc.updated_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Type:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-primary-light text-primary`}>
                          Template
                        </span>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handlePreviewTemplate(doc)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleUseTemplate(doc)}
                        >
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
                  {recentDocs.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(doc.status)}
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.client_name && `Client: ${doc.client_name} • `}{new Date(doc.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleShareDocument(doc)}
                        >
                          <Share className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadDocument(doc)}
                        >
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
                    <Input 
                      id="client-name" 
                      placeholder="Enter client name..." 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                    <Input 
                      placeholder="Enter destination country..." 
                      value={clientCountry}
                      onChange={(e) => setClientCountry(e.target.value)}
                    />
                    <Input 
                      placeholder="Enter product details..." 
                      value={productDetails}
                      onChange={(e) => setProductDetails(e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>Document Language</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={selectedLanguage === "English" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedLanguage("English")}
                      >
                        English
                      </Button>
                      <Button 
                        variant={selectedLanguage === "हिंदी" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedLanguage("हिंदी")}
                      >
                        हिंदी
                      </Button>
                      <Button 
                        variant={selectedLanguage === "தமிழ்" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedLanguage("தமிழ்")}
                      >
                        தமிழ்
                      </Button>
                      <Button 
                        variant={selectedLanguage === "తెలుగు" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedLanguage("తెలుగు")}
                      >
                        తెలుగు
                      </Button>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-primary" 
                  onClick={generateDocumentWithAI}
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Documents with AI"}
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