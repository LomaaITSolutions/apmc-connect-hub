import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, FileText, RefreshCw } from "lucide-react";
import heroImage from "@/assets/medical-hero-bg.jpg";

const Hero = () => {
  const stats = [
    { number: "25,000+", label: "Registered Doctors" },
    { number: "13", label: "Districts Covered" },
    { number: "67+", label: "Years of Service" },
  ];

  const quickServices = [
    {
      icon: Shield,
      title: "License Verification",
      description: "Instantly verify medical professional credentials",
      color: "bg-primary",
    },
    {
      icon: FileText,
      title: "New Registration",
      description: "Apply for medical practice registration online",
      color: "bg-blue-600",
    },
    {
      icon: RefreshCw,
      title: "License Renewal",
      description: "Renew your medical license and certifications",
      color: "bg-green-600",
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Medical Professionals"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                ANDHRA PRADESH
                <br />
                <span className="text-yellow-400">MEDICAL COUNCIL</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
                Your trusted regulatory body ensuring quality healthcare through
                proper medical registration, licensing, and professional standards
                across Andhra Pradesh.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3"
              >
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-3"
              >
                Verify License
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-400">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Quick Services */}
          <div className="space-y-6">
            {quickServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`${service.color} p-3 rounded-lg text-white`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {service.description}
                        </p>
                      </div>
                      <ArrowRight className="text-gray-400 group-hover:text-primary transition-colors" size={20} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;