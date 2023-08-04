import { forwardRef } from "react";
import { cn } from "../lib/utils";
import ThemeButton from "./ThemeButton";
import { useNavigate } from "react-router-dom";

const Navbar = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const navigate = useNavigate();
    return (
      <nav ref={ref} className={cn("bg bg-accent p-4", className)} {...props}>
        <div className="flex flex-row justify-between">
          <h1
            className="scroll-m-20 text-4xl font-extrabold tracking-tight hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            GYRA
          </h1>
          <ThemeButton />
        </div>
      </nav>
    );
  }
);

export default Navbar;
