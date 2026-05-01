import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function PostCard({ post }) {
  const { slug, frontmatter } = post;
  const { title, publishedAt, date } = frontmatter;

  return (
    <li className="flex justify-between items-baseline gap-4 py-3 border-b border-gray-800">
      <Link href={`/blog/${slug}`}>{title}</Link>
      <span className="text-sm text-gray-500 shrink-0">{formatDate(publishedAt || date)}</span>
    </li>
  );
}