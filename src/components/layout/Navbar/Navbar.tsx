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
import { useContext, useEffect, useState } from "react";
import { cartContext } from "@/contexts/cartContext";
import apiServices from "@/../services/api";
import { IProduct } from "@/interfaces/IProducts";
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
  { href: "/wishlist", label: "Wishlist" },
];

// Categories fetched dynamically from API

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, isLoading } = useContext(cartContext);
  const session = useSession();
  const router  = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const isAuthenticated = session.status === "authenticated";

  // Fetch all products for search autocomplete and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          apiServices.getProducts(),
          apiServices.getCategories()
        ]);
        setAllProducts(productsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Failed to fetch data for Navbar", error);
      }
    };
    fetchData();
  }, []);

  // Filter products as user types
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = allProducts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5); // Show top 5 results
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [searchQuery, allProducts]);

  // All nav items based on auth status
  const navItems = isAuthenticated
    ? [...publicNavItems, ...protectedNavItems]
    : publicNavItems;

  const Logo = () => (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <div
        className="flex items-center justify-center w-9 h-9 rounded-lg shadow-sm"
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
    <header className="w-full sticky top-0 z-[50] shadow-sm">

      {/* ── Top Bar ── */}
      <div style={{ background: NAVY }} className="text-[#cccccc] text-xs py-2 px-4 border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between">

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5" style={{ color: ORANGE }} />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="hidden lg:flex items-center gap-2 opacity-80">
              <Sparkles className="h-3.5 w-3.5" style={{ color: ORANGE }} />
              New Arrivals Daily
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a href="tel:+96560927541" className="hidden md:flex items-center gap-1.5 hover:text-[#FF9900] transition-colors">
              <Phone className="h-3 w-3" /> +(965) 60927541
            </a>
            
            {!isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link href="/auth/signin" className="hover:text-[#FF9900] transition-colors font-medium">Sign In</Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-1 rounded-full font-bold text-[11px] transition-all hover:scale-105 active:scale-95"
                  style={{ background: ORANGE, color: NAVY }}
                >
                  Join Now
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* Name moved to Account button as per request */}
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  className="flex items-center gap-1.5 hover:text-[#FF9900] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-6">

            <Logo />

            {/* Search */}
            <div className="flex-1 max-w-xl hidden sm:flex mx-4 relative">
              <div
                className="flex w-full rounded-2xl overflow-hidden transition-all shadow-sm ring-1 ring-gray-100"
                style={{ border: `1.5px solid ${ORANGE}` }}
              >
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length > 1 && setShowSearchDropdown(true)}
                  placeholder="What are you looking for today?"
                  className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-white text-sm pl-5 h-11"
                  style={{ color: NAVY }}
                  onKeyDown={(e) => { 
                    if (e.key === "Enter") {
                      handleSearch();
                      setShowSearchDropdown(false);
                    }
                  }}
                />
                <button
                  onClick={handleSearch}
                  className="px-6 flex items-center justify-center transition-colors hover:opacity-90 active:scale-95"
                  style={{ background: ORANGE }}
                >
                  <Search className="h-4.5 w-4.5" style={{ color: NAVY }} />
                </button>
              </div>

              {/* Search Dropdown */}
              {showSearchDropdown && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-[100] overflow-hidden">
                  {searchResults.map((product) => (
                    <Link
                      key={product._id}
                      href={`/products/${product._id}`}
                      onClick={() => {
                        setSearchQuery("");
                        setShowSearchDropdown(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <img src={product.imageCover} alt={product.title} className="w-10 h-10 object-cover rounded-md" />
                      <div>
                        <p className="text-sm font-bold text-gray-800 line-clamp-1">{product.title}</p>
                        <p className="text-xs text-orange-600 font-bold">{product.price} EGP</p>
                      </div>
                    </Link>
                  ))}
                  <button 
                    onClick={handleSearch}
                    className="w-full p-2 text-center text-xs font-bold text-navy-900 bg-gray-50 hover:bg-gray-100 transition-colors"
                    style={{ color: NAVY }}
                  >
                    View all results
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Nav */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-gray-600 text-sm font-semibold bg-transparent hover:bg-orange-50 transition-colors h-11 px-4",
                        pathname === item.href && "text-[#FF9900]"
                      )}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Mega Menu Categories */}
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "flex items-center gap-1.5 px-4 h-11 text-sm font-semibold text-gray-600 hover:text-[#FF9900] hover:bg-orange-50 rounded-md transition-colors",
                          pathname.startsWith("/categories") && "text-[#FF9900]"
                        )}
                      >
                        Categories <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px] p-2 rounded-xl shadow-xl border-gray-100">
                      <div className="flex flex-col">
                        <Link 
                          href="/products" 
                          className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF9900] rounded-md transition-colors"
                        >
                          All Categories
                        </Link>
                        {categories.slice(0, 5).map((cat) => (
                          <Link 
                            key={cat._id}
                            href={`/products?category=${cat._id}`} 
                            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF9900] rounded-md transition-colors"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="hidden md:flex rounded-full gap-2 font-bold text-sm hover:opacity-90"
                      style={{ background: ORANGE, color: NAVY }}
                    >
                      <User className="h-4 w-4" /> Hi, {session.data?.user?.name?.split(' ')[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl shadow-xl border-gray-100">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2 font-semibold cursor-pointer py-2">
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center gap-2 font-semibold cursor-pointer py-2">
                        <Truck className="h-4 w-4" /> My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                      className="flex items-center gap-2 font-semibold cursor-pointer py-2 text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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