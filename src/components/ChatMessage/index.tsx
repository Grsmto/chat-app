import { PropsWithChildren, useCallback } from "react";
import clsx from "clsx";

type ChatMessageProps = {
  id: string;
  text: string;
  dateTime: string;
  isSender?: boolean;
  author?: string;
  onEdit?: (id: string, text: string) => any;
};

export const ChatMessage = ({
  text,
  author,
  id,
  dateTime,
  isSender = false,
  onEdit,
}: PropsWithChildren<ChatMessageProps>) => {
  const handleEdit = useCallback(() => {
    onEdit?.(id, text);
  }, [text, id, onEdit]);

  return (
    <div
      className={clsx(
        "p-3 rounded-lg group",
        isSender ? "col-start-6 col-end-13" : "col-start-1 col-end-8"
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-start",
          isSender && "flex-row-reverse"
        )}
      >
        {!isSender && author && (
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            {author}
          </div>
        )}
        <div
          className={clsx(
            "relative mr-3 text-sm py-2 px-4 shadow rounded-xl",
            isSender ? "bg-white" : "bg-indigo-100"
          )}
        >
          <div>{text}</div>
          <div className="absolute text-xs -top-5 left-0 -mb-5 mr-2 text-gray-500 whitespace-nowrap">
            {/* I would typically use a date formatting library for an actual app, like: https://date-fns.org/ */}
            {new Intl.DateTimeFormat("en-GB", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date(dateTime))}
          </div>
          {isSender && (
            <button
              className="hidden absolute group-hover:block bg-indigo-500 py-1 px-2 text-white rounded-xl"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
