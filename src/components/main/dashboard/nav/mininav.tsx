import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconMail, IconNotification } from "@tabler/icons-react"

export default function MiniNav() {
    return (
        <>
            <div className="flex justify-between w-full gap-4 bg-[var(--background-alt)] items-center px-4 pb-3 pt-5 rounded-b-xl">
                <Avatar className="w-10 h-10"> {/* Shrink the avatar */}
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full">
                    <p className="text-lg">John D.</p> {/* Reduce font size */}
                    <p className="text-xs">UI/UX Designer</p> {/* Reduce font size */}
                </div>
                <div className="flex">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-500"> {/* Shrink the icon container */}
                        <IconMail className="w-5 h-5" /> {/* Shrink the icon */}
                    </div>

                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-500 ml-4"> {/* Shrink the icon container */}
                        <IconNotification className="w-5 h-5" /> {/* Shrink the icon */}
                    </div>
                </div>
            </div>
        </>
    );
}
