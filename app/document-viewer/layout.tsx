export default function DocumentViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mxn-h-screen bg-background">
      {children}
    </div>
  );
}
