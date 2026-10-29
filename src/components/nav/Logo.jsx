import Link from "next/link";
import Image from "next/image";
import React from "react";

const Logo = ({ user }) => {
  return (
    <Link href="/">
      {user ? (
        <Image
          className="font-bold text-emerald-700 cursor-pointer"
          src="/images/logo.png" // Ensure this path is correct or replace with your logo path
          width={60}
          height={60}
          alt="Massage Client Scheduler"
        />
      ) : (
        <div>VtpDev Scheduling</div>
      )}
    </Link>
  );
};

export default Logo;
