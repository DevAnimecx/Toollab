import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const links = {
    Tools: [
      { name: "Text Utilities", href: "/tools" },
      { name: "File Tools", href: "/tools" },
      { name: "Coding Tools", href: "/tools" },
      { name: "Everyday Tools", href: "/tools" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "All Tools", href: "/tools" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
  };

  const socialLinks = [
    { name: "GitHub", href: "#", icon: <Github className="h-5 w-5" /> },
    { name: "Twitter", href: "#", icon: <Twitter className="h-5 w-5" /> },
    { name: "LinkedIn", href: "#", icon: <Linkedin className="h-5 w-5" /> },
  ];

  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Your ultimate client-side toolkit. Fast, secure, and free.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-bold font-heading text-white">{title}</h4>
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm text-muted-foreground hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Toollab. All Rights Reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            {socialLinks.map(link => (
              <a key={link.name} href={link.href} className="text-muted-foreground hover:text-white transition-colors">
                {link.icon}
                <span className="sr-only">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;