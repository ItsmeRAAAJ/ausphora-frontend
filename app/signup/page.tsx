'use client';

import { Button } from "@/components/buttons/button";
import { Input } from "@/components/inputs/input";
import { Back } from "@/icons/Back";
import { EnterDoor } from "@/icons/EnterDoor";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import { toast, Toaster } from 'react-hot-toast';
import GoogleBtn from "@/components/buttons/GoogleBtn";
import GithubBtn from "@/components/buttons/GithubBtn";

export default function SignupPage() {
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        contactNumber: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/user/signup`, formData);
            toast.success(response.data.message || 'Signup successful! Please check your email for OTP.');
            setShowOtpInput(true);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/auth/user/verify-mail`, {
                email: formData.email,
                otpEntered: otp
            });
            toast.success(response.data.message || 'Email verified successfully! Redirecting to login...');
            setTimeout(() => router.push('/signin'), 2000);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'OTP verification failed. Please try again.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-blue-100 overflow-hidden">
            <Toaster position="top-center" reverseOrder={false} />

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

            <div className="mt-8">
                <div className="mb-5">
                    <h1 className="cursor-pointer tracking-tighter text-xl md:text-3xl text-center font-bold my-1 sm:my-2">
                        <span className="font-extrabold text-4xl text-blue-600 bg-clip-text">
                            {showOtpInput ? 'Verify Your Email' : 'Become an Auspher!!'}
                        </span>
                    </h1>
                </div>

                {!showOtpInput ? (
                    <div className="flex cursor-pointer flex-col justify-center items-center">
                        <div className="flex flex-col md:flex-row">
                            <div>
                                <Input
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="m-3 font-bold"
                                    type="text"
                                    placeholder="Username"
                                />
                                <Input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="m-3 font-bold"
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>

                            <div>
                                <Input
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    className="m-3 font-bold"
                                    type="text"
                                    placeholder="Contact Number"
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
                        </div>

                        <div className="flex justify-center flex-col">
                            <div className="flex justify-center mt-2">
                                <Button
                                    text={loading ? 'Signing Up...' : 'SignUp'}
                                    variant="general_1"
                                    endIcon={loading ? null : <EnterDoor />}
                                    onClick={handleSignup}
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

                            <div className="mt-5 flex justify-center flex-col md:flex-row items-center gap-5">
                                <GoogleBtn text="Continue with Google" />
                                <GithubBtn text="Continue with Github" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <p className="mb-4 text-center">
                            We&apos;ve sent an OTP to {formData.email}. Please enter it below:
                        </p>
                        <Input
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="m-3 font-bold"
                            type="text"
                            placeholder="Enter OTP"
                        />

                        <div className="flex justify-center">
                            <Button
                                text={loading ? 'Verifying...' : 'Verify OTP'}
                                variant="general_1"
                                onClick={handleVerifyOtp}
                                disabled={loading}
                            />
                        </div>
                    </div>
                )}

                {!showOtpInput && (
                    <p className="text-black mb-10 font-bold text-center mt-6">
                        Already have an account?{" "}
                        <Link href={"/signin"}>
                            <span className="text-blue-700 font-extrabold cursor-pointer hover:underline">
                                Login
                            </span>
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}