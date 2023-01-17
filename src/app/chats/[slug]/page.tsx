"use client";

import { ChatMessage } from "@/components/ChatMessage";
import { MessageInput } from "@/components/MessageInput";
import { ActionType, ACTIVE_USER_ID, useChatStore } from "../store";

export default function Page({ params }: { params: { slug: string } }) {
  const {
    state: { chats },
    dispatch,
  } = useChatStore();
  const chat = chats.find((chat) => chat.id === params.slug);

  if (!chat) return null;

  const handleSubmit = (value: string) => {
    dispatch({
      type: ActionType.NEW_MESSAGE,
      payload: { chatId: chat.id, value },
    });
  };

  return (
    <main className="flex flex-col flex-auto h-full w-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-auto -mt-4 -mx-2">
          <div className="flex flex-col h-full mb-4 mt-8">
            <div className="grid grid-cols-12 gap-y-2"></div>
          </div>
        </div>
        <MessageInput onSend={handleSubmit} />
      </div>
    </main>
  );
}
