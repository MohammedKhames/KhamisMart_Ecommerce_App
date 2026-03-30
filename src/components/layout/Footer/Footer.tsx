"use client";

import {
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  CreditCard,
} from "lucide-react";

import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
const Facebook  = FaFacebook;
const Twitter   = FaTwitter;
const Instagram = FaInstagram;
const Youtube   = FaYoutube;
import Link from "next/link";

const ORANGE = "#FF9900";
const NAVY   = "#131921";

const shopLinks = [
  { href: "/products",              label: "All Products"    },
  { href: "/categories",            label: "Categories"      },
  { href: "/brands",                label: "Brands"          },
  { href: "/categories/electronics",label: "Electronics"     },
  { href: "/categories/men-fashion",label: "Men's Fashion"   },
  { href: "/categories/women-fashion",label:"Women's Fashion" },
];

const accountLinks = [
  { href: "/account",    label: "My Account"     },
  { href: "/orders",     label: "Order History"  },
  { href: "/wishlist",   label: "Wishlist"        },
  { href: "/cart",       label: "Shopping Cart"  },
  { href: "/auth/signin",label: "Sign In"         },
  { href: "/auth/signup",label: "Create Account" },
];

const supportLinks = [
  { href: "/contact",   label: "Contact Us"       },
  { href: "/help",      label: "Help Center"      },
  { href: "/shipping",  label: "Shipping Info"    },
  { href: "/returns",   label: "Returns & Refunds"},
  { href: "/track",     label: "Track Order"      },
];

const legalLinks = [
  { href: "/privacy",  label: "Privacy Policy"  },
  { href: "/terms",    label: "Terms of Service" },
  { href: "/cookies",  label: "Cookie Policy"   },
];

const socialLinks = [
  { href: "#", icon: Facebook,  label: "Facebook"  },
  { href: "#", icon: Twitter,   label: "Twitter"   },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Youtube,   label: "YouTube"   },
];

export default function Footer() {
  return (
    <footer style={{ background: NAVY }} className="text-gray-300">

      {/* ── Main Footer Content ── */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{ background: ORANGE }}
                >
                  <ShoppingCart className="h-4 w-4" style={{ color: NAVY }} />
                </div>
                <span className="text-lg font-extrabold tracking-tight text-white">
                  Khamis<span style={{ color: ORANGE }}>Mart</span>
                </span>
              </div>
            </Link>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed">
              KhamisMart is your one-stop destination for quality products. From fashion to
              electronics, we bring you the best brands at competitive prices with a seamless
              shopping experience.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <Phone className="h-4 w-4 flex-shrink-0 group-hover:text-[#FF9900] transition-colors" style={{ color: ORANGE }} />
                +(965) 60927541 
              </a>
              <a
                href="mailto:support@khamismart.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <Mail className="h-4 w-4 flex-shrink-0 group-hover:text-[#FF9900] transition-colors" style={{ color: ORANGE }} />
                support@khamismart.com
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
                123 street, Kuwait City, Kuwait
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = ORANGE;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = ORANGE;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <Icon className="h-4 w-4 text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <FooterColumn title="Shop" links={shopLinks} />

          {/* Account */}
          <FooterColumn title="Account" links={accountLinks} />

          {/* Support */}
          <FooterColumn title="Support" links={supportLinks} />

          {/* Legal */}
          <FooterColumn title="Legal" links={legalLinks} />

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} KhamisMart. All rights reserved.
          </p>

          {/* Payment methods */}
          <div className="flex items-center gap-3">
            {["Visa", "Mastercard", "PayPal"].map((method) => (
              <div
                key={method}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <CreditCard className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-xs text-gray-400">{method}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}

// ── Helper Component ──
function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white font-bold text-sm tracking-wide">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-gray-400 hover:text-white transition-colors relative group"
            >
              <span
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "#FF9900" }}
              />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}