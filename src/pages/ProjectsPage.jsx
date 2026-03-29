import React, { useEffect } from 'react';
import ProjectsTree from '../components/ProjectsTree';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#151515]">
            <SEO 
                title="Our Portfolio | Webingix" 
                description="Explore our latest work: futuristic websites, scalable web apps, and modern digital products that drive results." 
                keywords="Webingix projects, portfolio, React web apps, case studies"
            />
            <ProjectsTree />
            <Contact />
        </div>
    );
};

export default ProjectsPage;
