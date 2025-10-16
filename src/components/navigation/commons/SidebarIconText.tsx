import React from 'react';

interface IconTextInput {
  textContent: string;
  icon?: React.ReactNode;
}

export default function SidebarIconText({ textContent, icon }: IconTextInput) {
  return (
    <div className="mx-4 flex items-center">
      {icon && <span className="w-5 mx-2">{icon}</span>}
      <p>{textContent}</p>
    </div>
  );
}
