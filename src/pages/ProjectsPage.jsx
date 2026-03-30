import React, { useEffect } from 'react';
import ProjectsTree from '../components/ProjectsTree';
import Contact from '../components/Contact';
import SEO from '../components/SEO';
import { useProjects } from '../hooks/useProjects';

const ProjectsPage = () => {
    const { data: projects = [] } = useProjects();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Task: Dynamic meta description based on actual projects
    const dynamicDesc = projects.length > 0 
        ? `Explore our latest work: ${projects.slice(0, 3).map(p => p.title).join(', ')}, and more. Professional web design and development by Webingix.` 
        : "Explore our latest work: futuristic websites, scalable web apps, and modern digital products that drive results.";

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.webingix.dev/" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.webingix.dev/projects" }
      ]
    };

    return (
        <div className="bg-[#151515]">
            <SEO 
                title="Premium Project Portfolio" 
                description={dynamicDesc}
                keywords="Webingix projects, portfolio, React web apps, case studies"
                schemaData={breadcrumbSchema}
            />
            <ProjectsTree />
            <Contact />
        </div>
    );
};

export default ProjectsPage;
