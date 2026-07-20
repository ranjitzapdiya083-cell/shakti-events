import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getUserSession } from '@/lib/session';

export default async function SiteLayout({ children }) {
  const session = await getUserSession();

  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
}
