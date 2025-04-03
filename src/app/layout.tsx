import "./globals.css";
import MainLayout from "@/layouts/Main/Main.layout";
import RootLayout from "@/layouts/Root/Root.layout";

export default function VeganerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout>
      <MainLayout>{children}</MainLayout>
    </RootLayout>
  );
}
