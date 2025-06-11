'use client';
import { Button } from "@/components/buttons/button";
import { Input } from "@/components/inputs/input";
import { Back } from "@/icons/Back";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { EnterDoor } from "@/icons/EnterDoor";
import GoogleBtn from "@/components/buttons/GoogleBtn";
import GithubBtn from "@/components/buttons/GithubBtn";

export default function SigninPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        console.log('Welcome to Ausphora!');
    } , [notification])
    // Show notification and auto-hide after delay
    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleSignin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/user/signin`, formData, {
                withCredentials: true // Important for cookie-based auth
            });

            showNotification(response.data.message || 'Login successful! Redirecting...', 'success');

            // Redirect to dashboard after 1 second
            setTimeout(() => router.push('/dashboard'), 1000);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showNotification(error.response?.data?.message || 'Login failed. Please try again.', 'error');
            } else {
                showNotification('An unexpected error occurred.', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="h-screen bg-blue-100 overflow-hidden">
            <div className="cursor-pointer">
                <Link href={"/"}>
                    <h1 className="text-center md:text-2xl text-xl font-black">
                        Welcome to <span className="md:text-5xl text-3xl font-extrabold text-blue-600"> Ausphora </span>
                    </h1>
                </Link>
            </div>

            <div className="mt-20 justify-start ml-10 flex">
                <Link href={"/"}>
                    <Button text="Home" variant="general_2" startIcon={<Back />} />
                </Link>
            </div>

            <div className="mt-5">
                <div className="mb-5">
                    <h1 className="cursor-pointer tracking-tighter text-xl md:text-3xl text-center font-bold my-1 sm:my-2">
                        <span className="bg-gradient-to-b text-blue-600 font-extrabold bg-clip-text">
                            LogIn To Your Account
                        </span>
                    </h1>
                </div>

                <div className="flex cursor-pointer flex-col md:flex-row justify-center items-center">
                    <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="m-3 font-bold"
                        type="email"
                        placeholder="Email"
                    />
                    <Input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="m-3 font-bold"
                        type="password"
                        placeholder="Password"
                    />
                </div>

                <div className="flex justify-center">
                    <Button
                        text={loading ? 'Logging In...' : 'LogIn'}
                        variant="general_1"
                        endIcon={loading ? null : <EnterDoor />}
                        onClick={handleSignin}
                        disabled={loading}
                    />
                </div>

                <div className="flex justify-center mt-10 items-center">
                    <div className="flex justify-center items-center w-full cursor-default max-w-sm">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                        <span className="px-4 text-sm font-medium text-black">OR CONTINUE WITH</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                    </div>
                </div>

                <div className="mt-5 flex justify-center flex-col items-center gap-5">
                    <GoogleBtn text="Sign in with Google" />
                    <GithubBtn text="Sign in with Github" />
                </div>

                <p className="text-black font-bold text-center mt-6">
                    Don&apos;t have an account?
                    {" "}
                    <Link href={"/signup"}>
                        <span
                            className="text-blue-600 font-extrabold cursor-pointer hover:underline"
                        >
                            SignUp
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    )
}