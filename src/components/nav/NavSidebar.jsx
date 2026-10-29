import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignedIn from "@/components/auth/SignedIn";
import SignedOut from "@/components/auth/SignedOut";
import SignOutButton from "@/components/auth/SignOutButton";

const NavSideBar = ({ items, open, onOpenChange }) => {
  //   console.log(JSON.stringify(items));
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[250px] p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="w-full p-4 text-left hover:bg-black hover:text-white flex items-center text-black text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
          <SignedOut>
            <div className="border-t">
              <Link
                href="/signin"
                className="w-full p-4 text-left hover:bg-black hover:text-white flex items-center text-black text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="w-full p-4 text-left hover:bg-black hover:text-white flex items-center text-black text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                Sign Up
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="border-t">
              <SignOutButton isSideBar={true}/>
            </div>
          </SignedIn>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NavSideBar;
