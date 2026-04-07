import { decodeWish } from '../../../lib/serialization';
import WishViewer from '../../../components/WishViewer';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const unwrappedParams = await params;
  const wish = decodeWish(unwrappedParams.id);

  if (!wish) return { title: 'Gift Not Found - DigiBdayWish' };

  const name = wish.recipient_name;
  return {
    title: `🎁 A Surprise for ${name}!`,
    description: `I've created a digital birthday gift for ${name}. Open it to see the magic!`,
    openGraph: {
      title: `🎁 A Surprise for ${name}!`,
      description: `I've created a digital birthday gift for ${name}. Open it to see the magic!`,
      images: ['/og-image.png'],
    },
  };
}

export default async function WishPage({ params }) {
  const unwrappedParams = await params;
  const wish = decodeWish(unwrappedParams.id);

  if (!wish) {
    notFound();
  }

  return <WishViewer wish={wish} />;
}
