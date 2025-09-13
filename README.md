# NIYONSHUTI Emmanuel's Blog Frontend
 frontend for my personal blog built with Next.js 15, React 19, and Tailwind CSS v4.

## 🚀 Features

### Design & Layout
- **Two-column layout** - Sidebar (25%) + Main content (75%) on desktop
- **Fully responsive** - Mobile-first design that works on all devices
- **Professional typography** - System fonts for fast loading and excellent readability

### Content Management
- **Rich text editor** - TipTap editor with formatting tools for creating posts
- **Category system** - Organize posts by categories
- **Tag support** - Multiple tags per post for better organization
- **SEO optimized** - Proper meta tags, Open Graph, and semantic HTML

### User Experience
- **Fast loading** - Optimized images, efficient caching, and Next.js performance features
- **Accessible** - WCAG compliant with proper ARIA labels and keyboard navigation
- **Error handling** - Graceful error states and loading indicators
- **Comment system** - Interactive commenting with form validation

### Admin Features
- **Admin dashboard** - Complete content management system
- **Post management** - Create, edit, delete, and publish posts
- **Category management** - Organize content with categories
- **Rich editing** - WYSIWYG editor with preview functionality
- **Draft system** - Save drafts and publish when ready

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19
- **Styling**: Tailwind CSS v4
- **Rich Text**: TipTap editor
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Authentication**: Cookie-based sessions

## 📁 Project Structure

```
blog-frontend/
├── app/
│   ├── components/
│   │   ├── admin/           # Admin panel components
│   │   ├── blog/            # Blog-specific components
│   │   ├── layout/          # Layout components (Navbar, Footer, Sidebar)
│   │   └── ui/              # Reusable UI components
│   ├── admin/               # Admin pages
│   ├── blog/[slug]/         # Individual blog post pages
│   ├── about/               # About page
│   ├── categories/[slug]/   # Category pages
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout
│   └── page.js              # Homepage
├── lib/
│   └── api.js               # API utility functions
└── package.json
```

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by NIYONSHUTI Emmanuel
