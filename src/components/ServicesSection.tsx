import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Shield, 
  RefreshCw, 
  CheckCircle, 
  Upload, 
  BarChart3, 
  Award,
  ArrowRight 
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Doctor Registration",
      description: "Register as a medical practitioner in Andhra Pradesh. Complete online application with document verification.",
      icon: FileText,
      color: "bg-blue-600",
      features: ["Online Application", "Document Upload", "Status Tracking", "Digital Certificate"],
      buttonText: "Apply Now",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "License Verification",
      description: "Verify the authenticity of medical licenses and professional credentials instantly.",
      icon: Shield,
      color: "bg-primary",
      features: ["Instant Verification", "QR Code Scanning", "Bulk Verification", "API Access"],
      buttonText: "Verify Now",
      buttonColor: "bg-primary hover:bg-primary/90"
    },
    {
      title: "License Renewal",
      description: "Renew your medical license and maintain your professional standing with ease.",
      icon: RefreshCw,
      color: "bg-green-600",
      features: ["Quick Renewal", "Auto Reminders", "Payment Gateway", "Instant Certificate"],
      buttonText: "Renew License",
      buttonColor: "bg-green-600 hover:bg-green-700"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive medical registration and licensing services designed to serve 
            healthcare professionals across Andhra Pradesh with efficiency and transparency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white group"
              >
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Service Icon */}
                  <div className="text-center mb-6">
                    <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="flex-1 mb-6">
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full ${service.buttonColor} text-white font-medium group-hover:shadow-lg transition-all duration-300`}
                  >
                    {service.buttonText}
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Services Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { icon: Award, title: "CME Credits", desc: "Continuing Medical Education" },
            { icon: BarChart3, title: "Analytics", desc: "Registration Statistics" },
            { icon: Upload, title: "Document Upload", desc: "Secure File Management" },
            { icon: CheckCircle, title: "Compliance", desc: "Regulatory Standards" }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="text-center p-6 hover:shadow-md transition-all duration-300 group cursor-pointer">
                <Icon size={32} className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;