import { Menu } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
      {/* Hamburger menu button for mobile */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      >
        <Menu className="h-6 w-6" />
      </button>
      
      <div className="flex-1">
        {/* You can add a Search bar or breadcrumbs here */}
      </div>

      <div>
        {/* Placeholder for User Profile Dropdown */}
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
          U
        </div>
      </div>
    </header>
  );
}