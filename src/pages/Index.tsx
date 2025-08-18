import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  FileText, 
  Users, 
  BarChart3, 
  Shield, 
  Truck, 
  BookOpen, 
  Star,
  CheckCircle,
  TrendingUp,
  Zap,
  Languages,
  Brain,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Languages,
      title: "Multilingual Support",
      description: "Complete interface in Hindi, Tamil, Telugu, Bengali, Marathi, Malayalam and more regional languages.",
      highlight: "First in India"
    },
    {
      icon: Brain,
      title: "AI-Powered Automation",
      description: "Automatically generate export documentation, GST integration, and smart compliance tracking.",
      highlight: "Smart AI"
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Visual analytics for exports, GST refunds, payment status, and market demand insights.",
      highlight: "Advanced BI"
    },
    {
      icon: Users,
      title: "Buyer Discovery",
      description: "AI-powered tool to discover verified overseas buyers with fraud risk analysis.",
      highlight: "Verified Buyers"
    },
    {
      icon: Shield,
      title: "ECGC Integration",
      description: "Export Credit Guarantee Corporation policies explained and directly accessible.",
      highlight: "Insurance Ready"
    },
    {
      icon: BookOpen,
      title: "Beginner Training",
      description: "Video tutorials and guides in regional languages for zero-knowledge exporters.",
      highlight: "Learn & Export"
    }
  ];

  const testimonials = [
    {
      name: "राजेश कुमार",
      location: "Mumbai, Maharashtra", 
      text: "एक्सपोर्ट सेतु ने मेरे निर्यात व्यापार को बिल्कुल बदल दिया है। अब मैं आसानी से दस्तावेज बना सकता हूं।",
      translation: "ExportSetu has completely transformed my export business. Now I can easily create documents.",
      rating: 5
    },
    {
      name: "முruகன் செட்टियார்",
      location: "Chennai, Tamil Nadu",
      text: "வியாபார நுண்ணறிவு அம்சங்கள் மிகவும் உதவியாக உள்ளன. எனது ஏற்றுமதி இலக்குகளை அடைய முடிந்தது.",
      translation: "The business intelligence features are very helpful. I was able to achieve my export targets.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      location: "Bangalore, Karnataka",
      text: "As a first-time exporter, the step-by-step training modules helped me understand the entire process easily.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "Exporters Onboarded" },
    { number: "₹500Cr+", label: "Export Value Processed" },
    { number: "50,000+", label: "Documents Generated" },
    { number: "8", label: "Regional Languages" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden animated-gradient">
        <div className="absolute inset-0 bg-gradient-soft opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6 text-sm font-medium glass hover-glow pulse-glow">
            🇮🇳 Made for Indian Exporters
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            <span className="gradient-text float">OneExportAI</span>
            <br />
            <span className="text-foreground">India's First Multilingual Export Platform</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
            From zero export knowledge to global success. Complete AI-powered export solution with 
            documentation, buyer discovery, ECGC integration, and training in your regional language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/dashboard">
              <Button size="xl" className="bg-gradient-primary text-white shadow-premium hover-lift btn-premium group">
                Start Your Export Journey
                <TrendingUp className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link to="/training">
              <Button size="xl" variant="outline" className="glass hover-glow">
                Watch Demo (हिंदी)
                <Globe className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-lg glass hover-lift">
                <p className="text-3xl font-bold gradient-text mb-2">{stat.number}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-soft">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to <span className="gradient-text">Export Successfully</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive export management solution designed specifically for Indian businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const getFeatureLink = () => {
                switch(feature.title) {
                  case "Business Intelligence": return "/analytics";
                  case "Buyer Discovery": return "/buyers";
                  case "ECGC Integration": return "/insurance";
                  case "Beginner Training": return "/training";
                  default: return "/dashboard";
                }
              };
              
              return (
                <Link key={index} to={getFeatureLink()}>
                  <Card className="hover-lift hover-glow group bg-gradient-card border-0 shadow-soft overflow-hidden">
                    <CardHeader className="relative">
                      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-between mb-2 relative z-10">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <Badge variant="secondary" className="text-xs font-semibold glass">
                          {feature.highlight}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-card opacity-50"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by <span className="gradient-text">Exporters Across India</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              See how OneExportAI is helping businesses export successfully
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass hover-lift hover-glow group shadow-premium">
                <CardHeader className="relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary opacity-10 rounded-full blur-xl"></div>
                  <div className="flex items-center space-x-1 mb-4 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current text-accent group-hover:scale-110 transition-transform" style={{transitionDelay: `${i * 50}ms`}} />
                    ))}
                  </div>
                  <CardTitle className="text-lg font-bold">{testimonial.name}</CardTitle>
                  <CardDescription className="font-medium">{testimonial.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-sm mb-3 italic leading-relaxed border-l-4 border-primary/20 pl-4">
                    "{testimonial.text}"
                  </blockquote>
                  {testimonial.translation && (
                    <p className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                      Translation: "{testimonial.translation}"
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Ready to Start Your <span className="text-accent">Export Journey?</span>
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-slide-up">
            Join thousands of Indian exporters who have transformed their business with OneExportAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/dashboard">
              <Button size="xl" variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-premium hover-lift btn-premium group">
                Start Free Trial
                <Zap className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link to="/training">
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10 glass hover-glow">
                Schedule Demo Call
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm opacity-80 glass p-4 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>Full multilingual support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
