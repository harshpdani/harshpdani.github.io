import React, { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { ExternalLink, Code, Eye } from 'lucide-react';

// Project data
const projectsData = [
  {
    id: 1,
    title: 'Buchly – Book Recommendation System',
    category: 'AI',
    tags: ['ChromaDB', 'Gradio', 'LangChain', 'Python'],
    description: 'A recommendation tool that uses semantic search and vector databases to understand natural language queries.',
    image: 'https://github.com/harshpdani/buchly/blob/main/screenshots/Home_Page.png?raw=true',
    demoLink: '#',
    codeLink: 'https://github.com/harshpdani/buchly'
  },
  {
    id: 2,
    title: 'Centsible – Personal Budgeting App',
    category: 'Web App',
    tags: ['Axios', 'Express.js', 'React', 'MongoDB'],
    description: 'A personal finance tool for managing income, expenses and analytics with a user-friendly dashboard.',
    image: 'https://github.com/harshpdani/centsible/blob/main/screenshots/Dashboard_Page.png?raw=true',
    demoLink: '#',
    codeLink: 'https://github.com/harshpdani/centsible'
  },
  {
    id: 3,
    title: 'SoleMate – E-Commerce Chatbot',
    category: 'AI',
    tags: ['AstraDB', 'Flask', 'NLP', 'Python', 'Vector Search'],
    description: 'A chatbot that handles real-time product inquiries, personalized recommendations and availability checks.',
    image: 'https://github.com/harshpdani/solemate/blob/main/screenshots/Greeting.png?raw=true',
    demoLink: '#',
    codeLink: 'https://github.com/harshpdani/solemate'
  }
];

// Filter categories
const categories = ['All', 'Web App', 'AI'];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div 
        ref={containerRef}
        className={`container mx-auto px-4 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">My Projects</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Here's a selection of projects that highlight my work in full-stack development and real-world problem solving.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${filter === category 
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id}
              className="bg-white dark:bg-slate-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium px-3 py-1 bg-blue-500/80 text-white rounded-full">
                        {project.category}
                      </span>
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => setSelectedProject(project.id)}
                          className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
                          aria-label="View details"
                        >
                          <Eye size={18} className="text-white" />
                        </button>
                        <a 
                          href={project.demoLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
                          aria-label="View live demo"
                        >
                          <ExternalLink size={18} className="text-white" />
                        </a>
                        <a 
                          href={project.codeLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
                          aria-label="View source code"
                        >
                          <Code size={18} className="text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-600 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {(() => {
                const project = projectsData.find(p => p.id === selectedProject);
                if (!project) return null;
                
                return (
                  <>
                    <div className="relative aspect-video">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                        aria-label="Close modal"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                          <div className="flex items-center space-x-2 mb-6">
                            <span className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full">
                              {project.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                          >
                            <ExternalLink size={16} className="mr-2" />
                            Live Demo
                          </a>
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition-colors"
                          >
                            <Code size={16} className="mr-2" />
                            Source Code
                          </a>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3">About this project</h4>
                        <p className="text-slate-700 dark:text-slate-300 mb-4">
                          {project.description}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
                          nisl nec ultricies ultricies, nisl nisl aliquam nisl, eget aliquam nisl 
                          nisl sit amet nisl. Sed euismod, nisl nec ultricies ultricies, nisl nisl 
                          aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                        </p>
                      </div>
                      <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <span key={index} className="text-sm px-3 py-1 bg-slate-100 dark:bg-slate-600 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;