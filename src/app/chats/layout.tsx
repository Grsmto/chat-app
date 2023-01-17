import * as R from "remeda";
import { ChatList } from "./ChatList";
import { ChatStoreProvider } from "./store";

async function getData() {
  const res = await fetch(
    `http://localhost:${process.env.PORT ?? 3000}/code_test_data.json`
  );

  const data: Chat[] = await res.json();
  return data;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Using new Next.js 13 feature for fun. See https://beta.nextjs.org/docs/data-fetching/fetching#asyncawait-in-server-components
  const data = await getData();
  // Let's order data initially instead of on render, as a typically this would be done
  // in an API service or on the backend
  const sortedData = R.pipe(
    data,
    R.map((x) => ({
      ...x,
      messages: R.sortBy(x.messages, (y) => y.last_updated),
    })),
    R.sortBy((x) => x.last_updated)
  );

  return (
    <ChatStoreProvider initialState={{ chats: sortedData }}>
      <div className="flex h-screen text-gray-800">
        <div className="flex flex-row h-full w-full">
          <ChatList />
          {children}
        </div>
      </div>
    </ChatStoreProvider>
  );
}
