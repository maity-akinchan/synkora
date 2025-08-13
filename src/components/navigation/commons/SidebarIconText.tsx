import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconTextInput {
  textContent: string;
  icon: IconProp;
}

export default function SidebarIconText({ textContent, icon }: IconTextInput) {
  return (
    <div className="mx-4 flex items-center">
      <FontAwesomeIcon className="w-5 mx-2" icon={icon} />
      <p>{textContent}</p>
    </div>
  );
}
