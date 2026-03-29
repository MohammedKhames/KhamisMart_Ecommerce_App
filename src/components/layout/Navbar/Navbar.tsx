"use client";

import { ShoppingCart, MenuIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { cartContext } from "@/contexts/cartContext";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { href: "/products",   label: "Products"      },
  { href: "/brands",     label: "Brands"        },
  { href: "/categories", label: "Categories"    },
  { href: "/orders",     label: "Orders"        },
  { href: "/cart",     label: "Shopping Cart"   },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount ,isLoading} = useContext(cartContext);

  const session= useSession()
  const router = useRouter();

  const Logo = () => (
    <Link href="/" className="flex items-center space-x-2">
      <img
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
        className="max-h-8"
        alt="KhamisMart Logo"
      />
      <span className="text-lg font-semibold tracking-tighter">KhamisMart</span>
    </Link>
  );

  return (
    <section className="p-4 border-b">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">

          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === item.href && "text-primary font-semibold"
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side */}
          <div className="flex items-center gap-2">

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {isLoading ? <Loader2 className="animate-spin"/> :cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle asChild>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 p-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-base font-medium text-muted-foreground hover:text-foreground transition-colors",
                        pathname === item.href && "text-primary font-semibold"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}

             {
              session.status === "unauthenticated" ?(
                  <div className="flex flex-col gap-3 mt-4 border-t pt-4">
                    <Button onClick={() => router.push("/auth/signin")} variant="outline">Sign in</Button>

                  </div>
              ) :(
                 <div className="hidden items-center gap-4">
                   <Button onClick={() => signOut({callbackUrl:"api/auth/signin"})} variant="default">Sign out</Button>
                
                  </div>
              )
             }


                </div>
              </SheetContent>
            </Sheet>

          </div>
        </nav>
      </div>
    </section>
  );
}