"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
    DropdownMenuGroup
} from "@/components/ui/dropdown-menu"
import { CircleUserRound, ContactRound, CreditCard, LogOut } from "lucide-react"
import Link from 'next/link';
import { signOut } from "next-auth/react";
import * as utils from "@/lib/utils/functions";

export interface ProfileDropdownProps {
    session_data: any;
}

export const Profile = ({ session_data }: ProfileDropdownProps) => {

    //function to format name to Firstname Lastname
    const formatName = (name: string) => {
        const names = name.split(" ");
        if (names.length > 1) {
            return `${utils.capitalizeFirstLetter(names[0])} ${utils.capitalizeFirstLetter(names[names.length - 1])}`;
        }
        return utils.capitalizeFirstLetter(name);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:outline-none">
                <div className="rounded-full hover:bg-gray-100 p-1 transition-colors">
                    <CircleUserRound className="h-7 w-7 text-gray-700 hover:text-[#4A154B]" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className="w-56 p-2 shadow-md border border-gray-200 bg-white"
                side="bottom" 
                align="end"
                sideOffset={8}
                style={{ overflowY: 'auto' }}
                avoidCollisions={true}
            >
                <DropdownMenuLabel className="font-medium text-sm pb-1.5">
                    {formatName(session_data.user.name)}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200 my-1" />
                <DropdownMenuGroup className="space-y-0.5">
                    <Link href="/profile" className="block">
                        <DropdownMenuItem className="rounded-md cursor-pointer hover:bg-gray-100 transition-colors py-1.5">
                            <ContactRound className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/profile/billing" className="block">
                        <DropdownMenuItem className="rounded-md cursor-pointer hover:bg-gray-100 transition-colors py-1.5">
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-gray-200 my-1" />
                <DropdownMenuItem 
                    onClick={() => signOut()} 
                    className="rounded-md cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors py-1.5"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}