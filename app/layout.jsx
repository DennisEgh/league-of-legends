import "../style/globals.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
export const metadata = {
  title: "INVOICY",
  description: "When you need a second chance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="app">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
