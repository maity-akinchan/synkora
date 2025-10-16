import Navbar from "@/components/main/dashboard/nav/navbar"
import MiniNav from "@/components/main/dashboard/nav/mininav"
import { IconFileImport, IconPlus, IconInfoCircle } from "@tabler/icons-react"
import Card from "@/components/shared/SummaryCard";
import ButtonIcon from "@/components/shared/Button/IconButton"
import { Skeleton } from "@/components/ui/skeleton"
import { RecentMeeting, ScheduleMeeting } from "@/components/main/dashboard/meeting";
import { ProjectCollaboration } from "@/components/main/dashboard/collaboration-table";
import { backgroundGradientStyle } from "@/lib/commons/styles";
const sampleProjects = [
  {
    id: 1,
    name: 'Dashboard UI',
    author: {
      name: "Alice Nguyen"
    },
    members: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
    ],
    progress: 100,
    status: 0,
    date: "2025-08-12",
    timeSpent: 120
  },
  {
    id: 2,
    name: 'API Integration',
    author: {
      name: "Carlos Ramirez"
    },
    members: [
      'https://i.pravatar.cc/150?img=4',
      'https://i.pravatar.cc/150?img=5',
    ],
    progress: 45,
    status: 1,
    date: "2025-08-18",
    timeSpent: 65
  },
  {
    id: 3,
    name: 'Mobile Design',
    author: {
      name: "Fatima Zahra"
    },
    members: [
      'https://i.pravatar.cc/150?img=6',
      'https://i.pravatar.cc/150?img=7',
      'https://i.pravatar.cc/150?img=8',
      'https://i.pravatar.cc/150?img=9',
    ],
    progress: 78,
    status: 2,
    date: "2025-09-01",
    timeSpent: 90
  },
  {
    id: 4,
    name: 'Marketing Plan',
    author: {
      name: "David Kim"
    },
    members: [
      'https://i.pravatar.cc/150?img=10',
      'https://i.pravatar.cc/150?img=11',
    ],
    progress: 0,
    status: 1,
    date: "2025-09-05",
    timeSpent: 0
  },
];
const scheduledMeetings = [
  { id: 1, time: '03:00 - 04:30 PM', title: 'Residential Onboarding', members: ['https://i.pravatar.cc/150?img=12', 'https://i.pravatar.cc/150?img=13'], memberCount: 12, isFeatured: true },
  { id: 2, time: '05:00 - 06:00 PM', title: 'Build Dashboard', members: ['https://i.pravatar.cc/150?img=14', 'https://i.pravatar.cc/150?img=15'], memberCount: 8, isFeatured: false },
  { id: 3, time: '07:00 - 08:00 PM', title: 'Optimize Page Load', members: ['https://i.pravatar.cc/150?img=1', 'https://i.pravatar.cc/150?img=2'], memberCount: 14, isFeatured: false },
]
// ...existing code...
export default function App() {
  return (
    <div className="text-gray-200 min-h-screen font-sans bg-[var(--background)]">
      <div className="flex flex-col lg:flex-row gap-4 max-w-screen-2xl mx-auto w-full h-full">
        {/* Left Column */}
        <div className="w-full lg:w-[65%] flex flex-col gap-4 min-h-0">
          <Navbar />
          <div className={`flex-1 ${backgroundGradientStyle} rounded-3xl overflow-auto min-h-0`}>
            <div className="flex flex-col gap-y-4 p-4 sm:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between">
                <div className="flex-grow">
                  <h1 className="text-2xl font-bold text-[var(--foreground)]">Dashboard</h1>
                  <p className="w-full text-md font-light text-[var(--foreground-alt)]">Hello John, Welcome to task management!</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <ButtonIcon text={"Import Data"} Icon={IconFileImport} />
                  <ButtonIcon text={"Add Project"} Icon={IconPlus} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card heading="Total Projects" para="12 Active" checked={false} />
                <Card heading="Tasks Completed" para="89 this month" checked={false} />
                <Card heading="Team Members" para="4 Online" checked={false} />
                <Card heading="Pending Issues" para="3 Urgent" checked={false} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="p-4 col-span-1 lg:col-span-2 rounded-xl bg-[var(--background)] min-h-[140px] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h1 className="text-lg font-bold">Project Analytics</h1>
                      <p className="w-full text-sm font-light text-[var(--foreground-alt)]">Updated 1 day ago.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32"><ButtonIcon text={"Add Task"} Icon={IconPlus} /></div>
                      <IconInfoCircle className="text-[var(--foreground-alt)] cursor-pointer" />
                    </div>
                  </div>
                  <Skeleton className="bg-white h-[120px] w-full" />
                </div>
                <div className="p-3 bg-[var(--background)] rounded-xl min-h-[140px] flex items-center">
                  <Skeleton className="bg-white h-full w-full" />
                </div>
              </div>
              <div>
                <ProjectCollaboration projects={sampleProjects} />
              </div>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="w-full lg:w-[35%] flex flex-col gap-4 min-h-0">
          <MiniNav />
          <div className={`flex-1 ${backgroundGradientStyle} rounded-3xl p-4 sm:p-6 min-h-0 overflow-auto`}>
            <h2 className="text-xl font-bold mb-4">Activity Feed</h2>
            <RecentMeeting />
            <ScheduleMeeting scheduledMeetings={scheduledMeetings} />
          </div>
        </div>
      </div>
    </div>
  )
}
