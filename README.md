# NIYONSHUTI Emmanuel's Blog Frontend

A clean, professional frontend for NIYONSHUTI Emmanuel's personal blog built with Next.js 15, React 19, and Tailwind CSS v4. This blog focuses on backend development, programming, and technology content.

## 🚀 Features

### Design & Layout
- **Miguel Grinberg-inspired design** - Clean, minimal aesthetic focused on content
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

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API server (running on http://localhost:5000)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

Create a `.env.local` file for environment variables:

```env
API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🎨 Design Philosophy

This blog follows Miguel Grinberg's design principles:

- **Content-first approach** - Typography and readability are prioritized
- **Minimal interface** - Clean design that doesn't distract from content
- **Professional appearance** - Suitable for technical writing and professional use
- **Accessible design** - Works for all users regardless of abilities

## 📱 Responsive Design

The layout adapts to different screen sizes:

- **Desktop (lg+)**: Two-column layout with sidebar
- **Tablet (md)**: Stacked layout with collapsible navigation
- **Mobile (sm)**: Single column with mobile-optimized navigation

## 🔧 API Integration

The frontend expects these API endpoints:

### Posts
- `GET /api/posts` - Fetch all posts
- `GET /api/posts/:slug` - Fetch single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Categories
- `GET /api/categories` - Fetch all categories
- `GET /api/categories/:slug/posts` - Fetch posts by category
- `POST /api/categories` - Create category

### Authentication
- `POST /api/auth/login` - Admin login

## 🎯 Pages & Routes

### Public Pages
- `/` - Homepage with blog posts and sidebar
- `/blog/[slug]` - Individual blog post
- `/about` - About page with personal information
- `/categories/[slug]` - Posts filtered by category

### Admin Pages
- `/admin` - Dashboard with stats and quick actions
- `/admin/posts` - Posts management table
- `/admin/posts/new` - Create new post
- `/admin/posts/[id]/edit` - Edit existing post
- `/admin/categories` - Category management

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

```env
API_BASE_URL=https://your-api-domain.com/api
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 👨‍💻 About NIYONSHUTI Emmanuel

- **Role**: Backend Developer
- **Focus**: Scalable solutions, programming best practices, technology trends
- **GitHub**: [EmmanuelNiyonshuti](https://github.com/EmmanuelNiyonshuti)
- **LinkedIn**: [niyonshuti-emmanuel-82877b285](https://www.linkedin.com/in/niyonshuti-emmanuel-82877b285/)
- **Twitter**: [@emmanulio](https://x.com/emmanulio)
- **Email**: emmanuelniyonshuti13@gmail.com

## 📝 Content Guidelines

When creating blog posts:

1. **Write clear, descriptive titles**
2. **Use proper categories and tags**
3. **Include excerpt for better SEO**
4. **Format code blocks properly**
5. **Add meaningful headings and structure**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by NIYONSHUTI Emmanuel
