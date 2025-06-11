import { Button } from "@/components/buttons/button";
import { Back } from "@/icons/Back";
import Link from "next/link";

export default function SigninPage() {
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

            <div className="font-ausphoraDesc md:mx-auto md:w-180 text-blue-700 text-center mt-10 font-bold text-lg md:text-2xl">
                Thanks for Registering!, website is under development. Please check back later!
            </div>
        </div>
    )
}