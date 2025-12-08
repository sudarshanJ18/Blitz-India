import React, { useState, useEffect } from 'react';
import contactService from '../../services/contact.service';
import { Mail, Eye, Trash2, Filter, Download, Reply } from 'lucide-react';

const ContactSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterStatus, setFilterStatus] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    useEffect(() => {
        fetchSubmissions();
    }, [page, filterStatus]);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const response = await contactService.getAllSubmissions(page, 10, filterStatus);
            console.log('API Response:', response); // Debug log
            // response.data contains the actual data object with 'data' field
            setSubmissions(response.data || []);
            setTotalPages(response.pages || 1);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await contactService.updateStatus(id, newStatus);
            setSubmissions(prev => prev.map(sub =>
                sub._id === id ? { ...sub, status: newStatus } : sub
            ));
            if (selectedSubmission && selectedSubmission._id === id) {
                setSelectedSubmission({ ...selectedSubmission, status: newStatus });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) return;

        try {
            await contactService.deleteSubmission(id);
            setSubmissions(prev => prev.filter(sub => sub._id !== id));
            if (isViewModalOpen) setIsViewModalOpen(false);
        } catch (error) {
            console.error('Error deleting submission:', error);
            alert('Failed to delete message');
        }
    };

    const openViewModal = (submission) => {
        setSelectedSubmission(submission);
        setIsViewModalOpen(true);
        // Mark as read if it's new
        if (submission.status === 'new') {
            handleStatusUpdate(submission._id, 'read');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800';
            case 'read': return 'bg-gray-100 text-gray-800';
            case 'replied': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
                    <p className="text-gray-500 mt-1">Manage inquiries from the contact form</p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                    <Filter className="w-5 h-5 text-gray-400 ml-2" />
                    <select
                        className="border-none focus:ring-0 text-sm text-gray-600 font-medium bg-transparent"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All Messages</option>
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                    </select>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                    </div>
                ) : submissions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Mail className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No messages found</h3>
                        <p className="text-gray-500 mt-1">When people contact you, their messages will appear here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sender</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {submissions.map((sub) => (
                                    <tr
                                        key={sub._id}
                                        className={`hover:bg-gray-50 transition-colors cursor-pointer ${sub.status === 'new' ? 'bg-blue-50/30' : ''}`}
                                        onClick={() => openViewModal(sub)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(sub.status)}`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-orange-700 font-bold text-xs mr-3">
                                                    {sub.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{sub.name}</div>
                                                    <div className="text-xs text-gray-500">{sub.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 font-medium">{sub.serviceCategory || 'N/A'}</div>
                                            {sub.serviceSubcategory && (
                                                <div className="text-xs text-gray-500">{sub.serviceSubcategory}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(sub.submittedAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                                                <button
                                                    onClick={() => openViewModal(sub)}
                                                    className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(sub._id)}
                                                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {isViewModalOpen && selectedSubmission && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Message Details</h2>
                                <p className="text-sm text-gray-500 mt-1">Received on {formatDate(selectedSubmission.submittedAt)}</p>
                            </div>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Sender Info */}
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg shrink-0">
                                    {selectedSubmission.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{selectedSubmission.name}</h3>
                                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-3.5 h-3.5" />
                                            <a href={`mailto:${selectedSubmission.email}`} className="hover:text-orange-600 hover:underline">
                                                {selectedSubmission.email}
                                            </a>
                                        </span>
                                        {selectedSubmission.phone && (
                                            <span className="flex items-center gap-1">
                                                <span className="font-medium">Phone:</span> {selectedSubmission.phone}
                                            </span>
                                        )}
                                        {selectedSubmission.company && (
                                            <span className="flex items-center gap-1">
                                                <span className="font-medium">Company:</span> {selectedSubmission.company}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Service Information */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Service Category
                                </label>
                                <div className="text-gray-900 font-medium mb-4">
                                    {selectedSubmission.serviceCategory || 'Not specified'}
                                </div>

                                {selectedSubmission.serviceSubcategory && (
                                    <>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Specific Service
                                        </label>
                                        <div className="text-gray-900 font-medium mb-4">
                                            {selectedSubmission.serviceSubcategory}
                                        </div>
                                    </>
                                )}

                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    Message
                                </label>
                                <div className="bg-gray-50 p-4 rounded-xl text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {selectedSubmission.message}
                                </div>
                            </div>

                            {/* Attachment */}
                            {selectedSubmission.attachment && (
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                        Attachment
                                    </label>
                                    <a
                                        href={`http://localhost:5000${selectedSubmission.attachment}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Attachment
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center rounded-b-2xl">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">Mark as:</span>
                                <select
                                    value={selectedSubmission.status}
                                    onChange={(e) => handleStatusUpdate(selectedSubmission._id, e.target.value)}
                                    className="text-sm border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="new">New</option>
                                    <option value="read">Read</option>
                                    <option value="replied">Replied</option>
                                </select>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleDelete(selectedSubmission._id)}
                                    className="px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Delete
                                </button>
                                <a
                                    href={`mailto:${selectedSubmission.email}?subject=Re: Inquiry about ${selectedSubmission.serviceCategory}${selectedSubmission.serviceSubcategory ? ' - ' + selectedSubmission.serviceSubcategory : ''}`}
                                    className="px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                                >
                                    <Reply className="w-4 h-4" />
                                    Reply via Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactSubmissions;
