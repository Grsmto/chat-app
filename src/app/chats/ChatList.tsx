"use client";

import { ChatListButton } from "@/components/ChatListButton";
import { useChatStore } from "./store";

export const ChatList = () => {
  const { state } = useChatStore();

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-col space-y-1 -mx-2 overflow-y-auto">
            {state.chats?.map((chat) => (
              <ChatListButton
                href={`/chats/${chat.id}`}
                key={chat.id}
                name={chat.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
