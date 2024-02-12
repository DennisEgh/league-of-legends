
import "../style/globals.css";
import Navbar from "../components/Navbar/Navbar";

export const metadata = {
  title: "Invoicy",
  description: "When you need a second chance",
};

export default function RootLayout({ children }) {

  const variants ={
    hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  }
  return (
    

    <html lang="en">
      <body>
        <main className="app" >


          <Navbar />
          {children}
          
        </main>
      </body>
    </html>
  
  );
}
