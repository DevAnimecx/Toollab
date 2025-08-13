import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const links = {
    Tools: [
      { name: "All Tools", href: "/tools" },
      { name: "Text Utilities", href: "/tools" },
      { name: "File Tools", href: "/tools" },
      { name: "Coding Tools", href: "/tools" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
  };

  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Your ultimate client-side toolkit.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-bold font-heading text-white">{title}</h4>
              <ul className="mt-4 space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm text-muted-foreground hover:text-white transition-colors">
                      {item.href}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Toollab. All Rights Reserved.</p>
          <p className="mt-1">Developer: Animecx | Made By: NexoBytes Development | Powered By: OpenBytes Technology</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;