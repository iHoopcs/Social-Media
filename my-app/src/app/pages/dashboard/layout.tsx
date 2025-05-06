export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  <div className="flex flex-col min-h-screen">
    <header className="bg-slate-900 text-white p-4 flex flex-row">
      <p>Social Media</p>
      <button className="text-white">Log out</button>
    </header>
    <main className="flex-1">{children}</main>
    <footer className="bg-slate-900 text-white p-4 text-center ">
      <p>Coded by: Caleb Simmons</p>
    </footer>
  </div>;
}
