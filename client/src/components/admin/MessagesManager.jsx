import React, { useState, useEffect } from 'react';
import { getMessages, markMessageAsRead, deleteMessage } from '../../services/dashboard.service';
import toast from 'react-hot-toast';
import LoadingSpinner from '../common/LoadingSpinner';

const MessagesManager = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);

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
                // Update local state to reflect read status
                setMessages(prev => prev.map(m =>
                    m._id === message._id ? { ...m, read: true } : m
                ));
            } catch (error) {
                console.error('Error marking message as read:', error);
            }
        }
    };

    const handleDelete = async (id) => {
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

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6">
            {/* Message List */}
            <div className={`flex-1 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col ${selectedMessage ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">Inbox</h2>
                    <p className="text-sm text-gray-500">{messages.length} messages</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {messages.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No messages found.</div>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {messages.map((msg) => (
                                <li
                                    key={msg._id}
                                    onClick={() => handleViewMessage(msg)}
                                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${!msg.read ? 'bg-orange-50' : ''} ${selectedMessage?._id === msg._id ? 'bg-blue-50' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`font-semibold ${!msg.read ? 'text-gray-900' : 'text-gray-700'}`}>{msg.name}</span>
                                        <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className={`text-sm mb-1 ${!msg.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{msg.subject}</p>
                                    <p className="text-xs text-gray-500 line-clamp-1">{msg.message}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Message Detail */}
            <div className={`flex-[2] bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col ${!selectedMessage ? 'hidden md:flex' : 'flex'}`}>
                {selectedMessage ? (
                    <>
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                            <div>
                                <button
                                    onClick={() => setSelectedMessage(null)}
                                    className="md:hidden mb-4 text-gray-500 hover:text-gray-700 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to Inbox
                                </button>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                    <span className="font-medium text-gray-900">{selectedMessage.name}</span>
                                    <span>&lt;{selectedMessage.email}&gt;</span>
                                    <span className="text-gray-400">|</span>
                                    <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(selectedMessage._id)}
                                className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                title="Delete Message"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-8 flex-1 overflow-y-auto">
                            <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
                                {selectedMessage.message}
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <a
                                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>Reply via Email</span>
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-lg font-medium">Select a message to read</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesManager;
