import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const H3 = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          "scroll-m-20 text-2xl font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    );
  }
);

export default H3;
