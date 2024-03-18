"use client";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const SideBar = () => {
    const pathname = usePathname();
    return (
        <aside className="sidebar">
            <div className="flex size-full flex-col gap-4">
                <Link href="/" className="sidebar-logo">
                    <Image
                        src="/assets/images/logo.png"
                        alt="logo"
                        width={180}
                        height={28}
                    />
                </Link>
                <nav className="sidebar-nav">
                    <SignedIn>
                        <ul className="sidebar-nav_elements">
                            {navLinks.slice(0, 6).map((link) => {
                                const isActive = link.route === pathname;
                                return (
                                    <li
                                        key={link.route}
                                        className={`flex w-full rounded-lg group ${
                                            isActive
                                                ? "bg-white ring-1 ring-slate-200"
                                                : "text-gray-600 hover:bg-gray-200"
                                        }`}>
                                        <Link
                                            className="flex w-full gap-3 px-3 py-2 text-[1rem] "
                                            href={link.route}>
                                            <Image
                                                src={link.icon}
                                                alt="logo"
                                                width={18}
                                                height={18}
                                            />
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className="sidebar-nav_elements">
                            {navLinks.slice(6).map((link) => {
                                const isActive = link.route === pathname;
                                return (
                                    <li
                                        key={link.route}
                                        className={`flex w-full rounded-lg group ${
                                            isActive
                                                ? "bg-white"
                                                : "text-gray-600 hover:bg-gray-200"
                                        }`}>
                                        <Link
                                            className="flex w-full gap-3 px-3 py-2 text-[1rem] "
                                            href={link.route}>
                                            <Image
                                                src={link.icon}
                                                alt="logo"
                                                width={18}
                                                height={18}
                                            />
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="flex-center cursor-pointer gap-2 p-3 mt-4">
                                <UserButton afterSignOutUrl="/" showName />
                            </li>
                        </ul>
                    </SignedIn>
                    <SignedOut>
                        <Button
                            asChild
                            className="button-shadow rounded-lg mx-8 bg-black/80 hover:bg-black/70">
                            <Link href="/sign-in">Start editing</Link>
                        </Button>
                    </SignedOut>
                </nav>
            </div>
        </aside>
    );
};

export default SideBar;
