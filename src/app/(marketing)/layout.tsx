import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import ChatWidget from "@/components/chatbot/ChatWidget";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative bg-prime-navy">
      <Header />
      <main className="flex-grow pt-20 sm:pt-24">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
