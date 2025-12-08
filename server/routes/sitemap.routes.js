const { Router } = require('express');
const xml = require('xml');
const Blog = require('../models/Blog');
const Project = require('../models/Project');

const router = Router();

/**
 * Generate sitemap.xml
 * GET /sitemap.xml
 */
router.get('/sitemap.xml', async (req, res) => {
    try {
        const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';

        // Static pages
        const staticPages = [
            { url: '', changefreq: 'daily', priority: 1.0 },
            { url: '/about', changefreq: 'monthly', priority: 0.8 },
            { url: '/services', changefreq: 'weekly', priority: 0.9 },
            { url: '/portfolio', changefreq: 'weekly', priority: 0.9 },
            { url: '/blog', changefreq: 'daily', priority: 0.9 },
            { url: '/contact', changefreq: 'monthly', priority: 0.8 },
            { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
            { url: '/terms-of-service', changefreq: 'yearly', priority: 0.3 },
        ];

        // Fetch published blogs
        const blogs = await Blog.find({ published: true }).select('slug publishedDate').sort({ publishedDate: -1 });

        // Fetch published projects
        const projects = await Project.find({ published: true }).select('slug date').sort({ date: -1 });

        // Build sitemap URLs
        const urlset = [
            {
                _attr: {
                    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
                    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                    'xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'
                }
            }
        ];

        // Add static pages
        staticPages.forEach(page => {
            urlset.push({
                url: [
                    { loc: `${baseUrl}${page.url}` },
                    { changefreq: page.changefreq },
                    { priority: page.priority },
                    { lastmod: new Date().toISOString().split('T')[0] }
                ]
            });
        });

        // Add blog posts
        blogs.forEach(blog => {
            urlset.push({
                url: [
                    { loc: `${baseUrl}/blog/${blog.slug}` },
                    { changefreq: 'monthly' },
                    { priority: 0.7 },
                    { lastmod: blog.publishedDate ? new Date(blog.publishedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0] }
                ]
            });
        });

        // Add projects
        projects.forEach(project => {
            urlset.push({
                url: [
                    { loc: `${baseUrl}/portfolio/${project.slug}` },
                    { changefreq: 'monthly' },
                    { priority: 0.7 },
                    { lastmod: project.date ? new Date(project.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0] }
                ]
            });
        });

        const sitemap = xml({ urlset }, { declaration: true });

        res.header('Content-Type', 'application/xml');
        res.send(sitemap);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('Error generating sitemap');
    }
});

module.exports = router;
