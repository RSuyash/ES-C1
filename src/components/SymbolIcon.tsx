import type { CSSProperties } from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Download,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  Share2,
  ShoppingBag,
  Sparkles,
  Store,
  Tag,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  architecture: Building2,
  arrow_forward: ArrowRight,
  business_center: Briefcase,
  calendar_month: CalendarDays,
  calendar_today: CalendarDays,
  call: Phone,
  celebration: Sparkles,
  check: Check,
  check_circle: Check,
  close: X,
  contract: FileText,
  diamond: Sparkles,
  domain: Building2,
  download: Download,
  expand_more: ChevronDown,
  explore: Compass,
  groups: Users,
  insights: BarChart3,
  local_offer: Tag,
  local_parking: Car,
  location_on: MapPin,
  mail: Mail,
  menu_book: BookOpen,
  phone: Phone,
  public: Globe,
  schedule: Clock3,
  share: Share2,
  shopping_bag: ShoppingBag,
  storefront: Store,
  trending_up: TrendingUp,
  verified: Check,
};

type SymbolIconProps = LucideProps & {
  name: string;
  className?: string;
  style?: CSSProperties;
};

export function SymbolIcon({ name, ...props }: SymbolIconProps) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon aria-hidden="true" {...props} />;
}
