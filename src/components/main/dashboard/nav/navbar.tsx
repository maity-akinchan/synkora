import SearchBar from "./search-bar";
import Avatars from "./avatars";
import { backgroundGradientStyle } from "@/lib/commons/styles";
export default function Navbar() {
    return (
        <div className={`flex justify-between w-full ${backgroundGradientStyle} items-center px-3 pb-3 pt-4 rounded-b-xl`}>
            <SearchBar placeholderText="Search tasks or projects.."/> 
            <Avatars />
        </div>
    );
}