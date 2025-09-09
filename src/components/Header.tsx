import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, Menu, X } from "lucide-react";
import logo from "@/assets/apmc-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "CME", href: "#", hasDropdown: true },
    { name: "NR1 Services", href: "#", hasDropdown: true },
    { name: "Gallery", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Constitution", href: "#" },
    { name: "Acts/Rules", href: "#" },
    { name: "Meetings and Decisions", href: "#" },
    { name: "Downloads", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header className="w-full">
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+91-863-2340116</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>apmcvjw@gmail.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Emergency: +91-863-2340117</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <img src={logo} alt="APMC Logo" className="h-12 w-12" />
              <div>
                <h1 className="text-xl font-bold text-primary">
                  ANDHRA PRADESH MEDICAL COUNCIL
                </h1>
                <p className="text-sm text-muted-foreground">
                  Regulating Medical Practice Since 1956
                </p>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center gap-2 max-w-md flex-1 mx-8">
              <div className="relative flex-1">
                <Input
                  placeholder="Search registration..."
                  className="pr-10"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                >
                  <Search size={16} />
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden lg:flex items-center justify-between mt-4">
            <div className="flex items-center gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          {/* Quick Action Buttons */}
          <div className="hidden lg:flex items-center gap-4 mt-4">
            <Button className="bg-medical-red text-white hover:bg-medical-red/90">
              Online Services
            </Button>
            <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white">
              Online Slot Booking
            </Button>
            <Button className="bg-medical-green text-white hover:bg-medical-green/90">
              Search Medical Register
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="flex items-center gap-2 mb-4">
                <Input placeholder="Search registration..." className="flex-1" />
                <Button size="sm">
                  <Search size={16} />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-2 text-sm font-medium text-foreground hover:text-primary"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Mobile Quick Actions */}
              <div className="flex flex-col gap-2 mt-4">
                <Button className="bg-medical-red text-white hover:bg-medical-red/90">
                  Online Services
                </Button>
                <Button variant="outline" className="border-medical-blue text-medical-blue">
                  Online Slot Booking
                </Button>
                <Button className="bg-medical-green text-white hover:bg-medical-green/90">
                  Search Medical Register
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;