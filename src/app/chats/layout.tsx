import { ChatList } from "./ChatList";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen text-gray-800">
      <div className="flex flex-row h-full w-full">
        <ChatList />
        {children}
      </div>
    </div>
  );
}
