import Navbar from "./Sidebar"; // Sidebar cum Navbar
import Header from "./Header";
import TeamTable from "./Table";

export default function ManageTeam() {
  return (
    <div className="flex flex-col w-full">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content fills below navbar */}
      <main className="flex-1 flex flex-col bg-[var(--background)] p-8 overflow-auto">
        <Header />
        <TeamTable />
      </main>
    </div>
  );
}
