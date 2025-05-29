import React, { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Code, BarChart, Layers, Cpu } from 'lucide-react';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });

  const skills = [
    { name: 'Programming Languages', icon: <Code size={24} />, description: 'Python | JavaScript | TypeScript | C++ | SQL' },
    { name: 'Web Development and Frameworks', icon: <Layers size={24} />, description: 'React | Next.js | Express.js | CSS | MongoDB' },
    { name: 'Tools and Technologies', icon: <BarChart size={24} />, description: 'Git | Docker | Linux | Postman | Cypress | Tableau' },
    { name: 'Data and AI', icon: <Cpu size={24} />, description: 'Pandas | NumPy | Seaborn | LangChain' }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div 
        ref={containerRef}
        className={`container mx-auto px-4 transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            I’m a full-stack developer with a strong foundation in software engineering and experience in building web applications.
            Currently, I’m focused on projects involving natural language processing, data systems and intuitive user interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">My Story</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                My journey into tech started with a curiosity for how software works particulary in cars and a strong desire to create something.
                That led me to pursue a degree in Software Engineering, where I explored everything from full-stack development to ML, AI and NLP.
              </p>
              <p>
                I enjoy building solutions that are technically sound and genuinely helpful whether it's a smart chatbot or a recommendation platform.
                For me, good software is all about clarity, purpose and the people who use it.
              </p>
              <p>
                Outside of software development, I enjoy boxing, exploring new cities and staying informed on news in automobile industry.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Skills</h3>
            <div className="grid grid-cols-1 gap-6">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-start p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-md"
                >
                  <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                    {skill.icon}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{skill.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;