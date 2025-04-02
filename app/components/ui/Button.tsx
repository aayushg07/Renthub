export function Button({ children, className, disabled, ...props }: 
    { children: React.ReactNode; className?: string; disabled?: boolean }) {
      return (
        <button
          className={`px-4 py-2 rounded-lg font-medium transition duration-300 ease-in-out ${
            disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
          } ${className}`}
          disabled={disabled}
          {...props}
        >
          {children}
        </button>
      );
    }
    