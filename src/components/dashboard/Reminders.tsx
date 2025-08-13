// 'use client';

// import React from 'react';
// import { useProjectStore, Meeting } from '@/lib/commons/store/useProjectStore';

// export default function Reminders() {
//     const projects = useProjectStore((state) => state.projects);
//     const now = new Date();

//     // Flatten meetings and find closest upcoming one
//     const allMeetings: (Meeting & { projectName?: string })[] = [];
//     projects.forEach((p) => {
//         p.meetings?.forEach((m) => {
//             if (new Date(`${m.date}T${m.startTime}`) > now) {
//                 allMeetings.push({ ...m, projectName: p.name });
//             }
//         });
//     });

//     const nextMeeting = allMeetings.sort(
//         (a, b) =>
//             new Date(`${a.date}T${a.startTime}`).getTime() -
//             new Date(`${b.date}T${b.startTime}`).getTime()
//     )[0];

//     const formatTimeRange = (start: string, end: string) => {
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
//         <section
//             className="rounded-md p-6 shadow flex flex-col justify-between min-h-[120px]"
//             style={{
//                 backgroundColor: 'var(--color-background)',
//                 color: 'var(--color-foreground)',
//             }}
//         >
//             <h3
//                 className="font-semibold mb-3"
//                 style={{ color: 'var(--color-foreground)' }}
//             >
//                 Reminders
//             </h3>

//             {nextMeeting ? (
//                 <>
//                     <div className="flex flex-col gap-1">
//                         <p
//                             className="font-semibold text-lg leading-snug"
//                             style={{ color: 'var(--color-success)' }}
//                         >
//                             {nextMeeting.title}
//                         </p>
//                         <p
//                             className="text-sm"
//                             style={{ color: 'var(--color-muted-foreground)' }}
//                         >
//                             {formatTimeRange(
//                                 nextMeeting.startTime,
//                                 nextMeeting.endTime
//                             )}
//                         </p>
//                         {nextMeeting.projectName && (
//                             <p
//                                 className="text-xs mt-1 italic"
//                                 style={{ color: 'var(--color-muted)' }}
//                             >
//                                 {nextMeeting.projectName}
//                             </p>
//                         )}
//                     </div>

//                     <button
//                         type="button"
//                         className="mt-5 rounded-md py-2 flex items-center justify-center gap-2 text-sm font-semibold transition"
//                         aria-label={`Start meeting: ${nextMeeting.title}`}
//                         style={{
//                             backgroundColor: 'var(--color-success)',
//                             color: 'var(--color-success-foreground)',
//                         }}
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
//                 <p style={{ color: 'var(--color-muted-foreground)' }}>
//                     No upcoming meetings.
//                 </p>
//             )}
//         </section>
//     );
// }
