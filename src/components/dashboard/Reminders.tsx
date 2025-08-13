// 'use client';

// import React from 'react';
// import { useProjectStore, Meeting } from '@/lib/commons/store/useProjectStore';

// export default function Reminders() {
//     // Gather all meetings from all projects and sort by closest upcoming meeting in future
//     const projects = useProjectStore((state) => state.projects);

//     // Flatten meetings, filter future meetings only
//     const now = new Date();

   
//     const formatTimeRange = (start: string, end: string) => {
//         // Format time like 02.00 pm - 04.00 pm
//         const format24to12 = (time24: string) => {
//             const [hourStr, min] = time24.split(':');
//             let hour = parseInt(hourStr, 10);
//             const ampm = hour >= 12 ? 'pm' : 'am';
//             hour = hour % 12 || 12;
//             return `${hour.toString().padStart(2, '0')}.${min} ${ampm}`;
//         };
//         return `${format24to12(start)} - ${format24to12(end)}`;
//     };

//     return (
//         <section className="bg-white dark:bg-gray-800 rounded-md p-6 shadow flex flex-col justify-between min-h-[120px]">
//             <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-3">Reminders</h3>

//             {nextMeeting ? (
//                 <>
//                     <div className="flex flex-col gap-1">
//                         <p className="text-green-700 dark:text-green-400 font-semibold text-lg leading-snug">
//                             {nextMeeting.title}
//                         </p>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">
//                             {formatTimeRange(nextMeeting.startTime, nextMeeting.endTime)}
//                         </p>
//                         {nextMeeting.projectName && (
//                             <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 italic">{nextMeeting.projectName}</p>
//                         )}
//                     </div>

//                     <button
//                         type="button"
//                         className="mt-5 bg-green-700 hover:bg-green-600 text-white rounded-md py-2 flex items-center justify-center gap-2 text-sm font-semibold transition"
//                         aria-label={`Start meeting: ${nextMeeting.title}`}
//                         onClick={() => alert('Meeting started! 🎉')}
//                     >
//                         <svg
//                             className="w-5 h-5"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth={2}
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             viewBox="0 0 24 24"
//                             aria-hidden="true"
//                         >
//                             <circle cx="12" cy="12" r="10" />
//                             <polygon points="10 8 16 12 10 16 10 8" />
//                         </svg>
//                         Start Meeting
//                     </button>
//                 </>
//             ) : (
//                 <p className="text-gray-600 dark:text-gray-400">No upcoming meetings.</p>
//             )}
//         </section>
//     );
// }