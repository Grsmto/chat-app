This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

- I used Next.js 13 new /App directory feature to try it out. It seems like the good practice is now to colocate files in "apps", so our store and service are in the `/chats` folder and not in their own separated `/services` and `/stores` folders.
- Components that are not directly reusable and specific to our app are colocated and not in the `/components` folder (here it's only `ChatList.tsx`).
- I would typically write automated tests for the stateful part in particular. I would use Jest and unit test the `/app/chats/store.tsx` make sure the reducer is returning the right test for any kind of input. Later we can add more tests (snapshot tests for components with something like Storybook or E2E tests with Playwright/Puppeteer).
- Check accessibility/keyboard navigation
- If we moved to a backend/API I would probably refactor the state part to use something like React-Query.

Credit to https://tailwindcomponents.com/component/quickchat-chat-layout for the Tailwind layout/styles.
