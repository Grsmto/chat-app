// Could have also just do something like `import json from "code_test_data.json"` here
// but this is closer to reality.

export async function getChatData() {
  const res = await fetch(
    `http://localhost:${process.env.PORT ?? 3000}/code_test_data.json`
  );

  const data: Chat[] = await res.json();
  return data;
}
