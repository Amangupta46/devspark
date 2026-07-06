export interface NavigationItem {
  label: string;
  href: string;
  analyticsId: string;
  children?: NavigationItem[];
}
