"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import SignedIn from "../auth/SignedIn";
import SignedOut from "../auth/SignedOut";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import UserNavigation from "./UserNavigation";
import NavSideBar from "./NavSidebar";
import { MenuIcon } from "lucide-react";

const navbarItems = [
  {
    children: "Home",
    href: "/",
  },
  {
    children: "Subscribe",
    href: "/subscribe",
  },
  {
    children: "Profile",
    href: "/profile",
  },
];

const NavBarItem = ({ children, href, isActive }) => {
  return (
    <Button
      asChild
      variant="link"
      className={cn(
        "bg-transparent hover:bg-transparentrounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <nav className="mb-4 flex justify-between items-center p-4 bg-white outline shadow-sm z-50">
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={"/images/logo.png"}
            alt="Logo"
            width={64}
            height={64}
            className="size-12"
          />
          <h4 className="text-2xl font-semibold hidden sm:flex">
            VP<span className="ml-2 text-primary">Event Booking</span>
          </h4>
        </Link>
      </div>

      {/* Middle Section: Navigation Pages */}
      <div className="hidden md:flex space-x-6">
        {/* Hide on small screens, show on medium and above */}
        <SignedIn>
               <Link
                 href="/"
                 className="text-primary text-sm hover:text-emerald-600 transition-colors"
               >
                 Home
               </Link>
               <Link
                 href="/events/new"
                 className="text-primary text-sm hover:text-emerald-600 transition-colors"
               >
                 Events
               </Link>
               <Link
                 href="/schedule"
                 className="text-primary text-sm hover:text-emerald-600 transition-colors"
               >
                 schedule
               </Link>
               <Link
                 href="/staff"
                 className="text-primary text-sm hover:text-emerald-600 transition-colors"
               >
                 Staff
               </Link>
           </SignedIn>

           <SignedOut>
               <Link
                 href="/"
                 className="text-primary text-sm hover:text-emerald-600 transition-colors"
               >
                 Home
               </Link>
               {/* <Link
                 href="/"
                 className="text-primary text-sm hover:text-emerald-600 transition-colors"
               >
                 Book Now
               </Link> */}
               <Link
                 href="/pricing"
                 className="text-primary text-sm hover:text-emerald-600 transition-colors"
               >
                 Pricing
               </Link>
             
           </SignedOut>
      </div>

      {/* Right Section: Signup/Auth */}
      <div>
        <div className="hidden sm:flex items-center">
          <SignedIn>
            <UserNavigation user={user} />
          </SignedIn>
          <SignedOut>
            <Link
              href="/signin"
              className="px-2 py-2 text-black text-sm cursor-pointer hover:bg-emerald-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-2 py-2 bg-primary text-sm text-white rounded cursor-pointer hover:bg-emerald-600 transition"
            >
              Get Started
            </Link>
          </SignedOut>
        </div>
        <div className="flex sm:hidden items-center justify-between">
          <NavSideBar
            items={navbarItems}
            open={isSidebarOpen}
            onOpenChange={setIsSidebarOpen}
          />
          <Button
            variant={"ghost"}
            className={"size-12 border-transparent bg-white"}
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon />
          </Button>
        </div>
      </div>
    </nav>
  );

  // return (
  //   <nav className="h-20 top-0 fixed left-0 w-full bg-white outline shadow-sm z-50">
  //     <div className="hidden sm:flex max-w-7xl mx-auto px-4 py-3 items-center justify-between">
  //       <div className="flex items-center">
  //         <Link href={"/"} className="flex items-center gap-2">
  //           <Image
  //             src={"/images/logo.png"}
  //             alt="Logo"
  //             width={64}
  //             height={64}
  //             className="size-12"
  //           />
  //           <h4 className="text-2xl font-semibold hidden sm:flex">
  //             VP <span className="text-primary">Event Booking</span>
  //           </h4>
  //         </Link>
  //       </div>
  //       <div>
  //         <SignedIn>
  //           <div className="hidden sm:flex sm:items-center space-x-6">
  //             <Link
  //               href="/"
  //               className="text-primary text-sm hover:text-emerald-600 transition-colors"
  //             >
  //               Home
  //             </Link>
  //             <Link
  //               href="/events/new"
  //               className="text-primary text-sm hover:text-emerald-600 transition-colors"
  //             >
  //               Events
  //             </Link>
  //             <Link
  //               href="/schedule"
  //               className="text-primary text-sm hover:text-emerald-600 transition-colors"
  //             >
  //               schedule
  //             </Link>
  //             <Link
  //               href="/staff"
  //               className="text-primary text-sm hover:text-emerald-600 transition-colors"
  //             >
  //               Staff
  //             </Link>
  //             <UserNavigation user={user} />
  //           </div>
  //         </SignedIn>

  //         <SignedOut>
  //           <div className="hidden sm:flex space-x-4">
  //             <Link
  //               href="/"
  //               className="text-primary text-sm hover:text-emerald-600 transition-colors"
  //             >
  //               Home
  //             </Link>
  //             <Link
  //               href="/"
  //               className="text-primary text-sm hover:text-emerald-600 transition-colors"
  //             >
  //               Book Now
  //             </Link>
  //             <Link
  //               href="/pricing"
  //               className="text-primary text-sm hover:text-emerald-600 transition-colors"
  //             >
  //               Pricing
  //             </Link>
  //           </div>
  //           <div>
  //             <Link
  //               href="/signin"
  //               className="px-2 py-2 text-black text-sm cursor-pointer hover:bg-emerald-600 transition-colors"
  //             >
  //               Sign In
  //             </Link>
  //             <Link
  //               href="/signup"
  //               className="px-2 py-2 bg-primary text-sm text-white rounded cursor-pointer hover:bg-emerald-600 transition"
  //             >
  //               Get Started
  //             </Link>
  //           </div>
  //         </SignedOut>
  //       </div>
  //     </div>
  //     <div className="flex px-4 py-3 sm:hidden items-center justify-between">
  //       <NavSideBar
  //         items={navbarItems}
  //         open={isSidebarOpen}
  //         onOpenChange={setIsSidebarOpen}
  //       />
  //       <Link href={"/"} className="flex items-center gap-2">
  //         <Image
  //           src={"/images/logo.png"}
  //           alt="Logo"
  //           width={64}
  //           height={64}
  //           className="size-12"
  //         />
  //         <h4 className="text-2xl font-semibold hidden sm:flex">
  //           VP <span className="text-primary">Event Booking</span>
  //         </h4>
  //       </Link>
  //       <Button
  //         variant={"ghost"}
  //         className={"size-12 border-transparent bg-white"}
  //         onClick={() => setIsSidebarOpen(true)}
  //       >
  //         <MenuIcon />
  //       </Button>
  //     </div>
  //   </nav>
  // );
};

export default Navbar;
