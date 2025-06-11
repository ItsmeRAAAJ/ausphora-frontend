import { Button } from "@/components/buttons/button";
import Link from "next/link";

export default function Home() {
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
                <div>
                    <Link href="/signup">
                        <Button text="Signup" variant="general_2" />
                    </Link>
                </div>

                <div>
                    <Link href="/signin">
                        <Button text="Login" variant="general_2" />
                    </Link>
                </div>
            </div>

            <div className="font-ausphoraDesc md:mx-auto md:w-180 text-red-900 text-center mt-10 font-bold text-lg md:text-2xl">
                Ausphora is a community-driven platform crafted for developers, learners, and tech enthusiasts to connect, collaborate, and grow together. Rooted in the spirit of peer-to-peer learning, the platform allows users to express their thoughts, share their experiences, ask for help, and build meaningful tech connections in an environment tailored specifically for the developer community.
            </div>
        </div>
    )
}