import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import CartContextProvider from "@/store/cart-context";

export const metadata = {
  title: "Dapur Online",
  description: "Order food online",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartContextProvider>
          <Header />
          {children}
        </CartContextProvider>
        <Footer />
      </body>
    </html>
  );
}
