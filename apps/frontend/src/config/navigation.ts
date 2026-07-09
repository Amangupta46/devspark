import { NavigationItem } from "@/types/navigation";

export const marketingNavigation: NavigationItem[] = [
  { label: "Home", href: "/", analyticsId: "nav_home" },
  {
    label: "Services",
    href: "/#services",
    analyticsId: "nav_services",
    children: [
      {
        label: "Web Development",
        href: "/#services",
        analyticsId: "nav_services_web",
      },
      { label: "Mobile Apps", href: "/#services", analyticsId: "nav_services_mobile" },
      { label: "UI/UX Design", href: "/#services", analyticsId: "nav_services_uiux" },
      { label: "AI Integration", href: "/#services", analyticsId: "nav_services_ai" },
    ],
  },
  { label: "Portfolio", href: "/#portfolio", analyticsId: "nav_portfolio" },
  { label: "Case Studies", href: "/#portfolio", analyticsId: "nav_case_studies" },
  { label: "Pricing", href: "/#pricing", analyticsId: "nav_pricing" },
  { label: "Methodology", href: "/methodology", analyticsId: "nav_methodology" },
  { label: "Blog", href: "/blog", analyticsId: "nav_blog" },
  { label: "About", href: "/#about", analyticsId: "nav_about" },
  { label: "Contact", href: "/contact", analyticsId: "nav_contact" },
  { label: "Login", href: "/login", analyticsId: "nav_login" },
  { label: "Register", href: "/register", analyticsId: "nav_register" },
];

export const dashboardNavigation: NavigationItem[] = [
  { label: "Overview", href: "/dashboard", analyticsId: "dash_overview" },
  { label: "Projects", href: "/dashboard/projects", analyticsId: "dash_projects" },
  { label: "Invoices", href: "/dashboard/invoices", analyticsId: "dash_invoices" },
  { label: "Support", href: "/dashboard/support", analyticsId: "dash_support" },
];

export const footerNavigation: NavigationItem[] = [
  { label: "About Us", href: "/#about", analyticsId: "foot_about" },
  { label: "Careers", href: "/#careers", analyticsId: "foot_careers" },
  { label: "Contact", href: "/contact", analyticsId: "foot_contact" },
];

export const legalNavigation: NavigationItem[] = [
  { label: "Privacy Policy", href: "/#privacy", analyticsId: "legal_privacy" },
  { label: "Terms of Service", href: "/#terms", analyticsId: "legal_terms" },
];
