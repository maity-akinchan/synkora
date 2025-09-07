import { IconClock, IconPencil, IconVideo, IconDots, IconSwitchHorizontal, IconCheck, IconX } from "@tabler/icons-react";

interface Meeting { id: number; time: string; title: string; members: string[]; memberCount: number; isFeatured?: boolean; }

const RecentMeeting = () => (
    <div className="bg-[var(--background)] p-6 rounded-3xl">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Recent Meeting</h2>
            <button className="text-gray-400 hover:text-white"><IconPencil className="w-5 h-5"/></button>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-400/20 via-cyan-400/20 to-blue-500/20 relative backdrop-blur-sm border border-white/10">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-white">Design Team</h3>
                    <p className="text-gray-300 text-sm">Discuss of design task for the month!</p>
                </div>
                <div className="flex -space-x-3">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-800" src="https://i.pravatar.cc/150?img=1" alt="member" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-800" src="https://i.pravatar.cc/150?img=2" alt="member" />
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-600 text-white text-xs font-semibold ring-2 ring-gray-800">+8</span>
                </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
                 <div className="flex items-center gap-2 text-sm text-gray-200 bg-black/20 border border-white/10 rounded-full px-4 py-2">
                    <IconClock className="w-4 h-4" />
                    <span>01:00 PM - 02:30 PM</span>
                </div>
                <button className="h-10 w-10 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white">
                    <IconVideo className="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
);

const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
    const cardClasses = meeting.isFeatured 
        ? "bg-gray-800 text-white" 
        : "bg-[var(--background)] text-[var(--foreground)]";
    const textColor = meeting.isFeatured ? "text-gray-400" : "text-[var(--foreground-alt)]";

    return (
        <div className={`${cardClasses} p-4 rounded-2xl`}>
            <div className="flex justify-between items-center mb-3">
                <div className={`flex items-center gap-2 text-sm ${textColor}`}>
                    <IconClock className="w-4 h-4"/>
                    {meeting.time}
                </div>
                <button className={`${textColor} hover:text-white`}><IconDots className="w-5 h-5"/></button>
            </div>
            <h3 className="font-bold mb-3">{meeting.title}</h3>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex -space-x-2">
                         {meeting.members.map(src => <img key={src} className="inline-block h-6 w-6 rounded-full ring-2 ring-current" src={src} alt="member"/>)}
                    </div>
                    <span className={`text-sm ml-3 ${textColor}`}>{meeting.memberCount}+ members</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="h-8 w-8 flex items-center justify-center rounded-full bg-violet-600 hover:bg-violet-700 text-white"><IconCheck className="w-4 h-4"/></button>
                    <button className="h-8 w-8 flex items-center justify-center rounded-full bg-pink-600 hover:bg-pink-700 text-white"><IconX className="w-4 h-4"/></button>
                </div>
            </div>
        </div>
    );
};

const ScheduleMeeting = ({scheduledMeetings} : {scheduledMeetings : Meeting[]}) => (
    <div className="bg-[var(--background-alt)] p-6 rounded-3xl">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Schedule Meeting</h2>
            <button className="text-gray-400 hover:text-white"><IconSwitchHorizontal className="w-5 h-5"/></button>
        </div>
        <div className="space-y-4">
            {scheduledMeetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} />)}
        </div>
    </div>
);

export { RecentMeeting, ScheduleMeeting };