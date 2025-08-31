// "use client";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <>
//       <aside
//         className={`${
//           isOpen ? "w-64" : "w-0"
//         } bg-white shadow-md flex flex-col transition-all duration-300 overflow-hidden`}
//       >
//         <div className="flex items-center justify-between px-4 py-4 border-b">
//           {isOpen && <h2 className="font-semibold text-lg">Synkora</h2>}
//           <button
//             className="p-2 rounded-md hover:bg-gray-100"
//             onClick={() => setIsOpen(false)}
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {isOpen && (
//           <nav className="flex-1 px-2 space-y-2 mt-2">
//             <a
//               href="#"
//               className="block px-4 py-2 rounded-md font-medium text-indigo-600 bg-indigo-100"
//             >
//               Manage team
//             </a>
//             <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
//               Team billing
//             </a>
//             <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
//               Settings
//             </a>
//             <hr className="my-2" />
//             <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
//               Home
//             </a>
//             <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
//               Get Support
//             </a>
//             <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
//               Log out
//             </a>
//           </nav>
//         )}
//       </aside>

//       {!isOpen && (
//         <button
//           className="absolute top-4 left-4 p-2 rounded-md bg-white shadow hover:bg-gray-100"
//           onClick={() => setIsOpen(true)}
//         >
//           <Menu size={20} />
//         </button>
//       )}
//     </>
//   );
// }
// "use client";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="w-full bg-white shadow-md">
//       {/* Navbar Header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b">
//         <h2 className="font-semibold text-lg">Synkora</h2>
//         <button
//           className="p-2 rounded-md hover:bg-gray-100"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </div>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="px-4 py-3 space-y-2">
//           <a
//             href="#"
//             className="block px-4 py-2 rounded-md font-medium text-indigo-600 bg-indigo-100"
//           >
//             Manage team
//           </a>
//           <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
//             Team billing
//           </a>
//           <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
//             Settings
//           </a>
//           <hr className="my-2" />
//           <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
//             Home
//           </a>
//           <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
//             Get Support
//           </a>
//           <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
//             Log out
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// }
"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md">
      {/* Navbar Header */}
      <div className="flex items-center px-4 py-3 border-b">
        {/* Hamburger Toggle replaces Synkora */}
        <button
          className="p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="px-4 py-3 space-y-2">
          <a
            href="#"
            className="block px-4 py-2 rounded-md font-medium text-indigo-600 bg-indigo-100"
          >
            Manage team
          </a>
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
            Team billing
          </a>
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
            Settings
          </a>
          {/* <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
            Home
          </a>
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
            Get Support
          </a>
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100">
            Log out
          </a> */}
        </div>
      )}
    </nav>
  );
}
