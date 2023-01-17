"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { v4 as uuidv4 } from "uuid";
import produce, { current } from "immer";

export const ACTIVE_USER_ID = "me";

export interface State {
  chats: Chat[];
}

export enum ActionType {
  NEW_MESSAGE = "new message",
}

export type Action = {
  type: ActionType.NEW_MESSAGE;
  payload: { chatId: string; value: string };
};

export const reducer = produce<(draft: State, action: Action) => State>(
  (draft, action) => {
    let currentChat;

    switch (action.type) {
      case ActionType.NEW_MESSAGE:
        currentChat = draft.chats.find(
          (chat) => chat.id === action.payload.chatId
        );

        currentChat?.messages.push({
          id: uuidv4(),
          text: action.payload.value,
          last_updated: new Date().toISOString(),
          from: ACTIVE_USER_ID,
        });

        break;
      default:
        throw Error("Unknown action.");
    }

    console.log(action, current(draft));
  }
);

export const ChatStoreContext = createContext<
  | {
      state: State;
      dispatch: Dispatch<Action>;
    }
  | undefined
>(undefined);
ChatStoreContext.displayName = "ChatStoreContext";

export const ChatStoreProvider = ({
  initialState,
  children,
}: PropsWithChildren<{ initialState: any }>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ChatStoreContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ChatStoreContext.Provider>
  );
};

export function useChatStore() {
  const context = useContext(ChatStoreContext);

  if (context === undefined) {
    throw new Error("useChatStore must be used within ChatStoreContext");
  }

  return context;
}
