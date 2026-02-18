import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx-utils';
import { TECH_POST_DIR} from '@/lib/utils';

export async function GET() {
  try {
    const posts = await getAllPosts(TECH_POST_DIR);
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.niyonshutiemmanuel.com';
    
    // Generate RSS XML
    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NIYONSHUTI Emmanuel | Software Developer</title>
    <link>${siteUrl}</link>
    <description>Notes on software development</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts.map(post => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.frontmatter.publishedAt || post.frontmatter.date).toUTCString();

      const description = post.frontmatter.metaDescription || post.frontmatter.excerpt?.substring(0, 160) || '';

      return `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.frontmatter.category ? `<category><![CDATA[${post.frontmatter.category}]]></category>` : ''}
      ${post.frontmatter.tags && post.frontmatter.tags.length > 0 ? post.frontmatter.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ') : ''}
    </item>`;
    }).join('')}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}