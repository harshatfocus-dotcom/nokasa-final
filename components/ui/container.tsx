import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Tag>
  );
}
