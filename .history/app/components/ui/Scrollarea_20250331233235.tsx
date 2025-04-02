export function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`overflow-y-auto ${className}`}>{children}</div>;
  }
  