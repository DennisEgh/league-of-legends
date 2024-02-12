
import "../style/globals.css";
import Navbar from "../components/Navbar/Navbar";

export const metadata = {
  title: "INVOICY",
  description: "When you need a second chance",
};

export default function RootLayout({ children }) {

 
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
