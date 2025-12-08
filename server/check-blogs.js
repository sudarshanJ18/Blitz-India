require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const checkBlogs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');

        // Get ALL blogs (including unpublished)
        const allBlogs = await Blog.find({});
        console.log(`\nTotal blogs in database: ${allBlogs.length}`);

        if (allBlogs.length > 0) {
            console.log('\nAll blogs:');
            allBlogs.forEach((blog, index) => {
                console.log(`${index + 1}. "${blog.title}"`);
                console.log(`   - Published: ${blog.published}`);
                console.log(`   - Featured: ${blog.featured}`);
                console.log(`   - Slug: ${blog.slug}`);
                console.log(`   - Category: ${blog.category}`);
                console.log('');
            });

            const publishedBlogs = allBlogs.filter(b => b.published);
            console.log(`\nPublished blogs: ${publishedBlogs.length}`);
            console.log(`Unpublished blogs: ${allBlogs.length - publishedBlogs.length}`);
        } else {
            console.log('\n⚠️  No blogs found in database!');
            console.log('Please create blogs in the admin panel first.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkBlogs();
