import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Calendar, MapPin, User } from "lucide-react";

const CMERegistration = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    registrationNumber: "",
    email: "",
    phone: "",
    specialty: "",
    hospital: "",
    district: "",
    eventType: "",
    eventDate: "",
    eventVenue: "",
    description: ""
  });

  const districts = [
    "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", 
    "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam",
    "Vizianagaram", "West Godavari", "Kadapa"
  ];

  const specialties = [
    "General Medicine", "General Surgery", "Pediatrics", "Gynecology",
    "Orthopedics", "Cardiology", "Neurology", "Dermatology",
    "Psychiatry", "Radiology", "Anesthesiology", "Pathology",
    "Ophthalmology", "ENT", "Urology", "Other"
  ];

  const eventTypes = [
    "Workshop", "Seminar", "Conference", "Training Program",
    "Certification Course", "Symposium", "Webinar", "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Registration Submitted",
      description: "Your CME registration has been submitted successfully. You will receive a confirmation email shortly.",
    });

    setIsSubmitting(false);
    // Reset form
    setFormData({
      fullName: "",
      registrationNumber: "",
      email: "",
      phone: "",
      specialty: "",
      hospital: "",
      district: "",
      eventType: "",
      eventDate: "",
      eventVenue: "",
      description: ""
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              CME Registration
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Register for Continuing Medical Education programs to maintain your professional development 
              and meet regulatory requirements.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="bg-primary text-white">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText size={24} />
                CME Program Registration Form
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="text-primary" size={20} />
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationNumber">Medical Registration Number *</Label>
                      <Input
                        id="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                        placeholder="APMC/XXXX/YYYY"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 XXXXXXXXXX"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Medical Specialty *</Label>
                      <Select onValueChange={(value) => handleInputChange("specialty", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital">Hospital/Institution</Label>
                      <Input
                        id="hospital"
                        value={formData.hospital}
                        onChange={(e) => handleInputChange("hospital", e.target.value)}
                        placeholder="Your workplace"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District *</Label>
                    <Select onValueChange={(value) => handleInputChange("district", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Event Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="text-primary" size={20} />
                    <h3 className="text-lg font-semibold">Event Information</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("eventType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Preferred Event Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => handleInputChange("eventDate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventVenue">Preferred Venue</Label>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-gray-400" size={16} />
                      <Input
                        id="eventVenue"
                        value={formData.eventVenue}
                        onChange={(e) => handleInputChange("eventVenue", e.target.value)}
                        placeholder="Enter preferred venue or location"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Additional Requirements</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Please describe any specific requirements or topics you'd like to be covered..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">CME Requirements</h4>
                <p className="text-sm text-gray-600">
                  Medical practitioners must complete a minimum of 30 CME credit hours annually 
                  to maintain their license validity.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Certification</h4>
                <p className="text-sm text-gray-600">
                  Upon completion, you will receive a digital certificate that can be used 
                  for license renewal and professional development records.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CMERegistration;