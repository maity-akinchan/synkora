// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import TeamTable from "./Table";

// export default function ManageTeam() {
//   return (
//     <div className="flex h-screen w-screen">
//       {/* Sidebar stays fixed width */}
      

//       {/* Main content takes full available width */}
//       <main className="flex-1 flex flex-col bg-white p-8 overflow-auto">
//         <Header />
//         <TeamTable />
//       </main>
//     </div>
//   );
// }

import Navbar from "./Sidebar"; // rename Sidebar → Navbar
import Header from "./Header";
import TeamTable from "./Table";

export default function ManageTeam() {
  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content fills below navbar */}
      <main className="flex-1 flex flex-col bg-white p-8 overflow-auto">
        <Header />
        <TeamTable />
      </main>
    </div>
  );
}
