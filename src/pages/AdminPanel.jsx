import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, LayoutGrid, Users, LogOut, CheckCircle, Image as ImageIcon, Briefcase, Check, Edit2, X, Share2, Globe, Phone, Mail } from 'lucide-react';

const PROJECTS_STORAGE_KEY = 'projects_data';
const PROJECTS_UPDATE_EVENT = 'webingix:projects_data_updated';

const AdminPanel = ({ onLock }) => {
    const [activeSection, setActiveSection] = useState('leads');
    const [submissions, setSubmissions] = useState([]);
    const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [logos, setLogos] = useState([]);
    const [team, setTeam] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [projects, setProjects] = useState([]);
    const [socials, setSocials] = useState([]);

    const fetchData = async () => {
        try {
            const [lRes, tRes, gRes, pRes, sRes] = await Promise.all([
                fetch('/api/logos'),
                fetch('/api/team'),
                fetch('/api/gallery'),
                fetch('/api/projects'),
                fetch('/api/socials')
            ]);
            if (lRes.ok) setLogos(await lRes.json());
            if (tRes.ok) setTeam(await tRes.json());
            if (gRes.ok) setGallery(await gRes.json());
            if (sRes.ok) setSocials(await sRes.json());
            if (pRes.ok) {
                const data = await pRes.json();
                setProjects(data);
                localStorage.setItem('projects_data', JSON.stringify(data));
                localStorage.setItem('webingix_cms_last_sync', Date.now().toString());
                window.dispatchEvent(new CustomEvent('webingix:projects_data_updated'));
            }
        } catch (err) {
            console.error('Failed to fetch data:', err);
        }
    };

    useEffect(() => {
        fetchData();
        const handleNewLead = () => { if (activeSection === 'leads') fetchSubmissions(); };
        window.addEventListener('webingix:new_lead_submitted', handleNewLead);
        return () => window.removeEventListener('webingix:new_lead_submitted', handleNewLead);
    }, [activeSection]);

    const fetchSubmissions = async () => {
        setIsLoadingSubmissions(true);
        try {
            const response = await fetch('/api/admin/submissions', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setSubmissions(data);
            }
        } catch (err) {
            console.error('Failed to fetch leads:', err);
        } finally {
            setIsLoadingSubmissions(false);
        }
    };

    const [newLogo, setNewLogo] = useState('');
    const [newMember, setNewMember] = useState({ id: '', name: '', title: '', tags: '', photo: '' });
    const [newGalleryImg, setNewGalleryImg] = useState('');
    const [newProject, setNewProject] = useState({ id: '', title: '', clientMsg: '', ourMsg: '', time: '', image: '', desc: '', tags: '', link: '' });
    const [newSocial, setNewSocial] = useState({ name: '', url: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    const triggerSuccess = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const clearForm = () => {
        setEditingId(null);
        setNewLogo('');
        setNewMember({ id: '', name: '', title: '', tags: '', photo: '' });
        setNewGalleryImg('');
        setNewProject({ id: '', title: '', clientMsg: '', ourMsg: '', time: '', image: '', desc: '', tags: '', link: '' });
        setNewSocial({ name: '', url: '' });
    };

    const handleSaveLogo = async (e) => {
        e.preventDefault();
        if (newLogo) {
            setIsUploading(true);
            try {
                const url = editingId ? `/api/admin/logos/${editingId}` : '/api/admin/logos';
                const method = editingId ? 'PUT' : 'POST';
                const res = await fetch(url, {
                    method, headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: newLogo, order: logos.length }), credentials: 'include'
                });
                if (res.ok) { await fetchData(); clearForm(); triggerSuccess(); }
            } finally { setIsUploading(false); }
        }
    };

    const handleSaveMember = async (e) => {
        e.preventDefault();
        if (newMember.name && newMember.id) {
            setIsUploading(true);
            try {
                const memberData = { ...newMember, tags: Array.isArray(newMember.tags) ? newMember.tags : newMember.tags.split(',').map(t => t.trim()) };
                const url = editingId ? `/api/admin/team/${editingId}` : '/api/admin/team';
                const method = editingId ? 'PUT' : 'POST';
                const res = await fetch(url, {
                    method, headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...memberData, order: team.length }), credentials: 'include'
                });
                if (res.ok) { await fetchData(); clearForm(); triggerSuccess(); }
            } finally { setIsUploading(false); }
        }
    };

    const handleSaveGallery = async (e) => {
        e.preventDefault();
        if (newGalleryImg) {
            setIsUploading(true);
            try {
                const url = editingId ? `/api/admin/gallery/${editingId}` : '/api/admin/gallery';
                const method = editingId ? 'PUT' : 'POST';
                const res = await fetch(url, {
                    method, headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: newGalleryImg, order: gallery.length }), credentials: 'include'
                });
                if (res.ok) { await fetchData(); clearForm(); triggerSuccess(); }
            } finally { setIsUploading(false); }
        }
    };

    const handleSaveProject = async (e) => {
        e.preventDefault();
        if (newProject.title) {
            setIsUploading(true);
            try {
                const projectData = {
                    ...newProject,
                    id: newProject.id || (projects.length + 1).toString().padStart(2, '0'),
                    tags: Array.isArray(newProject.tags) ? newProject.tags : (newProject.tags || '').split(',').map(t => t.trim()).filter(Boolean)
                };
                const url = editingId ? `/api/admin/projects/${editingId}` : '/api/admin/projects';
                const method = editingId ? 'PUT' : 'POST';
                const res = await fetch(url, {
                    method, headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...projectData, order: projects.length }), credentials: 'include'
                });
                if (res.ok) { await fetchData(); clearForm(); triggerSuccess(); }
            } finally { setIsUploading(false); }
        }
    };

    const handleSaveSocial = async (e) => {
        e.preventDefault();
        if (newSocial.name && newSocial.url) {
            setIsUploading(true);
            try {
                const url = editingId ? `/api/admin/socials/${editingId}` : '/api/admin/socials';
                const method = editingId ? 'PUT' : 'POST';
                const res = await fetch(url, {
                    method, headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...newSocial, order: socials.length }), credentials: 'include'
                });
                if (res.ok) { await fetchData(); clearForm(); triggerSuccess(); }
            } finally { setIsUploading(false); }
        }
    };

    const startEditingLogo = (logo) => { setActiveSection('brands'); setEditingId(logo._id); setNewLogo(logo.url); };
    const startEditingMember = (member) => { setActiveSection('team'); setEditingId(member._id); const safeTags = Array.isArray(member.tags) ? member.tags.join(', ') : (member.tags || ''); setNewMember({ ...member, tags: safeTags }); };
    const startEditingGallery = (img) => { setActiveSection('gallery'); setEditingId(img._id); setNewGalleryImg(img.url); };
    const startEditingProject = (p) => { setActiveSection('projects'); setEditingId(p._id); setNewProject({ ...p, tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''), link: p.link || '' }); };
    const startEditingSocial = (s) => { setActiveSection('socials'); setEditingId(s._id); setNewSocial({ name: s.name, url: s.url }); };

    const handleDelete = async (section, id) => {
        if (!window.confirm('Are you sure you want to delete this?')) return;
        const url = `/api/admin/${section}/${id}`;
        const res = await fetch(url, { method: 'DELETE', credentials: 'include' });
        if (res.ok) fetchData();
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
        <div className="min-h-screen bg-[#151515] text-[#F1F1F1] flex flex-col md:flex-row font-['Urbanist'] pb-24 md:pb-0">
            <aside className="w-full md:w-64 border-t md:border-t-0 md:border-r border-[#5C5C5C] md:h-screen fixed md:sticky bottom-0 md:top-0 z-50 bg-[#111] flex flex-row md:flex-col items-center md:items-stretch overflow-x-auto md:overflow-hidden px-4 md:px-0 bg-opacity-95 backdrop-blur-md md:bg-opacity-100">
                <div className="p-4 md:px-8 md:py-16 border-b border-[#5C5C5C] hidden md:block">
                    <div className="flex items-center justify-start">
                        <img src="/logo.svg" alt="Webingix" className="h-14 w-auto brightness-200" />
                    </div>
                </div>
                <nav className="flex flex-row md:flex-col w-full p-2 md:p-4 gap-2">
                    {[
                        { id: 'leads', icon: Users, label: 'Leads' },
                        { id: 'brands', icon: LayoutGrid, label: 'Brands' },
                        { id: 'team', icon: Users, label: 'Team' },
                        { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
                        { id: 'projects', icon: Briefcase, label: 'Projects' },
                        { id: 'socials', icon: Share2, label: 'Socials' }
                    ].map((btn) => (
                        <button key={btn.id} onClick={() => { setActiveSection(btn.id); clearForm(); }} className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-4 px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${activeSection === btn.id ? 'bg-white text-black' : 'text-[#5C5C5C] hover:text-white'}`}>
                            <btn.icon size={14} /> <span className="hidden md:inline">{btn.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 min-h-screen pt-0 bg-[#151515]">
                <header className="p-8 md:p-12 border-b border-[#5C5C5C]">
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="flex gap-[0.5vw] text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#5C5C5C]">
                                <span>0{['leads','brands','team','gallery','projects','socials'].indexOf(activeSection)}</span><span>/</span><span>Portal System</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-display uppercase tracking-tighter">
                                {activeSection.toUpperCase()} Management
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
                            {onLock && (
                                <button onClick={onLock} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-[#5C5C5C] text-white text-[10px] font-black uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all">
                                    <LogOut size={14} /> Lock Dashboard
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
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-[#5C5C5C] mb-8">
                            {activeSection === 'leads' ? 'Lead Hub' : editingId ? 'Update Entry' : 'Manual Entry'}
                        </h2>

                        {activeSection === 'leads' && (
                            <div className="space-y-6">
                                <div className="p-4 bg-white/5 border border-[#5C5C5C] text-[10px] font-bold uppercase tracking-widest leading-relaxed">System synchronizing with secure cluster...</div>
                                <button onClick={fetchSubmissions} className="w-full py-4 border border-[#5C5C5C] text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-colors">Force Refresh</button>
                            </div>
                        )}
                        {activeSection === 'brands' && (
                            <form onSubmit={handleSaveLogo} className="space-y-6">
                                <label className="w-full py-16 border border-dashed border-[#5C5C5C] flex flex-col items-center justify-center cursor-pointer relative group">
                                    {newLogo && <img src={newLogo} className="absolute inset-0 w-full h-full object-contain p-4 opacity-40" />}
                                    <Plus className="mb-2 opacity-50" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{newLogo ? 'Logo Processed' : 'Upload Vector Logo'}</span>
                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'brand')} />
                                </label>
                                <button type="submit" disabled={isUploading} className={`w-full py-4 font-black uppercase text-[10px] tracking-widest ${isUploading ? 'bg-[#5C5C5C] text-white cursor-not-allowed' : 'bg-white text-black'}`}>
                                    {isUploading ? 'Processing...' : (editingId ? 'Update Brand' : 'Deploy Brand')}
                                </button>
                            </form>
                        )}
                        {activeSection === 'team' && (
                            <form onSubmit={handleSaveMember} className="space-y-2">
                                <input type="text" placeholder="ID (RF00)" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none" value={newMember.id} onChange={e => setNewMember({ ...newMember, id: e.target.value })} />
                                <input type="text" placeholder="Name" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} />
                                <input type="text" placeholder="Title" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none" value={newMember.title} onChange={e => setNewMember({ ...newMember, title: e.target.value })} />
                                <input type="text" placeholder="Skills (comma separated)" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none" value={newMember.tags} onChange={e => setNewMember({ ...newMember, tags: e.target.value })} />
                                <label className="w-full py-8 border border-dashed border-[#5C5C5C] flex flex-col items-center justify-center cursor-pointer relative group mt-4">
                                    {newMember.photo && <img src={newMember.photo} className="absolute inset-0 w-full h-full object-cover opacity-40" />}
                                    <span className="text-[10px] font-black">Member Photo</span>
                                    <input type="file" className="hidden" onChange={e => handleFileUpload(e, 'member')} />
                                </label>
                                <button type="submit" disabled={isUploading} className={`w-full py-4 font-black uppercase text-[10px] tracking-widest mt-4 ${isUploading ? 'bg-[#5C5C5C] text-white cursor-not-allowed' : 'bg-white text-black'}`}>
                                    {isUploading ? 'Deploying...' : 'Deploy Member'}
                                </button>
                            </form>
                        )}
                        {activeSection === 'gallery' && (
                            <form onSubmit={handleSaveGallery} className="space-y-6">
                                <label className="w-full py-16 border border-dashed border-[#5C5C5C] flex flex-col items-center justify-center cursor-pointer relative group">
                                    {newGalleryImg && <img src={newGalleryImg} className="absolute inset-0 w-full h-full object-cover opacity-40" />}
                                    <span className="text-[10px] font-black uppercase tracking-widest">Add To Gallery</span>
                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'gallery')} />
                                </label>
                                <button type="submit" disabled={isUploading} className={`w-full py-4 font-black uppercase text-[10px] tracking-widest ${isUploading ? 'bg-[#5C5C5C] text-white cursor-not-allowed' : 'bg-white text-black'}`}>
                                    {isUploading ? 'Uploading...' : 'Update Feed'}
                                </button>
                            </form>
                        )}
                        {activeSection === 'projects' && (
                            <form onSubmit={handleSaveProject} className="space-y-4">
                                <input type="text" placeholder="Project Name" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} />
                                <input type="text" placeholder="Project URL (https://...)" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none" value={newProject.link} onChange={e => setNewProject({ ...newProject, link: e.target.value })} />
                                <input type="text" placeholder="Tags (tag1, tag2)" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none" value={newProject.tags} onChange={e => setNewProject({ ...newProject, tags: e.target.value })} />
                                <textarea placeholder="Client's Requirements" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none h-24" value={newProject.clientMsg} onChange={e => setNewProject({ ...newProject, clientMsg: e.target.value })} />
                                <textarea placeholder="Our Response" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none h-24" value={newProject.ourMsg} onChange={e => setNewProject({ ...newProject, ourMsg: e.target.value })} />
                                <input type="text" placeholder="Time Frame (e.g., 2 weeks)" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none" value={newProject.time} onChange={e => setNewProject({ ...newProject, time: e.target.value })} />
                                <label className="w-full py-8 border border-dashed border-[#5C5C5C] flex flex-col items-center justify-center cursor-pointer relative group">
                                    {newProject.image && <img src={newProject.image} className="absolute inset-0 w-full h-full object-cover opacity-40" />}
                                    <span className="text-[10px] font-black uppercase">Project Image</span>
                                    <input type="file" className="hidden" onChange={e => handleFileUpload(e, 'project')} />
                                </label>
                                <button type="submit" disabled={isUploading} className={`w-full py-4 font-black uppercase text-[10px] tracking-widest ${isUploading ? 'bg-[#5C5C5C] text-white cursor-not-allowed' : 'bg-white text-black'}`}>
                                    {isUploading ? 'Publishing...' : 'Update Projects'}
                                </button>
                            </form>
                        )}
                        {activeSection === 'socials' && (
                            <form onSubmit={handleSaveSocial} className="space-y-4">
                                <select 
                                    className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none text-white cursor-pointer"
                                    value={newSocial.name}
                                    onChange={e => setNewSocial({ ...newSocial, name: e.target.value })}
                                >
                                    <option value="">Select Platform</option>
                                    <option value="X">X (Twitter)</option>
                                    <option value="Call">Call / Phone</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="Email">Email</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="Instagram">Instagram</option>
                                </select>
                                <input type="text" placeholder="Profile URL / Link" className="w-full bg-black border border-[#5C5C5C] p-3 text-xs outline-none" value={newSocial.url} onChange={e => setNewSocial({ ...newSocial, url: e.target.value })} />
                                <button type="submit" disabled={isUploading} className={`w-full py-4 font-black uppercase text-[10px] tracking-widest ${isUploading ? 'bg-[#5C5C5C] text-white cursor-not-allowed' : 'bg-white text-black'}`}>
                                    {isUploading ? 'Updating...' : (editingId ? 'Update Link' : 'Deploy Link')}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="lg:col-span-8 p-0">
                        {activeSection === 'leads' && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-[#5C5C5C]">
                                            {['Date', 'Name', 'Contact', 'Type', 'Project'].map(h => <th key={h} className="p-6 text-[10px] font-black uppercase tracking-widest text-[#5C5C5C]">{h}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {submissions.map((s, i) => (
                                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-6 text-xs text-[#5C5C5C]">{new Date(s.timestamp).toLocaleDateString()}</td>
                                                <td className="p-6 text-sm font-bold uppercase">{s.name}</td>
                                                <td className="p-6 text-xs font-medium text-[#39FF14]">{s.contact}</td>
                                                <td className="p-6 text-[10px] font-black uppercase opacity-60">{s.type}</td>
                                                <td className="p-6 text-[10px] font-bold uppercase">{s.project}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {(activeSection === 'brands' || activeSection === 'gallery') && (
                            <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                                {(activeSection === 'brands' ? logos : gallery).map(item => (
                                    <div key={item._id} className="aspect-square bg-black border border-white/10 flex items-center justify-center p-6 relative group">
                                        <img src={item.url} className="max-w-full max-h-full object-contain" />
                                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                            <button onClick={() => handleDelete(activeSection === 'brands' ? 'logos' : 'gallery', item._id)} className="p-3 bg-red-500 text-white rounded-full"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeSection === 'team' && (
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {team.map(m => (
                                    <div key={m._id} className="bg-white/5 border border-white/10 p-6 flex flex-col relative group">
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => startEditingMember(m)} className="p-2 hover:text-white"><Edit2 size={14} /></button>
                                            <button onClick={() => handleDelete('team', m._id)} className="p-2 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
                                        <div className="w-16 h-16 bg-black mb-4 overflow-hidden rounded-sm">{m.photo && <img src={m.photo} className="w-full h-full object-cover" />}</div>
                                        <h3 className="text-sm font-black uppercase tracking-widest">{m.name}</h3>
                                        <p className="text-[10px] font-bold text-[#5C5C5C] mt-1">{m.title}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeSection === 'projects' && (
                            <div className="p-8 grid grid-cols-1 gap-4">
                                {projects.map(p => (
                                    <div key={p._id} className="bg-white/5 border border-white/10 p-6 flex justify-between items-center group">
                                        <div>
                                            <h3 className="text-lg font-black uppercase tracking-tighter">{p.title}</h3>
                                            <p className="text-[10px] font-bold text-[#5C5C5C] mt-1 uppercase tracking-widest">{p.id} / STATUS: DEPLOYED</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <button onClick={() => startEditingProject(p)} className="p-4 bg-white text-black hover:bg-zinc-200"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete('projects', p._id)} className="p-4 bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeSection === 'socials' && (
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {socials.map(s => (
                                    <div key={s._id} className="bg-white/5 border border-white/10 p-6 flex justify-between items-center group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-black flex items-center justify-center border border-white/10 rounded-sm">
                                                {s.name.toLowerCase().includes('phone') || s.name.toLowerCase().includes('call') ? <Phone size={16} /> : 
                                                 s.name.toLowerCase().includes('email') || s.name.toLowerCase().includes('mail') ? <Mail size={16} /> : 
                                                 <Globe size={16} />}
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-black uppercase tracking-widest">{s.name}</h3>
                                                <p className="text-[10px] text-[#5C5C5C] mt-1 font-mono max-w-[150px] truncate">{s.url}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => startEditingSocial(s)} className="p-2 opacity-30 group-hover:opacity-100 hover:text-white"><Edit2 size={14} /></button>
                                            <button onClick={() => handleDelete('socials', s._id)} className="p-2 opacity-30 group-hover:opacity-100 hover:text-red-500"><Trash2 size={14} /></button>
                                        </div>
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
