import MobileNav from "@/components/shared/MobileNav";
import SideBar from "@/components/shared/SideBar";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="root">
            <SideBar />
            <MobileNav />
            <div className="root-container">
                <div className="wrapper">{children}</div>
            </div>
            <Toaster />
        </main>
    );
};

export default layout;
