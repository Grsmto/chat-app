"use client";

import { redirect } from "next/navigation";
import { useChatStore } from "./store";

export default function Page() {
  const {
    state: { chats },
  } = useChatStore();
  redirect(`/chats/${chats[0].id}`);
}
