import { useState } from "react";
import { Link } from "wouter";
import {
  BarChart3,
  FileText,
  GraduationCap,
  Menu,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  Bell,
  User,
  X,
  Cog,
  Folder,
  HelpCircle,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPersona, setCurrentPersona] = useState("Executive");

  const personas = [
    "Support Staff",
    "Staff",
    "Program Manager",
    "Administrator",
    "Executive",
  ];

  const navigationItems = [
    { label: "Dashboard", href: "/", icon: BarChart3 },
    { label: "Applications", href: "/applications", icon: FileText },
    { label: "Student Records", href: "/student-records", icon: GraduationCap },
    { label: "Grants & Scholarships", href: "/grants-scholarships", icon: GraduationCap },
    { label: "Reports", href: "/reports", icon: BarChart3 },
    { label: "Programs", href: "/programs", icon: Cog },
    { label: "Documents", href: "/documents", icon: Folder },
    { label: "College", href: "/college", icon: Building2 },
    { label: "Help", href: "/help", icon: HelpCircle },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-primary text-primary-foreground transition-all duration-300 flex flex-col border-r border-primary/20`}
      >
        {/* Logo Area */}
        <div className="p-4 border-b border-primary/20 flex items-center justify-between">
          <div className={`flex items-center gap-2 ${!sidebarOpen && "justify-center w-full"}`}>
            <img src="/images/hesc-logo.png" alt="HESC" className="w-10 h-10" />
            {sidebarOpen && <span className="font-bold text-lg">HESC</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/80 transition-colors group">
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && (
                  <span className="text-sm font-medium group-hover:font-semibold">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Settings & Logout */}
        <div className="p-4 border-t border-primary/20 space-y-2">
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/80 transition-colors">
            <Settings size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Settings</span>}
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/80 transition-colors text-left">
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse Button */}
        <div className="p-4 border-t border-primary/20">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full bg-primary/20 border-primary/30 text-primary-foreground hover:bg-primary/30"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-border h-16 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu size={20} />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>

            {/* Persona Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <span className="text-sm font-medium hidden sm:inline">
                    {currentPersona}
                  </span>
                  <ChevronDown size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {personas.map((persona) => (
                  <DropdownMenuItem
                    key={persona}
                    onClick={() => setCurrentPersona(persona)}
                    className={currentPersona === persona ? "bg-accent/10" : ""}
                  >
                    {persona}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    A
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">Admin User</div>
                <div className="px-2 py-1 text-xs text-muted-foreground">
                  admin@hesc.ny.gov
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
