import SearchBar from "./search-bar";
import Avatars from "./avatars";
export default function Navbar() {
    return (
        <div className="flex justify-between w-full bg-[var(--background-alt)] items-center px-4 pb-4 pt-5 rounded-b-xl">
            <SearchBar placeholderText="Search tasks or projects.."></SearchBar>
            <Avatars />
        </div>)
}