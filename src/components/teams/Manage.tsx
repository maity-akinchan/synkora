import Navbar from "./Sidebar"; // Sidebar cum Navbar
import Header from "./Header";
import TeamTable from "./Table";

export default function ManageTeam() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content fills below navbar */}
      <main className="flex-1 flex flex-col bg-white p-8 min-h-screen min-w-screen ">
        <Header />
        <TeamTable />
      </main>
    </div>
  );
}
