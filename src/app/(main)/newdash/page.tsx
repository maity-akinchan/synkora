import Navbar from "@/components/main/newdash/nav/navbar"
import MiniNav from "@/components/main/newdash/nav/mininav"
import { IconFileImport, IconPlus, IconInfoCircle } from "@tabler/icons-react"
import Card from "@/components/main/newdash/card";
import ButtonIcon from "@/components/main/newdash/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function Page() {
    return <>
        <div className="flex sm:flex-col sm:items-center sm:justify-center lg:flex-row lg:justify-around">
            <div className="h-screen w-13/20 flex flex-col gap-4">
                <Navbar />
                <div className="h-full flex flex-col gap-x-3 gap-y-7 p-4 mb-4 bg-[var(--background-alt)] rounded-4xl">
                    <span className="flex items-center gap-4 justify-between">
                        <div className="grow-4">
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="w-full text-sm font-bold">Hello John, Welcome to task management!</p>
                        </div>
                        <ButtonIcon text={"Import Data"} Icon={IconFileImport}/>
                        <ButtonIcon text={"Add Project"} Icon={IconPlus}/>
                    </span>
                     <div className="flex grid md:grid-cols-3 lg:grid-cols-4 gap-2 justify-between">
                        <Card heading="Heading" para="This is some text" checked={false} />
                        <Card heading="Heading" para="This is some text" checked={false} />
                        <Card heading="Heading" para="This is some text" checked={false} />
                        <Card heading="Heading" para="This is some text" checked={false} />
                    </div>
                    <div className="flex grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <div className="p-4 col-span-2 rounded-xl bg-[var(--background)]">
                            <div className="flex items-center justify-around">
                                <div className="w-6/12">
                                    <h1 className="text-xl font-bold">Project Analytics</h1>
                                    <p className="w-full text-sm font-light">Updated 1 days ago.</p>
                                </div>
                                <span className="w-4/12">
                                    <ButtonIcon text={"Add Task"} Icon={IconPlus} />
                                </span>
                                <span>
                                    <IconInfoCircle />
                                </span>
                            </div>
                            <Skeleton className="bg-[var(--background-alt)] mt-3 h-[150px] w-full"/>
                        </div>
                        <div className="flex p-4 bg-[var(--background)] rounded-xl">
                            <Skeleton className="bg-[var(--background-alt)] h-full w-full"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:w-13/20 lg:w-6/20 h-screen flex flex-col gap-4 flex">
                <MiniNav />
                <div className="h-screen mb-4 bg-[var(--background-alt)] rounded-4xl">

                </div>
            </div>
        </div>
    </>
}