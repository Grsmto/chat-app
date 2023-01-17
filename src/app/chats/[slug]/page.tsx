"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { ChatMessage } from "@/components/ChatMessage";
import { MessageInput } from "@/components/MessageInput";
import { ActionType, ACTIVE_USER_ID, useChatStore } from "../store";

export default function Page({ params }: { params: { slug: string } }) {
  const {
    state: { chats },
    dispatch,
  } = useChatStore();
  const [editingMsg, setEditMsg] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const chat = chats.find((chat) => chat.id === params.slug);

  if (!chat) {
    redirect(`/chats/${chats[0].id}`);
  }

  const handleSubmit = (value: string) => {
    if (editingMsg) {
      dispatch({
        type: ActionType.EDIT_MESSAGE,
        payload: { chatId: chat.id, messageId: editingMsg.id, value },
      });
      setEditMsg(null);
    } else {
      dispatch({
        type: ActionType.NEW_MESSAGE,
        payload: { chatId: chat.id, value },
      });
    }
  };

  const handleEdit = (id: string, text: string) => {
    setEditMsg({ id, text });
  };

  return (
    <main className="flex flex-col flex-auto h-full w-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-auto -mt-4 -mx-2">
          <div className="flex flex-col h-full mb-4 mt-8">
            <div className="grid grid-cols-12 gap-y-2">
              {chat?.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  onEdit={handleEdit}
                  text={message.text}
                  id={message.id}
                  dateTime={message.last_updated}
                  {...(message.from === ACTIVE_USER_ID && {
                    isSender: true,
                    author: chat.name,
                  })}
                />
              ))}
            </div>
          </div>
        </div>
        <MessageInput onSend={handleSubmit} value={editingMsg?.text} />
      </div>
    </main>
  );
}
