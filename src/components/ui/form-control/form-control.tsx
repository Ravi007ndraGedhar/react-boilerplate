import { Label } from "../label";
import { cn } from "@/lib/utils";

export interface FormControlProps {
  children: React.ReactNode;
  label: React.ReactNode;
  htmlFor?: string;
  className?: string;
  classNames?: {
    container?: string;
    label?: string
  };
}

export function FormControl({
  children,
  label,
  htmlFor,
  classNames,
  className,
}: FormControlProps) {
  return (
    <div className={cn(className, classNames?.container, "space-y-2.5 mb-5")}>
      <Label
        htmlFor={htmlFor}
        className={cn(
          "uppercase font-semibold text-[11px] tracking-widest text-muted-foreground",
          classNames?.label
        )}
      >
        {label}
      </Label>
      {children}
    </div>
  );
}
