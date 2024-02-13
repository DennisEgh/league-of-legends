import "../style/globals.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { NextAuthProvider } from "./providers";
import { Toaster } from "sonner"


export const metadata = {
  title: "INVOICY",
  description: "When you need a second chance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <main className="app">
            <Navbar />
            {children}
            <Toaster richColors />
            <Footer />
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
