import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, LayoutGrid, Users, LogOut, CheckCircle, Image as ImageIcon, Briefcase, Check, Edit2, X } from 'lucide-react';

const AdminPanel = ({ onLock }) => {
    const [activeSection, setActiveSection] = useState('brands');
    const [editingId, setEditingId] = useState(null);

    const [logos, setLogos] = useState(() => {
        const saved = localStorage.getItem('client_logos');
        return saved ? JSON.parse(saved) : [];
    });

    const [team, setTeam] = useState(() => {
        const saved = localStorage.getItem('team_members');
        const defaultTeam = [
            { id: 'RF00', name: 'Ashwin D', title: 'Director of Miscellaneous Things', tags: ['Finance', 'Accounts', 'Marketing', 'Sales', 'Development', 'HR'], photo: '' },
            { id: 'RF07', name: 'Uday Rathore', title: 'Creative Director', tags: ['Art Director', 'Design Critique'], photo: '' }
        ];
        return saved ? JSON.parse(saved) : defaultTeam;
    });

    const [gallery, setGallery] = useState(() => {
        const saved = localStorage.getItem('gallery_images');
        return saved ? JSON.parse(saved) : [];
    });

    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem('projects_data');
        const defaultProjects = [
            { id: '01', title: 'RetailCo', clientMsg: 'We need a futuristic shopping experience with smooth animations and fast checkout.', ourMsg: "Let's build it with React + Three.js. This one's going to be spectacular! 🚀", time: '2 h', avatar: 'R' },
            { id: '02', title: 'TravelMind', clientMsg: 'Build an AI-powered app that generates custom travel itineraries for users.', ourMsg: 'Integrating GPT + Maps API. Buckle up, this trip planner will be legendary! 🗺️', time: '5 h', avatar: 'T' }
        ];
        return saved ? JSON.parse(saved) : defaultProjects;
    });

    const [newLogo, setNewLogo] = useState('');
    const [newMember, setNewMember] = useState({ id: '', name: '', title: '', tags: '', photo: '' });
    const [newGalleryImg, setNewGalleryImg] = useState('');
    const [newProject, setNewProject] = useState({ title: '', clientMsg: '', ourMsg: '', time: '', image: '', desc: '', tags: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => { localStorage.setItem('client_logos', JSON.stringify(logos)); }, [logos]);
    useEffect(() => { localStorage.setItem('team_members', JSON.stringify(team)); }, [team]);
    useEffect(() => { localStorage.setItem('gallery_images', JSON.stringify(gallery)); }, [gallery]);
    useEffect(() => { localStorage.setItem('projects_data', JSON.stringify(projects)); }, [projects]);

    const triggerSuccess = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const clearForm = () => {
        setEditingId(null);
        setNewLogo('');
        setNewMember({ id: '', name: '', title: '', tags: '', photo: '' });
        setNewGalleryImg('');
        setNewProject({ title: '', clientMsg: '', ourMsg: '', time: '', image: '', desc: '', tags: '' });
    };

    const handleSaveLogo = (e) => {
        e.preventDefault();
        if (newLogo) {
            if (editingId) {
                setLogos(logos.map(l => l.id === editingId ? { ...l, url: newLogo } : l));
            } else {
                setLogos([...logos, { id: Date.now(), url: newLogo }]);
            }
            clearForm();
            triggerSuccess();
        }
    };

    const handleSaveMember = (e) => {
        e.preventDefault();
        if (newMember.name && newMember.id) {
            const memberData = { ...newMember, tags: Array.isArray(newMember.tags) ? newMember.tags : newMember.tags.split(',').map(t => t.trim()) };
            if (editingId) {
                setTeam(team.map(m => m.id === editingId ? memberData : m));
            } else {
                setTeam([...team, memberData]);
            }
            clearForm();
            triggerSuccess();
        }
    };

    const handleSaveGallery = (e) => {
        e.preventDefault();
        if (newGalleryImg) {
            if (editingId) {
                setGallery(gallery.map(img => img.id === editingId ? { ...img, url: newGalleryImg } : img));
            } else {
                setGallery([...gallery, { id: Date.now(), url: newGalleryImg }]);
            }
            clearForm();
            triggerSuccess();
        }
    };

    const handleSaveProject = (e) => {
        e.preventDefault();
        if (newProject.title && newProject.clientMsg) {
            const projectData = {
                ...newProject,
                avatar: newProject.title.charAt(0).toUpperCase(),
                desc: newProject.desc || newProject.clientMsg,
                tags: Array.isArray(newProject.tags)
                    ? newProject.tags
                    : (newProject.tags || '').split(',').map((t) => t.trim()).filter(Boolean)
            };
            if (editingId) {
                setProjects(projects.map(p => p.id === editingId ? { ...projectData, id: editingId } : p));
            } else {
                const id = (projects.length + 1).toString().padStart(2, '0');
                setProjects([...projects, { ...projectData, id }]);
            }
            clearForm();
            triggerSuccess();
        }
    };

    const startEditingLogo = (logo) => {
        setActiveSection('brands');
        setEditingId(logo.id);
        setNewLogo(logo.url);
    };

    const startEditingMember = (member) => {
        setActiveSection('team');
        setEditingId(member.id);
        const safeTags = Array.isArray(member.tags) ? member.tags.join(', ') : (member.tags || '');
        setNewMember({ ...member, tags: safeTags });
    };

    const startEditingGallery = (img) => {
        setActiveSection('gallery');
        setEditingId(img.id);
        setNewGalleryImg(img.url);
    };

    const startEditingProject = (p) => {
        setActiveSection('projects');
        setEditingId(p.id);
        setNewProject({
            title: p.title,
            clientMsg: p.clientMsg,
            ourMsg: p.ourMsg,
            time: p.time,
            image: p.image || '',
            desc: p.desc || '',
            tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || '')
        });
    };

    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'brand') setNewLogo(reader.result);
                else if (type === 'member') setNewMember({ ...newMember, photo: reader.result });
                else if (type === 'gallery') setNewGalleryImg(reader.result);
                else if (type === 'project') setNewProject({ ...newProject, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-[#151515] text-[#F1F1F1] flex font-['Urbanist'] pt-24 md:pt-0">
            <aside className="w-full md:w-64 border-r border-[#5C5C5C] md:h-screen fixed md:sticky top-0 z-50 bg-[#111] flex flex-row md:flex-col items-center md:items-stretch overflow-x-auto md:overflow-hidden px-4 md:px-0">
                <div className="p-4 md:p-8 border-b border-[#5C5C5C] hidden md:block">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-white text-black text-[10px] font-black flex items-center justify-center">W</div>
                        <span className="font-display uppercase tracking-widest text-sm">ADMIN OS</span>
                    </div>
                </div>
                <nav className="flex flex-row md:flex-col w-full p-2 md:p-4 gap-2">
                    {[
                        { id: 'brands', icon: LayoutGrid, label: 'Brands' },
                        { id: 'team', icon: Users, label: 'Team' },
                        { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
                        { id: 'projects', icon: Briefcase, label: 'Projects' }
                    ].map((btn) => (
                        <button key={btn.id} onClick={() => { setActiveSection(btn.id); clearForm(); }} className={`flex-1 md:flex-none flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${activeSection === btn.id ? 'bg-white text-black' : 'text-[#5C5C5C] hover:text-white'}`}>
                            <btn.icon size={14} /> <span className="hidden md:inline">{btn.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 min-h-screen">
                <header className="p-8 md:p-12 border-b border-[#5C5C5C]">
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="flex gap-[0.5vw] text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#5C5C5C]">
                                <span>0{activeSection === 'brands' ? '1' : activeSection === 'team' ? '2' : activeSection === 'gallery' ? '3' : '4'}</span><span>/</span><span>Portal System</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-display uppercase tracking-tighter">
                                {activeSection.toUpperCase()} Management
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
                            {onLock && (
                                <button onClick={onLock} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-[#5C5C5C] text-white text-[10px] font-black uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all">
                                    <LogOut size={14} /> Lock
                                </button>
                            )}
                            {editingId && (
                                <button onClick={clearForm} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all">
                                    <X size={14} /> Cancel Edit
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-4 p-8 border-b lg:border-r border-[#5C5C5C] bg-[#111]">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-[#5C5C5C] mb-8">{editingId ? 'Edit Protocol' : 'Entry Protocol'}</h2>

                        {activeSection === 'brands' && (
                            <form onSubmit={handleSaveLogo} className="space-y-6">
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#5C5C5C] mb-2">Logo Attachment</label>
                                <label className="w-full min-h-[13rem] border-2 border-dashed border-[#5C5C5C] flex items-center justify-center cursor-pointer hover:border-white transition-colors relative overflow-hidden group bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_58%)]">
                                    {newLogo && <img src={newLogo} className="absolute inset-0 w-full h-full object-contain p-8" />}
                                    <span className={`text-[10px] font-black uppercase tracking-widest z-10 px-3 py-1.5 border border-[#5C5C5C] bg-black/65 ${newLogo ? 'self-end mb-4' : ''}`}>{newLogo ? 'Image Ready' : 'Upload Logo'}</span>
                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'brand')} />
                                </label>
                                <button type="submit" disabled={!newLogo} className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest disabled:opacity-20 transition-opacity">
                                    {editingId ? 'Update Logo' : 'Deploy Logo'}
                                </button>
                            </form>
                        )}
                        {activeSection === 'team' && (
                            <form onSubmit={handleSaveMember} className="space-y-4">
                                <input type="text" placeholder="Member ID (e.g. RF01)" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs focus:ring-1 focus:ring-white outline-none" value={newMember.id} onChange={e => setNewMember({ ...newMember, id: e.target.value })} />
                                <input type="text" placeholder="Name" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs focus:ring-1 focus:ring-white outline-none" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} />
                                <input type="text" placeholder="Title" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs focus:ring-1 focus:ring-white outline-none" value={newMember.title} onChange={e => setNewMember({ ...newMember, title: e.target.value })} />
                                <input type="text" placeholder="Tags (UI, UX, Fullstack)" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs focus:ring-1 focus:ring-white outline-none" value={newMember.tags} onChange={e => setNewMember({ ...newMember, tags: e.target.value })} />
                                <label className="w-full py-6 border border-dashed border-[#5C5C5C] flex items-center justify-center text-[10px] font-black cursor-pointer relative group">
                                    {newMember.photo && <img src={newMember.photo} className="absolute inset-0 w-full h-full object-cover opacity-20" />}
                                    <span className="z-10">{newMember.photo ? 'Photo Ready ✓' : 'Add Photo'}</span>
                                    <input type="file" className="hidden" onChange={e => handleFileUpload(e, 'member')} />
                                </label>
                                <button type="submit" disabled={!newMember.name} className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest">
                                    {editingId ? 'Update Member' : 'Deploy Member'}
                                </button>
                            </form>
                        )}
                        {activeSection === 'gallery' && (
                            <form onSubmit={handleSaveGallery} className="space-y-6">
                                <label className="w-full py-12 border-2 border-dashed border-[#5C5C5C] flex items-center justify-center cursor-pointer hover:border-white transition-colors relative overflow-hidden group">
                                    {newGalleryImg && <img src={newGalleryImg} className="absolute inset-0 w-full h-full object-cover opacity-20" />}
                                    <span className="text-[10px] font-black uppercase tracking-widest z-10">{newGalleryImg ? 'Image Ready ✓' : 'Upload Image'}</span>
                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'gallery')} />
                                </label>
                                <button type="submit" disabled={!newGalleryImg} className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest">
                                    {editingId ? 'Update Shot' : 'Add to Gallery'}
                                </button>
                            </form>
                        )}
                        {activeSection === 'projects' && (
                            <form onSubmit={handleSaveProject} className="space-y-4">
                                <input type="text" placeholder="Project Name" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs focus:ring-1 focus:ring-white outline-none" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} />
                                <input type="text" placeholder="Hashtags (Food & Beverage, Hospitality, Restaurant)" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs focus:ring-1 focus:ring-white outline-none" value={newProject.tags} onChange={e => setNewProject({ ...newProject, tags: e.target.value })} />
                                <textarea placeholder="Short Description (shown on projects page)" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs focus:ring-1 focus:ring-white outline-none" rows="2" value={newProject.desc} onChange={e => setNewProject({ ...newProject, desc: e.target.value })} />
                                <textarea placeholder="Client's Requirements Message" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs focus:ring-1 focus:ring-white outline-none" rows="3" value={newProject.clientMsg} onChange={e => setNewProject({ ...newProject, clientMsg: e.target.value })} />
                                <textarea placeholder="Webingix Response Message" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs focus:ring-1 focus:ring-white outline-none" rows="3" value={newProject.ourMsg} onChange={e => setNewProject({ ...newProject, ourMsg: e.target.value })} />
                                <input type="text" placeholder="Time Frame (e.g. 12 h)" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs focus:ring-1 focus:ring-white outline-none" value={newProject.time} onChange={e => setNewProject({ ...newProject, time: e.target.value })} />
                                <label className="w-full py-8 border border-dashed border-[#5C5C5C] flex flex-col items-center justify-center text-[10px] font-black cursor-pointer relative group">
                                    {newProject.image && <img src={newProject.image} className="absolute inset-0 w-full h-full object-cover opacity-20" />}
                                    <span className="z-10">{newProject.image ? 'Project Photo Ready ✓' : 'Add Project Cover Image'}</span>
                                    <input type="file" className="hidden" onChange={e => handleFileUpload(e, 'project')} />
                                </label>
                                <button type="submit" disabled={!newProject.title} className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest">
                                    {editingId ? 'Update Project' : 'Launch Project'}
                                </button>
                            </form>
                        )}
                        <AnimatePresence>
                            {showSuccess && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4 p-3 bg-green-500/10 border border-green-500/50 text-green-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"><Check size={14} /> System Synchronized</motion.div>}
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-8 bg-black">
                        {activeSection === 'brands' && (
                            <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-[#5C5C5C] bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0))]">
                                {logos.map(logo => (
                                    <div key={logo.id} className="aspect-square border-r border-b border-[#5C5C5C] p-6 md:p-8 relative group flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_62%)]">
                                        <img src={logo.url} alt="Logo" className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
                                        <div className="absolute left-4 right-4 bottom-4 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <button onClick={() => startEditingLogo(logo)} className="flex-1 py-2 bg-white text-black text-[8px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#DDD] transition-colors"><Edit2 size={12} /> Edit</button>
                                            <button onClick={() => setLogos(logos.filter(l => l.id !== logo.id))} className="flex-1 py-2 bg-red-600 text-white text-[8px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"><Trash2 size={12} /> Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeSection === 'team' && (
                            <div className="p-8 space-y-4 border-l border-[#5C5C5C]">
                                {team.map(m => (
                                    <div key={m.id} className="p-6 border border-[#5C5C5C] bg-[#111] flex items-center gap-6 group hover:border-white transition-colors duration-500">
                                        <div className="w-20 h-24 bg-zinc-900 border border-[#5C5C5C] overflow-hidden">{m.photo && <img src={m.photo} className="w-full h-full object-cover" />}</div>
                                        <div className="flex-1">
                                            <div className="text-[8px] font-bold text-[#5C5C5C] mb-1">{m.id}</div>
                                            <div className="text-xl font-display uppercase">{m.name}</div>
                                            <div className="text-[10px] text-[#5C5C5C] uppercase">{m.title}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => startEditingMember(m)} className="p-3 bg-white/5 border border-[#5C5C5C] hover:bg-white hover:text-black transition-all"><Edit2 size={16} /></button>
                                            <button onClick={() => setTeam(team.filter(x => x.id !== m.id))} className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeSection === 'gallery' && (
                            <div className="grid grid-cols-2 lg:grid-cols-3 border-l border-[#5C5C5C]">
                                {gallery.map(img => (
                                    <div key={img.id} className="aspect-square border-r border-b border-[#5C5C5C] relative group overflow-hidden">
                                        <img src={img.url} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => startEditingGallery(img)} className="w-[50%] py-2 bg-white text-black text-[8px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"><Edit2 size={12} /> Edit</button>
                                            <button onClick={() => setGallery(gallery.filter(g => g.id !== img.id))} className="w-[50%] py-2 bg-red-600 text-white text-[8px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"><Trash2 size={12} /> Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeSection === 'projects' && (
                            <div className="p-8 space-y-6 border-l border-[#5C5C5C]">
                                {projects.map(p => (
                                    <div key={p.id} className="p-6 border border-[#5C5C5C] bg-[#111] group relative hover:border-white transition-all duration-500 overflow-hidden">
                                        <div className="flex justify-between mb-4 relative z-10">
                                            <span className="text-[10px] font-bold text-[#5C5C5C]">{p.id}</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => startEditingProject(p)} className="p-1 text-[#5C5C5C] hover:text-white transition-colors"><Edit2 size={16} /></button>
                                                <button onClick={() => setProjects(projects.filter(x => x.id !== p.id))} className="p-1 text-[#5C5C5C] hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                        {p.image && <div className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-sm -mr-8 -mt-8"><img src={p.image} className="w-full h-full object-cover" /></div>}
                                        <h3 className="text-xl font-display uppercase mb-2 relative z-10">{p.title}</h3>
                                        <div className="flex flex-wrap gap-2 mb-2 relative z-10">
                                            {Array.isArray(p.tags) && p.tags.map((tag, idx) => (
                                                <span key={idx} className="text-[9px] uppercase tracking-wider border border-[#5C5C5C] px-2 py-1 text-white">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                        {(p.desc || p.clientMsg) && (
                                            <div className="p-3 bg-black/40 border border-[#5C5C5C]/30 text-[10px] text-white uppercase leading-relaxed font-bold tracking-widest mb-2 truncate relative z-10">
                                                {(p.desc || p.clientMsg)}
                                            </div>
                                        )}
                                        <div className="p-3 bg-black/50 border border-[#5C5C5C]/30 text-[10px] text-[#5C5C5C] uppercase leading-relaxed font-bold tracking-widest mb-2 truncate relative z-10">Client: {p.clientMsg}</div>
                                        <div className="p-3 bg-white/5 border border-[#5C5C5C]/30 text-[10px] text-white uppercase leading-relaxed font-bold tracking-widest truncate relative z-10">Our Reply: {p.ourMsg}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
