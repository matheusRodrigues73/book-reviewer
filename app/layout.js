import Link from "next/link";
import "./global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <header className="flex items-center gap-6 h-12 p-1 bg-yellow-950 text-white">
          <h1 className="h-full text-2xl">Book Review</h1>
          <nav className="flex items-center gap-2 h-full">
            <Link href="/">Relevantes</Link>
            <Link href="/recentes">Recentes</Link>
            <Link href="/explorar">Explorar</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
