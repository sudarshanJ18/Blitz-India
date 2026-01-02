const Service = require('../../models/Service');
const ServiceCategory = require('../../models/ServiceCategory');
const Project = require('../../models/Project');
const Blog = require('../../models/Blog');
const ContactSubmission = require('../../models/ContactSubmission');
const Testimonial = require('../../models/Testimonial');

/**
 * Get dashboard statistics
 * GET /api/admin/dashboard/stats
 */
const getDashboardStats = async (req, res, next) => {
    try {
        // Get counts
        const [
            totalServices,
            publishedServices,
            serviceCategories,
            totalProjects,
            publishedProjects,
            totalBlogs,
            publishedBlogs,
            newSubmissions,
            totalSubmissions,
            totalTestimonials,
            publishedTestimonials
        ] = await Promise.all([
            Service.countDocuments(),
            Service.countDocuments({ published: true }),
            ServiceCategory.countDocuments({ published: true }),
            Project.countDocuments(),
            Project.countDocuments({ published: true }),
            Blog.countDocuments(),
            Blog.countDocuments({ published: true }),
            ContactSubmission.countDocuments({ status: 'new' }),
            ContactSubmission.countDocuments(),
            Testimonial.countDocuments(),
            Testimonial.countDocuments({ published: true })
        ]);

        // Get recent activity
        const recentSubmissions = await ContactSubmission.find()
            .sort({ submittedAt: -1 })
            .limit(5)
            .select('name email service status submittedAt');

        const recentBlogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title published createdAt');

        res.json({
            success: true,
            data: {
                counts: {
                    services: {
                        total: totalServices,
                        published: publishedServices,
                        categories: serviceCategories
                    },
                    projects: {
                        total: totalProjects,
                        published: publishedProjects
                    },
                    blogs: {
                        total: totalBlogs,
                        published: publishedBlogs
                    },
                    testimonials: {
                        total: totalTestimonials,
                        published: publishedTestimonials
                    },
                    submissions: {
                        total: totalSubmissions,
                        new: newSubmissions
                    }
                },
                recentActivity: {
                    submissions: recentSubmissions,
                    blogs: recentBlogs
                },
                serverTime: new Date()
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardStats
};
