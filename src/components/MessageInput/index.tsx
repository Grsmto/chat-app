import {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

type MessageInputProps = {
  onSend: (text: string) => any;
  value?: string;
};

export const MessageInput = ({
  onSend,
  value: editValue,
}: PropsWithChildren<MessageInputProps>) => {
  const [value, setValue] = useState<string>("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSend(value);
    setValue("");
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  useEffect(() => {
    if (editValue) setValue(editValue);
  }, [editValue]);

  return (
    <form
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
      onSubmit={handleSubmit}
    >
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            autoFocus
            type="text"
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            onChange={handleChange}
            value={value}
          />
        </div>
      </div>
      <div className="ml-4">
        <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
          Send
        </button>
      </div>
    </form>
  );
};
