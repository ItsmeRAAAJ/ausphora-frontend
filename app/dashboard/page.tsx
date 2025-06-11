'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Button } from "@/components/buttons/button";
import { EnterDoor } from "@/icons/EnterDoor";
import { Home } from "@/icons/Home";
import Link from "next/link";

export default function DashboardPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        console.log("Welcome to Ausphora!")
    } , [isAuthenticated, authLoading, isLoggedIn, error]);

    // Checking authentication status
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true
                });
                setIsAuthenticated(response.status === 200);
            } catch (error) {
                console.error("Authentication check failed:", error);
                setIsAuthenticated(false);
                router.push("/");
            } finally {
                setAuthLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/me`, {
                    withCredentials: true,
                });
                setEmail(response.data.finalUserData.email);
                setUsername(response.data.finalUserData.username);
                // setContactNumber(response.data.finalUserData.contactNumber);
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                setError("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        }
        getUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
            setIsLoggedIn(false);
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <div className="h-screen bg-blue-100 overflow-hidden">
            <div className="relative z-10 text-black container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="cursor-pointer">
                    <Link href={"/"}>
                        <h1 className="text-center md:text-2xl text-xl font-black">
                            Welcome to <span className="md:text-5xl text-3xl font-extrabold text-blue-600"> Ausphora </span>
                        </h1>
                    </Link>
                </div>

                <div className="flex justify-center items-center p-2">
                    <div className="w-full flex md:flex-row flex-col items-center justify-center gap-3 md:gap-10 max-w-screen-lg cursor-pointer h-36 border-2 mt-2 border-black rounded-2xl shadow-sm shadow-blue-700 hover:shadow-lg hover:shadow-emerald-500 transition-all duration-500 p-4">
                        <div>
                            <Button variant="general_2" onClick={() => { router.push('/') }} endIcon={<Home />} text="Home" />
                        </div>

                        <div>
                            <Button variant="red_variant" onClick={handleLogout} endIcon={<EnterDoor />} text="Logout" />
                        </div>
                    </div>
                </div>

                {loading ? (

                    <div className="flex font-bold text-blue-600 text-4xl mt-20 justify-center items-center">
                        Loading...
                    </div>

                ) : (<>
                    <div className="text-center cursor-pointer font-extrabold text-xl md:text-4xl mt-20 flex items-center justify-center gap-2">
                        Hello {username}!
                    </div>

                    <div className="flex item-center cursor-pointer mt-3 hover:underline justify-center font-bold text-blue-600 text-xl md:text-2xl">
                        {email}
                    </div></>)}

            </div>
        </div>
    )
}