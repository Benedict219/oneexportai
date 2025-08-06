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
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            🇮🇳 Made for Indian Exporters
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            India's First <span className="bg-gradient-primary bg-clip-text text-transparent">Multilingual</span>
            <br />Export Management Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
            From zero export knowledge to global success. Complete AI-powered export solution with 
            documentation, buyer discovery, ECGC integration, and training in your regional language.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="xl" className="bg-gradient-primary text-white shadow-strong hover:shadow-medium transform hover:scale-105 transition-all duration-200">
              Start Your Export Journey
              <TrendingUp className="w-5 h-5 ml-2" />
            </Button>
            <Button size="xl" variant="outline">
              Watch Demo (हिंदी)
              <Globe className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Export Successfully
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive export management solution designed specifically for Indian businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-medium transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="w-8 h-8 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {feature.highlight}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Exporters Across India
            </h2>
            <p className="text-lg text-muted-foreground">
              See how ExportSetu is helping businesses export successfully
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-accent" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-sm mb-2 italic">
                    "{testimonial.text}"
                  </blockquote>
                  {testimonial.translation && (
                    <p className="text-xs text-muted-foreground">
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
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Export Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Indian exporters who have transformed their business with ExportSetu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Start Free Trial
              <Zap className="w-5 h-5 ml-2" />
            </Button>
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
              Schedule Demo Call
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-80">
            ✓ 14-day free trial ✓ No credit card required ✓ Full multilingual support
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
