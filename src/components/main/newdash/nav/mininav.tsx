import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconMail, IconNotification } from "@tabler/icons-react"
export default function MiniNav() {
    return (<>
        <div className="flex justify-between w-full gap-4 bg-[var(--background-alt)] items-center px-4 pb-3 pt-5 rounded-b-xl">
            <Avatar>
                <AvatarImage src={"https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full">
                <p className="text-xl">John D.</p>
                <p className="text-sm">UI/UX Designer</p>
            </div>
            <div className="flex">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-500">
                    <IconMail className="w-6 h-6"/>
                </div>

                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-500 ml-4">
                    <IconNotification  className="w-6 h-6" />
                </div>
            </div>
        </div>
    </>)
}