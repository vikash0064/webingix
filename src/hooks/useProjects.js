import { useQuery } from '@tanstack/react-query';

const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
};

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        retry: 2,
    });
};
