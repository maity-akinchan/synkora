import TeamTable from "@/components/main/teams/Table";
import { InviteTeamMemberForm } from "@/components/main/teams/AddMember";
export default function Page() {
  return (
     <div className="py-6 min-h-screen font-sans bg-[var(--background)] grid grid-cols-12 gap-8">
      <div className="p-4 flex gap-4 flex-col h-full rounded-3xl bg-[var(--background-alt)] col-span-8">
        <div className="px-4">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-foreground)' }}>Manage Team</h1>
        </div>
        <hr />
        <TeamTable />        
      </div>
      <div className="h-full rounded-3xl bg-[var(--background-alt)] col-span-4">
        <InviteTeamMemberForm />
      </div>
    </div>
  )
}
