import Navbar from "@/components/main/newdash/nav/navbar"
import MiniNav from "@/components/main/newdash/nav/mininav"
import { IconFileImport, IconPlus } from "@tabler/icons-react"
import Card from "@/components/main/newdash/card";
import { Dropdown } from "react-day-picker"

export default function Page() {
    return <>
        <div className="flex justify-around">
            <div className="h-screen w-13/20 flex flex-col gap-4 flex">
                <Navbar />
                <div className="h-full flex flex-col gap-3 p-4 mb-4 bg-[var(--background-alt)] rounded-4xl">
                    <span className="flex items-center gap-4 justify-between">
                        <div className="grow-4">
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-sm font-bold">Hello John, Welcome to task management!</p>
                        </div>
                        <span
                            className="flex h-8 text-sm items-center border rounded-full p-4
             bg-[var(--background-alt)] text-[var(--foreground-alt)]
             cursor-pointer transition-colors"
                        >
                            <IconFileImport className="mr-2" />
                            Import Data
                        </span>

                        <span
                            className="flex h-8 text-sm items-center border rounded-full p-4
             bg-[var(--foreground-alt)] text-[var(--background-alt)]
             cursor-pointer transition-colors"
                        >
                            <IconPlus className="mr-2" />
                            Add Project
                        </span>
                    </span>
                     <div className="flex grid md:grid-cols-3 lg:grid-cols-4 gap-2 justify-between">
                        <Card heading="Heading" para="This is some text" checked={false} />
                        <Card heading="Heading" para="This is some text" checked={false} />
                        <Card heading="Heading" para="This is some text" checked={false} />
                        <Card heading="Heading" para="This is some text" checked={false} />
                    </div>
                </div>
               
            </div>
            <div className="w-6/20 h-screen flex flex-col gap-4 flex">
                <MiniNav />
                <div className="h-screen mb-4 bg-[var(--background-alt)] rounded-4xl">

                </div>
            </div>
        </div>
    </>
}