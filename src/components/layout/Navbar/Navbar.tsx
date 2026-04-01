"use client";

import {
  ShoppingCart,
  MenuIcon,
  Loader2,
  Heart,
  Search,
  Truck,
  Sparkles,
  Phone,
  Mail,
  User,
  UserPlus,
  Headphones,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { cartContext } from "@/contexts/cartContext";
import { signOut, useSession } from "next-auth/react";
import { ORANGE, NAVY } from "@/utils/colors";

// Public nav items – visible to everyone
const publicNavItems = [
  { href: "/",         label: "Home"   },
  { href: "/products", label: "Shop"   },
  { href: "/brands",   label: "Brands" },
];

// Protected nav items – visible only when authenticated
const protectedNavItems = [
  { href: "/orders",   label: "Orders" },
  { href: "/wishlist", label: "Wishlist" },
];

const categories = [
  { href: "/categories/electronics", label: "Electronics"  },
  { href: "/categories/fashion",     label: "Fashion"      },
  { href: "/categories/home",        label: "Home & Garden" },
  { href: "/categories/sports",      label: "Sports"       },
];

// Brand colors



export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, isLoading } = useContext(cartContext);
  const session = useSession();
  const router  = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const isAuthenticated = session.status === "authenticated";

  // All nav items based on auth status
  const navItems = isAuthenticated
    ? [...publicNavItems, ...protectedNavItems]
    : publicNavItems;

  const Logo = () => (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <div
        className="flex items-center justify-center w-9 h-9 rounded-lg"
        style={{ background: ORANGE }}
      >
        <ShoppingCart className="h-5 w-5" style={{ color: NAVY }} />
      </div>
      <span className="text-xl font-extrabold tracking-tight" style={{ color: NAVY }}>
        Khamis<span style={{ color: ORANGE }}>Mart</span>
      </span>
    </Link>
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm">

      {/* ── Top Bar ── */}
      <div style={{ background: NAVY }} className="text-[#cccccc] text-xs py-1.5 px-4">
        <div className="container mx-auto flex items-center justify-between">

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5" style={{ color: ORANGE }} />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" style={{ color: ORANGE }} />
              New Arrivals Daily
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:+96560927541" className="hidden md:flex items-center gap-1 hover:text-[#FF9900] transition-colors">
              <Phone className="h-3 w-3" /> +(965) 60927541
            </a>
            <a href="mailto:support@khamismart.com" className="hidden md:flex items-center gap-1 hover:text-[#FF9900] transition-colors">
              <Mail className="h-3 w-3" /> support@khamismart.com
            </a>

            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-1 font-semibold px-3 py-0.5 rounded-full text-[11px] transition-colors"
                  style={{ background: ORANGE, color: NAVY }}
                >
                  <User className="h-3 w-3" /> Sign In
                </Link>
                <Link href="/auth/signup" className="flex items-center gap-1 hover:text-[#FF9900] transition-colors">
                  <UserPlus className="h-3 w-3" /> Sign Up
                </Link>
              </div>
            ) : (
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="flex items-center gap-1 hover:text-[#FF9900] transition-colors"
              >
                <User className="h-3 w-3" /> Sign Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">

            <Logo />

            {/* Search */}
            <div className="flex-1 max-w-2xl hidden sm:flex">
              <div
                className="flex w-full rounded-full overflow-hidden transition-all"
                style={{ border: `2px solid ${ORANGE}` }}
              >
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-white text-sm pl-4"
                  style={{ color: NAVY }}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                />
                <button
                  onClick={handleSearch}
                  className="px-5 flex items-center justify-center transition-colors hover:opacity-90"
                  style={{ background: ORANGE }}
                >
                  <Search className="h-4 w-4" style={{ color: NAVY }} />
                </button>
              </div>
            </div>

            {/* Desktop Nav */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-0">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-gray-600 text-sm font-medium bg-transparent hover:bg-orange-50 transition-colors",
                        pathname === item.href
                          ? "font-semibold bg-orange-50"
                          : "hover:text-[#FF9900]"
                      )}
                      style={pathname === item.href ? { color: ORANGE } : {}}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Categories dropdown */}
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#FF9900] hover:bg-orange-50 rounded-md transition-colors",
                          pathname.startsWith("/categories") && "font-semibold bg-orange-50"
                        )}
                        style={pathname.startsWith("/categories") ? { color: ORANGE } : {}}
                      >
                        Categories <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {categories.map((cat) => (
                        <DropdownMenuItem key={cat.href} asChild className="hover:text-[#FF9900] cursor-pointer">
                          <Link href={cat.href}>{cat.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right icons */}
            <div className="flex items-center gap-1 ml-auto lg:ml-0">

              {/* Support chip */}
              <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-100 bg-orange-50 mr-2">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ background: ORANGE }}
                >
                  <Headphones className="h-4 w-4" style={{ color: NAVY }} />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold" style={{ color: NAVY }}>Support</p>
                  <p className="text-[10px] text-gray-400">24/7 Help</p>
                </div>
              </div>

              {/* Wishlist – only when authenticated */}
              {isAuthenticated && (
                <Link href="/wishlist">
                  <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-[#FF9900] hover:bg-orange-50">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
              )}

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-[#FF9900] hover:bg-orange-50">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-xs font-bold flex items-center justify-center"
                      style={{ background: ORANGE, color: NAVY }}
                    >
                      {isLoading ? <Loader2 className="h-2.5 w-2.5 animate-spin" /> : cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Auth button */}
              {isAuthenticated ? (
                <Button
                  onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  className="hidden md:flex rounded-full gap-2 font-bold text-sm hover:opacity-90"
                  style={{ background: ORANGE, color: NAVY }}
                >
                  <User className="h-4 w-4" /> Sign Out
                </Button>
              ) : (
                <Button
                  onClick={() => router.push("/auth/signin")}
                  className="hidden md:flex rounded-full gap-2 font-bold text-sm hover:opacity-90"
                  style={{ background: ORANGE, color: NAVY }}
                >
                  <User className="h-4 w-4" /> Sign In
                </Button>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden border-gray-200">
                    <MenuIcon className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="bg-white">
                  <SheetHeader>
                    <SheetTitle asChild><Logo /></SheetTitle>
                  </SheetHeader>

                  <div className="flex mt-4 rounded-full overflow-hidden" style={{ border: `2px solid ${ORANGE}` }}>
                    <Input
                      placeholder="Search products..."
                      className="border-0 focus-visible:ring-0 rounded-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                    />
                    <button className="px-4 flex items-center" style={{ background: ORANGE }} onClick={handleSearch}>
                      <Search className="h-4 w-4" style={{ color: NAVY }} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 p-4 mt-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "text-base font-medium text-gray-500 hover:text-[#FF9900] transition-colors",
                          pathname === item.href && "font-semibold"
                        )}
                        style={pathname === item.href ? { color: ORANGE } : {}}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/categories"
                      className={cn(
                        "text-base font-medium text-gray-500 hover:text-[#FF9900] transition-colors",
                        pathname.startsWith("/categories") && "font-semibold"
                      )}
                      style={pathname.startsWith("/categories") ? { color: ORANGE } : {}}
                    >
                      Categories
                    </Link>

                    <div className="flex flex-col gap-3 mt-4 border-t pt-4">
                      {!isAuthenticated ? (
                        <Button
                          onClick={() => router.push("/auth/signin")}
                          className="rounded-full font-bold hover:opacity-90"
                          style={{ background: ORANGE, color: NAVY }}
                        >
                          Sign In
                        </Button>
                      ) : (
                        <Button
                          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                          variant="outline"
                          className="rounded-full"
                          style={{ borderColor: ORANGE, color: ORANGE }}
                        >
                          Sign Out
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

            </div>
          </div>
        </div>
      </div>

    </header>
  );
}