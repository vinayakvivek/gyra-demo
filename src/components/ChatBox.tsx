import { forwardRef } from "react";
import { cn } from "../lib/utils";
import { Card } from "./ui/card";
import { faker } from "@faker-js/faker";
import { ScrollArea } from "./ui/scroll-area";

export type UserType = "AI" | "HUMAN";

export interface ChatMessage {
  id: number;
  type: UserType;
  message: string;
}

const ChatBox = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const chatHistory: ChatMessage[] = [...Array(30)].map((_, index: number) => ({
    id: index,
    message: faker.lorem.lines(),
    type: index % 2 == 0 ? "AI" : "HUMAN",
  }));
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      <Card className="h-full flex flex-col p-5">
        <ScrollArea className="grow">
          <div className="flex flex-col space-y-2 w-full">
            {chatHistory.map((item) => (
              <div key={item.id}>
                {item.type}: {item.message}
              </div>
            ))}
            {/* <div ref={bottomRef} /> */}
          </div>
        </ScrollArea>
        <div className="w-full">
          <span className="text-sm italic">AI is typing...</span>
        </div>
        <form className="flex flex-row space-x-3 w-full">
          <input
            type="text"
            className="h-10 flex-1 rounded-md px-2 border border-gray-400 focus:outline-none focus:border-gray-600"
          />
          <button>Send</button>
        </form>
      </Card>
    </div>
  );
});

export default ChatBox;
