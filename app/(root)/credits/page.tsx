import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/Checkout";
import { FaCircleCheck } from "react-icons/fa6";

const Credits = async () => {
    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <>
            <Header
                title="Buy Credits"
                subtitle="Choose a credit package that suits your needs!"
            />

            <section>
                <ul className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-5 xl:grid-cols-3">
                    {plans.map((plan) => (
                        <li
                            key={plan.name}
                            className="bg-[#F5F5F6] px-6 py-12 rounded-lg relative">
                            <div className="flex-center flex-col gap-3">
                                {/* <div className="w-full flex justify-end mb-4"> */}
                                <div className="bg-black px-2 py-1 h-[30px] text-white text-[0.9rem] absolute right-2 top-[-30px] rounded-t-lg">
                                    {plan.banner}
                                </div>
                                {/* </div> */}
                                <Image
                                    src="/assets/images/logo-credits.png"
                                    alt="check"
                                    width={150}
                                    height={150}
                                />
                                <p className="p-20-semibold mt-2">
                                    {plan.name}
                                </p>
                                <p className="h1-semibold text-dark-600">
                                    ${plan.price}
                                </p>
                                <p className="p-16-regular">
                                    {plan.credits} Credits
                                </p>
                            </div>

                            {/* Inclusions */}
                            <ul className="flex flex-col gap-5 py-9">
                                {plan.inclusions.map((inclusion) => (
                                    <li
                                        key={plan.name + inclusion.label}
                                        className="flex items-center gap-4">
                                        {inclusion.isIncluded ? (
                                            <FaCircleCheck className="text-[#37996B]" />
                                        ) : (
                                            <FaCircleCheck className="text-gray-300" />
                                        )}
                                        <p className="p-16-regular">
                                            {inclusion.label}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            {plan.name === "Free" ? (
                                <Button
                                    variant="default"
                                    disabled
                                    className="w-full">
                                    Free Consumable
                                </Button>
                            ) : (
                                <SignedIn>
                                    <Checkout
                                        plan={plan.name}
                                        amount={plan.price}
                                        credits={plan.credits}
                                        buyerId={user._id}
                                    />
                                </SignedIn>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default Credits;
