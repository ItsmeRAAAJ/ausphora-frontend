'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/buttons/button";
import { Redirect } from "@/icons/Redirect";
import { BACKEND_URL } from "./config";
import { DesktopScreen } from "@/icons/DesktopScreen";

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            setAuthLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true,
                });
                if (response.data.message.isAuthenticated) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Session check failed:", error);
                setIsAuthenticated(false);
            } finally {
                setAuthLoading(false);
            }
        };

        checkSession();
    }, []);

    return (
        <div className="h-screen bg-blue-100">
            <div className="cursor-pointer">
                <Link href={"/"}>
                    <h1 className="text-center md:text-2xl text-xl font-black">
                        Welcome to <span className="md:text-5xl text-3xl font-extrabold text-blue-600"> Ausphora </span>
                    </h1>
                </Link>
            </div>

            <div className="flex justify-center mt-20 items-center gap-8">
                {authLoading ? (
                    <div className="text-lg font-semibold text-gray-700 animate-pulse">
                        Checking Session, Please Wait...
                    </div>
                ) : isAuthenticated ? (
                    <Link href="/dashboard">
                        <Button text="Go to Dashboard" variant="blue_variant" endIcon={<DesktopScreen/>} />
                    </Link>
                ) : (
                    <>
                        <Link href="/signup">
                            <Button text="Signup" variant="general_2" />
                        </Link>
                        <Link href="/signin">
                            <Button text="Login" variant="general_2" />
                        </Link>
                    </>
                )}
            </div>

            <div className="font-ausphoraDesc md:mx-auto md:w-180 text-red-900 text-center mt-10 font-bold text-lg md:text-2xl">
                Ausphora is a community-driven platform crafted for developers, learners, and tech enthusiasts to connect, collaborate, and grow together. Rooted in the spirit of peer-to-peer learning, the platform allows users to express their thoughts, share their experiences, ask for help, and build meaningful tech connections in an environment tailored specifically for the developer community.
            </div>

            <div className="font-ausphoraDesc md:mx-auto animate-bounce md:w-180 text-red-600 text-center mt-10 font-bold text-lg md:text-2xl">
                Ausphora is in its early development stage!, Join the waitlist by Signing Up to be notified when the platform is ready!
            </div>

            <div className="text-md font-semibold flex justify-center mt-20 md:text-3xl">
                <div className="mr-1">Founded by</div>
                <Link href={"https://imshubh.site"} target="_blank">
                    <div className="text-blue-600 font-extrabold md:ml-1 hover:underline flex items-center space-x-1">
                        <div>Shubhashish</div>
                        <div><Redirect className="size-6" /></div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
