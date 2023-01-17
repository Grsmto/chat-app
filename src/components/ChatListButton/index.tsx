import { PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { capitalize } from "@/utils/formatting";

type ChatListButtonProps = LinkProps & {
  name: string;
};

export const ChatListButton = (
  props: PropsWithChildren<ChatListButtonProps>
) => {
  const activePathname = usePathname();
  const isActive = props.href === activePathname;

  return (
    <Link
      href={props.href}
      scroll={false}
      shallow
      className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ${
        isActive && "bg-gray-100"
      }`}
    >
      <span className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
        {props.name[0].toUpperCase()}
      </span>
      <span className="ml-2 text-sm font-semibold">
        {capitalize(props.name)}
      </span>
    </Link>
  );
};
