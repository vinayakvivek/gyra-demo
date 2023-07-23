import { forwardRef } from "react";
import { cn } from "../lib/utils";
import { Card } from "./ui/card";

const ChatBox = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      <Card className="h-full">ChatBox</Card>
    </div>
  );
});

export default ChatBox;
