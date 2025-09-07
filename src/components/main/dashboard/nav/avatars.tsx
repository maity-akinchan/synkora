import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function Avatars() {
  const uris = [
    "https://github.com/shadcn.png",
    "https://avatars.githubusercontent.com/u/1?v=4",
    "https://avatars.githubusercontent.com/u/2?v=4",
    "https://avatars.githubusercontent.com/u/3?v=4",
  ];

  return (
    <div className="flex relative items-center">
      {uris.map((uri, index) => (
        <Avatar
          key={index}
          className={`-ml-2 ${index === 0 ? "ml-0" : ""} z-${10 + index * 10} w-7 h-7`} // Reduced size
        >
          <AvatarImage src={uri} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
      <PlusCircledIcon className="ml-2 w-6 h-6 text-[var(--foreground-alt)]" /> {/* Reduced size */}
    </div>
  );
}
