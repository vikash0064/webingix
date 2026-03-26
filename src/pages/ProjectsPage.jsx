import React, { useEffect } from 'react';
import ProjectsTree from '../components/ProjectsTree';
import Contact from '../components/Contact';

const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#151515]">
            <ProjectsTree />
            <Contact />
        </div>
    );
};

export default ProjectsPage;
