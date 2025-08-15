import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play, Search, Filter, Star, Clock, CheckCircle, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Training = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Export Fundamentals",
      description: "Complete guide to starting your export business",
      duration: "2 hours",
      level: "Beginner",
      rating: 4.8,
      students: 1250,
      progress: 0,
      status: "not-started",
      language: "Hindi",
      modules: 8
    },
    {
      id: 2,
      title: "International Trade Documentation",
      description: "Master export documentation and compliance",
      duration: "3.5 hours",
      level: "Intermediate",
      rating: 4.7,
      students: 850,
      progress: 65,
      status: "in-progress",
      language: "English",
      modules: 12
    },
    {
      id: 3,
      title: "Digital Marketing for Exporters",
      description: "Leverage digital channels to find international buyers",
      duration: "1.5 hours",
      level: "Beginner",
      rating: 4.9,
      students: 950,
      progress: 100,
      status: "completed",
      language: "Tamil",
      modules: 6
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "not-started": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Export Training</h1>
          <p className="text-muted-foreground">Learn export business with video tutorials in regional languages</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/analytics")}>
            <Filter className="mr-2 h-4 w-4" />
            Filter Courses
          </Button>
          <Button onClick={() => navigate("/documentation")}>
            <BookOpen className="mr-2 h-4 w-4" />
            Browse Library
          </Button>
        </div>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="browse">Browse All</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-medium transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(course.status)}>
                      {course.status === "not-started" ? "New" : 
                       course.status === "in-progress" ? "In Progress" : "Completed"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <Badge className={getLevelColor(course.level)} variant="outline">
                      {course.level}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{course.students} students</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="w-full" />
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {course.modules} modules • {course.language}
                  </div>

                  <div className="flex gap-2">
                    {course.status === "completed" ? (
                      <Button variant="outline" size="sm" onClick={() => navigate("/documentation")}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Review
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => navigate("/dashboard")}>
                        <Play className="mr-2 h-4 w-4" />
                        {course.status === "not-started" ? "Start Course" : "Continue"}
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => navigate("/analytics")}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="browse" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Library</CardTitle>
              <CardDescription>Browse all available training courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Extensive Course Library</h3>
                <p className="text-muted-foreground mb-6">Access hundreds of courses covering all aspects of international trade.</p>
                <Button onClick={() => navigate("/documentation")}>
                  <Search className="mr-2 h-4 w-4" />
                  Browse All Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Track your learning journey and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">3</div>
                    <p className="text-muted-foreground">Courses Enrolled</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">1</div>
                    <p className="text-muted-foreground">Courses Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">55%</div>
                    <p className="text-muted-foreground">Average Progress</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Recent Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Completed: Digital Marketing for Exporters</p>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Module 8 progress in International Trade Documentation</p>
                        <p className="text-sm text-muted-foreground">1 week ago</p>
                      </div>
                      <Play className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
              <CardDescription>Your earned certificates and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Earn Your First Certificate</h3>
                <p className="text-muted-foreground mb-6">Complete courses to earn certificates and showcase your expertise.</p>
                <Button onClick={() => navigate("/training")}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Start Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Training;