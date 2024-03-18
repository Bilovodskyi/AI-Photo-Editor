"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query) {
                const newUrl = formUrlQuery({
                    searchParams: searchParams.toString(),
                    key: "query",
                    value: query,
                });

                router.push(newUrl, { scroll: false });
            } else {
                const newUrl = removeKeysFromQuery({
                    searchParams: searchParams.toString(),
                    keysToRemove: ["query"],
                });

                router.push(newUrl, { scroll: false });
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [router, searchParams, query]);

    return (
        <div className="flex bg-[#F5F5F6] px-4 p-1 rounded-lg">
            <Image
                src="/assets/icons/search.svg"
                alt="search"
                width={24}
                height={24}
            />

            <Input
                className="outline-none border-0 bg-transparent w-[350px]"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
};
