import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-burgundy-500 text-parchment-50 hover:bg-burgundy-600 focus:ring-burgundy-400',
  secondary:
    'bg-parchment-200 text-ink-700 hover:bg-parchment-300 focus:ring-burgundy-400',
  ghost:
    'text-ink-700 hover:bg-parchment-200 focus:ring-burgundy-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', isLoading, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2
          px-4 py-2 rounded-md
          font-body font-semibold text-sm
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-parchment-100
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantClasses[variant]}
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
