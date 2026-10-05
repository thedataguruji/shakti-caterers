import { SelectHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, id, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-stone-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={clsx(
            "rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-brand-500",
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);
Select.displayName = "Select";
