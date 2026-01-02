import React, { useState, useEffect } from 'react';
import { getMessages, markMessageAsRead, deleteMessage } from '../../services/dashboard.service';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Inbox, Trash2, Mail, User, Clock, ArrowLeft,
    CheckCircle, Reply, MoreVertical, Search, Filter
} from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
};

const MessagesManager = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const data = await getMessages();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const handleViewMessage = async (message) => {
        setSelectedMessage(message);
        if (!message.read) {
            try {
                await markMessageAsRead(message._id);
                setMessages(prev => prev.map(m =>
                    m._id === message._id ? { ...m, read: true } : m
                ));
            } catch (error) {
                console.error('Error marking message as read:', error);
            }
        }
    };

    const handleDelete = async (id, e) => {
        e?.stopPropagation();
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await deleteMessage(id);
                setMessages(prev => prev.filter(m => m._id !== id));
                if (selectedMessage?._id === id) {
                    setSelectedMessage(null);
                }
                toast.success('Message deleted');
            } catch (error) {
                console.error('Error deleting message:', error);
                toast.error('Failed to delete message');
            }
        }
    };

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 h-[calc(100vh-140px)]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Inbox</h1>
                    <p className="text-slate-500 font-medium">
                        {messages.filter(m => !m.read).length} unread messages
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 h-full">
                {/* Message List */}
                <div className={`flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col ${selectedMessage ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10 space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search inbox..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {filteredMessages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                                <Inbox className="w-12 h-12 mb-2 opacity-50" />
                                <p>No messages found</p>
                            </div>
                        ) : (
                            <motion.ul
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="divide-y divide-gray-50"
                            >
                                {filteredMessages.map((msg) => (
                                    <motion.li
                                        key={msg._id}
                                        variants={itemVariants}
                                        onClick={() => handleViewMessage(msg)}
                                        className={`group p-4 cursor-pointer transition-all hover:bg-slate-50 relative ${selectedMessage?._id === msg._id ? 'bg-orange-50 hover:bg-orange-50' : ''
                                            } ${!msg.read ? 'bg-white' : 'bg-slate-50/50'}`}
                                    >
                                        {!msg.read && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
                                        )}

                                        <div className="flex justify-between items-start mb-1.5">
                                            <h3 className={`text-sm truncate pr-4 ${!msg.read ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>
                                                {msg.name}
                                            </h3>
                                            <span className="text-xs text-slate-400 whitespace-nowrap">
                                                {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>

                                        <p className={`text-sm mb-1 truncate ${!msg.read ? 'text-slate-800' : 'text-slate-500'}`}>
                                            {msg.subject}
                                        </p>
                                        <p className="text-xs text-slate-400 line-clamp-1">
                                            {msg.message}
                                        </p>

                                        <button
                                            onClick={(e) => handleDelete(msg._id, e)}
                                            className="absolute right-4 bottom-4 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all scale-90 hover:scale-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </div>
                </div>

                {/* Message Detail */}
                <AnimatePresence mode="wait">
                    {selectedMessage ? (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex-[2] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-white">
                                <div className="flex-1 min-w-0 pr-4">
                                    <button
                                        onClick={() => setSelectedMessage(null)}
                                        className="md:hidden mb-4 text-slate-500 hover:text-slate-800 flex items-center font-medium text-sm"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-1" />
                                        Back to Inbox
                                    </button>

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                                            {selectedMessage.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900 truncate">{selectedMessage.subject}</h2>
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <span className="font-medium text-slate-700">{selectedMessage.name}</span>
                                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                <span className="truncate">{selectedMessage.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {new Date(selectedMessage.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleDelete(selectedMessage._id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                        title="Delete Message"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
                                <div className="prose max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
                                    {selectedMessage.message}
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-100 bg-white">
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    <Reply className="w-4 h-4 mr-2" />
                                    Reply via Email
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`flex-[2] bg-slate-50/50 rounded-2xl border border-dashed border-gray-200 flex-col items-center justify-center text-slate-400 hidden md:flex`}
                        >
                            <Mail className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-lg font-medium">Select a message to read details</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MessagesManager;
