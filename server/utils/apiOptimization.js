/**
 * API Optimization Guide
 * 
 * This file documents best practices for optimizing API endpoints
 * to improve performance and reduce server load.
 */

// ============================================
// 1. PAGINATION
// ============================================
// Always implement pagination for list endpoints

/*
Example:
const getAllItems = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const items = await Model.find()
            .limit(limit)
            .skip(skip)
            .select('field1 field2 field3'); // Only select needed fields

        const total = await Model.countDocuments();

        res.json({
            success: true,
            data: items,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};
*/

// ============================================
// 2. FIELD SELECTION
// ============================================
// Use .select() to limit fields returned

/*
Example:
// Bad - Returns all fields including large ones
const blogs = await Blog.find();

// Good - Returns only needed fields
const blogs = await Blog.find()
    .select('title summary slug author publishedDate image');
*/

// ============================================
// 3. INDEXES
// ============================================
// Add indexes to frequently queried fields in models

/*
Example in model file:
blogSchema.index({ slug: 1 });
blogSchema.index({ published: 1, publishedDate: -1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });
*/

// ============================================
// 4. LEAN QUERIES
// ============================================
// Use .lean() for read-only operations

/*
Example:
// Returns plain JavaScript objects (faster)
const blogs = await Blog.find().lean();
*/

// ============================================
// 5. POPULATE SELECTIVELY
// ============================================
// When using populate, select only needed fields

/*
Example:
const items = await Model.find()
    .populate('author', 'name email image') // Only select specific fields
    .lean();
*/

// ============================================
// 6. CACHING
// ============================================
// Implement Redis caching for frequently accessed data

/*
See: server/middleware/cache.js for implementation
Apply to routes that don't change frequently:

router.get('/', cacheMiddleware(900), getAllBlogs); // Cache for 15 minutes
*/

// ============================================
// 7. AVOID N+1 QUERIES
// ============================================
// Use aggregation or populate instead of multiple queries

/*
Bad:
const projects = await Project.find();
for (let project of projects) {
    project.author = await User.findById(project.authorId);
}

Good:
const projects = await Project.find().populate('author');
*/

// ============================================
// 8. DATABASE AGGREGATION
// ============================================
// Use aggregation for complex queries

/*
Example:
const stats = await Blog.aggregate([
    { $match: { published: true } },
    { $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgViews: { $avg: '$views' }
    }},
    { $sort: { count: -1 } }
]);
*/

module.exports = {
    // Export any utility functions here
};
