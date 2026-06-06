import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function PostCard({ post }) {
  const { slug, frontmatter } = post;
  const { title, publishedAt, date } = frontmatter;

  return (
    <li className="flex justify-between gap-2 py-2">
      <Link className="hover:text-blue-500 hover:underline" href={`/blog/${slug}`}>{title}</Link>
      <span className="text-xs text-gray-500">{formatDate(publishedAt || date)}</span>
    </li>
  );
}