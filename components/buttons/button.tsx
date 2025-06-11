
import { ReactElement } from "react";

const buttonVariants = {
    general_1: "bg-white text-black px-3 font-bold py-1 rounded-md hover:bg-gray-200 hover:scale-105 transition-all duration-300",
    general_2: "bg-black text-white px-3 font-bold py-1 rounded-md hover:bg-slate-800 hover:scale-105 transition-all duration-300",
    blue_variant: "bg-blue-600 text-white font-bold hover:bg-blue-800 px-3 py-2 rounded-md transition-all duration-500 hover:scale-105",
    red_variant: "bg-red-600 text-white px-3 font-bold py-1 rounded-md hover:bg-red-800 hover:scale-105 transition-all duration-300"
}

const defaultButtonStyles = "cursor-pointer flex items-center justify-center space-x-2";

interface buttonProps {
    variant: "general_1" | "general_2" | "blue_variant" | "red_variant";
    text: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    startIcon?: ReactElement;
    endIcon?: ReactElement | null;
}

export const Button = ({variant , text , className , onClick , startIcon , endIcon}: buttonProps) => {
    return (
        <>
            <button
                className={`${buttonVariants[variant]} ${defaultButtonStyles} ${className}`}
                onClick={onClick}
            >
                <div className="mr-1">
                    {startIcon}
                </div>
                {text}
                <div className="ml-1">
                    {endIcon}
                </div>
            </button>
        </>
    )
}
