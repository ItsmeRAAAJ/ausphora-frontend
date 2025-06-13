"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BACKEND_URL } from "@/app/config";

interface ProfileComponentProps {
    username: string;
}

interface UserProfile {
    id: string;
    userId: string;
    bio: string;
    location?: string;
    projects: Project[];
    createdAt: string;
    updatedAt: string;
}

interface Project {
    id: string;
    title: string;
    description: string;
    createdAt: string;
}

export default function ProfileComponent({ username }: ProfileComponentProps) {

    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setIsProfileLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `${BACKEND_URL}/api/v1/user/profile/${username}`,
                    { withCredentials: true }
                );

                const data = response.data;

                if (data.status === "error") {
                    setError(data.message);
                } else {
                    setUserProfile(data);
                }
            } catch (err: unknown) {
                console.error("Failed to fetch user profile:", err);
                if (axios.isAxiosError(err) && err.response?.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Failed to fetch profile. Please try again.");
                }
            } finally {
                setIsProfileLoading(false);
            }
        };

        fetchUserProfile();
    }, [username]);

    return (
        <div className="h-screen overflow-hidden bg-blue-100">

            <div className="cursor-pointer flex justify-center items-center">
                <Link href={"/"}>
                    <h1 className="text-center md:text-2xl text-xl font-black">
                        Welcome to <span className="md:text-5xl text-3xl font-extrabold text-blue-600"> Ausphora </span>
                    </h1>
                </Link>
            </div>

            <div className="mt-20">
                {isProfileLoading ? (
                    <div className="text-center text-4xl font-extrabold text-blue-600">
                        Loading...
                    </div>
                ) : error ? (
                    <div className="text-red-500 font-extrabold text-center text-3xl">{error}</div>
                ) : userProfile ? (
                    <div className="whitespace-pre-wrap text-center font-bold">
                        {JSON.stringify(userProfile, null, 2)}
                    </div>
                ) : (
                    <div>No user data.</div>
                )}
            </div>
        </div>
    );
}
