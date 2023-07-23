import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";
import { ChatMessage } from "../types";
import { useChatStore } from "../stores/chat-store";
import { useMutation } from "react-query";
import * as api from "../api";

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
  const [query, setQuery] = useState("");
  const { history, addMessage, conversationId } = useChatStore();

  const [dots, setDots] = useState("");

  const chatMutation = useMutation({
    mutationFn: () => {
      if (!conversationId) {
        throw new Error("Conversation Id is null");
      }
      return api.chat(conversationId, query);
    },
    onSuccess: ({ output }) => {
      addAIMessage(output);
    },
  });

  const addHumanMessage = (message: string) => {
    addMessage(message, "HUMAN");
  };

  const addAIMessage = (message: string) => {
    addMessage(message, "AI");
  };

  const sendQuery = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (chatMutation.isLoading) return;
    if (!conversationId) return;
    if (!query) return;

    addHumanMessage(query);
    setQuery("");
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 4 ? prevDots + "." : "."));
    }, 500);
    chatMutation.mutate(undefined, {
      onSettled: () => {
        clearInterval(interval);
      },
    });
  };

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
            {chatMutation.isLoading && (
              <div className="rounded-xl px-3 py-1 bg-accent w-fit text-sm italic">
                AI is typing {dots}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
        <form className="flex flex-row space-x-3 w-full" onSubmit={sendQuery}>
          <Input
            type="text"
            placeholder="Type in your query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button disabled={chatMutation.isLoading}>Send</Button>
        </form>
      </Card>
    </div>
  );
});

export default ChatBox;
