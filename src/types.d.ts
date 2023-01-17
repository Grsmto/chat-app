interface Message {
  id: string;
  text: string;
  last_updated: string;
  from?: string;
}

interface Chat {
  id: string;
  name: string;
  last_updated: string;
  messages: Message[];
}
