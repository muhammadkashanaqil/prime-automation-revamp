import { CursorBackdrop } from '@/components/prime/ambient-motion';
import { Header, Footer, ChatGuide } from '@/components/prime/shared';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CursorBackdrop />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <ChatGuide />
    </>
  );
}
