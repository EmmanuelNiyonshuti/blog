import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const metadata = {
  title: 'About Me',
  description: 'Learn more about NIYONSHUTI Emmanuel, a backend developer passionate about technology and programming.',
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <p className="text-lg text-gray-600">
            software developer
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-12">
          
          {/* Introduction */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hello, I'm Emmanuel</h2>
            <p className="text-gray-700 leading-relaxed">
              I'm a passionate backend developer with a love for creating robust, scalable, and efficient 
              software solutions. Through this blog, I share my experiences, insights, and learnings 
              about backend development, programming best practices, and emerging technologies.
            </p>
          </div>

          {/* What I Do */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What I Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Backend Development</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Building scalable APIs, microservices, and server-side applications using modern 
                  technologies and best practices.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Database Design</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Designing efficient database schemas and optimizing queries for performance 
                  and scalability.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">System Architecture</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Planning and implementing robust system architectures that can handle growth 
                  and changing requirements.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Writing</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Sharing knowledge through clear, practical blog posts about programming 
                  concepts and real-world solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies I Work With</h2>
            <div className="flex flex-wrap gap-2">
              {[
                'Node.js', 'Express.js', 'Python', 'JavaScript', 'TypeScript', 
                'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 
                'Git', 'RESTful APIs', 'GraphQL', 'Microservices'
              ].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          {/* <h2 className="text-2xl font-bold text-gray-900 mb-4">you can also find me on</h2> */}
          <p className="text-gray-700 mb-6">
            I'm always interested in discussing technology, sharing ideas, or collaborating on projects.
          </p>
          
          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:emmanuelniyonshuti13@gmail.com"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail size={16} className="mr-2" />
              Email Me
            </a>
            <a 
              href="https://github.com/EmmanuelNiyonshuti" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Github size={16} className="mr-2" />
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/niyonshuti-emmanuel-82877b285/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Linkedin size={16} className="mr-2" />
              LinkedIn
            </a>
            <a 
              href="https://x.com/emmanulio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
            >
              <Twitter size={16} className="mr-2" />
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
