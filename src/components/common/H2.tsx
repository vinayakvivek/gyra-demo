import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const H2 = forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
          className
        )}
        {...props}
      />
    );
  }
);

export default H2;
