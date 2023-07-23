import { forwardRef, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";
import { ChatMessage } from "../types";
import { useChatStore } from "../stores/chat-store";

const ChatBoxMessage = ({ type, message }: ChatMessage) => {
  const isHuman = type === "HUMAN";
  const justifyClass = clsx({ "justify-end": isHuman });
  return (
    <div className={cn("flex w-full flex-row", justifyClass)}>
      <div className={cn("flex w-3/4", justifyClass)}>
        <div
          className={cn(
            "w-fit rounded-xl px-3 py-1 bg-accent",
            clsx({
              "bg-chat-human": isHuman,
            })
          )}
        >
          <ReactMarkdown
            className="prose selection:bg-yellow-300"
            children={message}
          />
        </div>
      </div>
    </div>
  );
};

const ChatBox = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const { history } = useChatStore();

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div ref={ref} className={cn("", className)} {...props}>
      <Card className="h-full flex flex-col p-5 space-y-2">
        <ScrollArea type="scroll" className="grow">
          <div className="flex flex-col space-y-2 w-full">
            {history.map((item) => (
              <ChatBoxMessage key={item.id} {...item} />
            ))}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
        <div className="w-full">
          <span className="text-sm text-muted-foreground italic">
            AI is typing...
          </span>
        </div>
        <form className="flex flex-row space-x-3 w-full">
          <Input type="text" placeholder="Type in your query" />
          <Button>Send</Button>
        </form>
      </Card>
    </div>
  );
});

export default ChatBox;
