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
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export interface ProfileDropdownProps {
    session_data: any;
}

export const Profile = ({ session_data }: ProfileDropdownProps) => {
    const userInitials = session_data?.user?.name
        ? session_data.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
        : 'U';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:outline-none">
                <Avatar className="h-8 w-8 hover:opacity-80 transition-opacity cursor-pointer">
                    <AvatarImage
                        src={session_data?.user?.image}
                        alt={session_data?.user?.name || "User"}
                    />
                    <AvatarFallback className="bg-gray-900 text-white text-sm font-medium">
                        {userInitials}
                    </AvatarFallback>
                </Avatar>
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
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {utils.capitalizeName(session_data?.user?.name || "User")}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                        {session_data?.user?.email || "user@example.com"}
                    </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200 my-1" />
                <DropdownMenuGroup className="space-y-0.5">
                    <Link href="/profile" className="block">
                        <DropdownMenuItem className="rounded-md cursor-pointer focus:bg-gray-100 hover:bg-gray-100 data-[highlighted]:bg-gray-100 transition-colors duration-200 py-1.5">
                            <ContactRound className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/api/create-customer-portal-session" className="block">
                        <DropdownMenuItem className="rounded-md cursor-pointer focus:bg-gray-100 hover:bg-gray-100 data-[highlighted]:bg-gray-100 transition-colors duration-200 py-1.5">
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