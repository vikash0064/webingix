import React, { useEffect, useState } from 'react';
import AdminPanel from './AdminPanel';

const AdminAccessPage = () => {
    const [pin, setPin] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const syncSession = async () => {
        try {
            const response = await fetch('/api/admin/session', {
                credentials: 'include'
            });
            const data = await response.json();
            setIsUnlocked(Boolean(data.authenticated));
            setError('');
        } catch {
            setIsUnlocked(false);
            setError('Admin server is not running');
        } finally {
            setIsCheckingSession(false);
        }
    };

    useEffect(() => {
        syncSession();
    }, []);

    const handleUnlock = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ pin })
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Unable to unlock admin');
                }

                setIsUnlocked(true);
                setError('');
                setPin('');
            })
            .catch((unlockError) => {
                setError(unlockError.message || 'Unable to unlock admin');
                setPin('');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handleLock = () => {
        fetch('/api/admin/logout', {
            method: 'POST',
            credentials: 'include'
        }).finally(() => {
            setIsUnlocked(false);
            setError('');
            setPin('');
        });
    };

    if (isCheckingSession) {
        return (
            <div className="min-h-screen bg-[#151515] text-white flex items-center justify-center px-6 pt-24 md:pt-0">
                <div className="text-[10px] font-black uppercase tracking-[0.45em] text-[#5C5C5C]">
                    Checking Secure Access
                </div>
            </div>
        );
    }

    if (isUnlocked) {
        return <AdminPanel onLock={handleLock} />;
    }

    return (
        <div className="min-h-screen bg-[#151515] text-white flex items-center justify-center px-6 pt-24 md:pt-0">
            <div className="w-full max-w-md border border-[#5C5C5C] bg-black/70 backdrop-blur-sm p-8 md:p-10">
                <div className="text-[10px] font-black uppercase tracking-[0.45em] text-[#5C5C5C] mb-4">
                    Private Access
                </div>
                <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tighter mb-4">
                    Enter PIN
                </h1>
                <p className="text-sm text-white/60 mb-8">
                    To unlock the admin panel, your personal PIN is required
                </p>

                <form onSubmit={handleUnlock} className="space-y-4">
                    <input
                        type="password"
                        inputMode="numeric"
                        autoFocus
                        value={pin}
                        onChange={(e) => {
                            setPin(e.target.value.replace(/\D/g, ''));
                            if (error) setError('');
                        }}
                        placeholder="Enter PIN"
                        className="w-full bg-[#111] border border-[#5C5C5C] px-4 py-4 text-xl tracking-[0.35em] outline-none focus:border-white transition-colors"
                    />
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[#5C5C5C]">
                        Server protected PIN required
                    </div>
                    {error && (
                        <div className="text-[11px] uppercase tracking-[0.25em] text-red-400">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting || !pin}
                        className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.35em] hover:bg-[#dcdcdc] transition-colors"
                    >
                        {isSubmitting ? 'Unlocking...' : 'Unlock Admin'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminAccessPage;
