import BrandLogo from "@/components/custom/brand-logo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex py-6 shadow-xl w-full">
      <nav className="container flex items-center gap-10 ">
        <Link href={"/"} className="mr-auto">
          <BrandLogo />
        </Link>
        <Link href={"#"} className="text-lg capitalize">
          Products
        </Link>
        <Link href={"#"} className="text-lg capitalize">
          Analytics
        </Link>
        <Link href={"#"} className="text-lg capitalize">
          Subscriptions
        </Link>
        <span className="font-semibold capitalize">
          <UserButton />
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
