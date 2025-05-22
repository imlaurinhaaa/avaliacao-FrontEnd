import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",    
});

export const metadata = {
  title: "Minhas Tarefas",
  icons: {
    icon: "/icon/favicon.ico",
  },
  description: "Projeto pra mostrar tudo que eu sei",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}