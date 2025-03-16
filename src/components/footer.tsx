import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const footerLinks = [
  {
    title: "Products",
    links: [
      { name: "Mutual Funds", href: "/investments/mutual-funds" },
      { name: "Insurance", href: "/insurance" },
      { name: "Tax Saving", href: "/investments/tax-saving" },
      { name: "Retirement", href: "/investments/retirement" },
      { name: "Child Education", href: "/investments/child-education" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "FAQs", href: "/faqs" },
      { name: "Investment Calculators", href: "/calculator" },
      { name: "Market Insights", href: "/insights" },
      { name: "Glossary", href: "/glossary" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Security", href: "/security" },
      { name: "Compliance", href: "/compliance" },
    ],
  },
];

const socialLinks = [
  { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com" },
  { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
  { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com" },
  { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-400">
                <span className="text-lg font-bold text-white">IP</span>
              </div>
              <span className="text-xl font-bold tracking-tight">InvestPe</span>
            </Link>
            <p className="mb-4 max-w-md text-gray-500 dark:text-gray-400">
              InvestPe is a modern investment platform that makes it easy to invest in mutual funds and insurance. We're on a mission to simplify investing for everyone.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors hover:bg-blue-500/10 hover:text-blue-500"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-8 md:flex-row">
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 md:mb-0">
            &copy; {new Date().getFullYear()} InvestPe. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:text-gray-900 dark:hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 