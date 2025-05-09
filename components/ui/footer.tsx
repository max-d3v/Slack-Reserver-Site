import React from 'react';
import Link from 'next/link';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  CalendarIcon, 
  Clock,
  Code
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Brand Column */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-[#4A154B] mb-3">Slack Reserver</h2>
            <p className="text-sm text-gray-600 mb-3">
              The most efficient way to manage your workspace resource reservations.
            </p>
            
            {/* Developer section with personal socials */}
            <div className="mt-3">
              <h3 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-1">
                <Code className="h-4 w-4 text-[#4A154B]" /> 
                <span>Built by Max Maul</span>
              </h3>
              <div className="flex space-x-4">
                <Link href="https://github.com/max-d3v" target='_blank' className="text-gray-500 hover:text-[#4A154B]">
                  <Github className="h-5 w-5" />
                </Link>
                <Link target='_blank' href="https://www.linkedin.com/in/max-maul-905a64260/" className="text-gray-500 hover:text-[#4A154B]">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link target='_blank' href="mailto:max.maul.desenvolvedor@gmail.com" className="text-gray-500 hover:text-[#4A154B]">
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Navigation Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-3">
              Navigation
            </h3>
            <ul className="space-y-2">
              {['Roadmap', 'Home', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm text-gray-600 hover:text-[#4A154B]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              {['FAQ', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-gray-600 hover:text-[#4A154B]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-3">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-[#4A154B]" />
                <span>contact@slackreserver.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-[#4A154B]" />
                <span>Mon-Fri: 9AM - 5PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-600">
            Copyright &copy; {new Date().getFullYear()} Slack Reserver. Not affiliated with Slack.com.
          </p>
          <div className="flex mt-2 sm:mt-0">
            <Link href="/privacy-policy" className="text-xs text-gray-600 hover:text-[#4A154B] mr-4">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;