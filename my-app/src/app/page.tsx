import { AuthComponent } from "./components/AuthComponent";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-slate-900 text-white p-4">
          <p className="text-2xl font-bold">Social Media</p>
        </header>
        <main className="flex-1">
          <AuthComponent />
        </main>
      </div>
    </>
  );
}
