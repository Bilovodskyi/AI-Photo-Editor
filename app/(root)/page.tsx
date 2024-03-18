import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchQuery = (searchParams?.query as string) || "";
    console.log(searchQuery);

    const images = await getAllImages({ page, searchQuery });
    return (
        <>
            <section className="home sm:flex-center hidden h-72 flex-col gap-4 rounded-2xl bg-cover">
                <h1 className="home-heading">Image Editing powered by AI</h1>
                <ul className="flex-center w-full gap-20">
                    {navLinks.slice(1, 5).map((link) => (
                        <Link
                            href={link.route}
                            key={link.route}
                            className="flex-center flex-col gap-2">
                            <li className="flex-center w-fit rounded-lg bg-white p-4">
                                <Image
                                    src={link.icon}
                                    alt="image"
                                    width={24}
                                    height={24}
                                />
                            </li>
                            <p className="p-14-medium text-center text-white">
                                {link.label}
                            </p>
                        </Link>
                    ))}
                </ul>
            </section>
            <section className="sm:mt-12">
                <Collection
                    hasSearch={true}
                    images={images?.data}
                    totalPages={images?.totalPage}
                    page={page}
                />
            </section>
        </>
    );
};

export default Home;