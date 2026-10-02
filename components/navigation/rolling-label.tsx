type RollingLabelProps = {
  children: string;
};

export function RollingLabel({ children }: RollingLabelProps) {
  return (
    <span className="rolling-label">
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
}
