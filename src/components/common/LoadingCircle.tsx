import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

const LoadingCircle = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("", className)} {...props}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    </div>
  );
});

export default LoadingCircle;
