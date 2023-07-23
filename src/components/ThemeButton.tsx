import { forwardRef } from "react";
import { cn } from "../lib/utils";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";

const ThemeButton = forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "light" ? SunIcon : MoonIcon;
  return (
    <Button
      ref={ref}
      className={cn("", className)}
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
      {...props}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
});

export default ThemeButton;
