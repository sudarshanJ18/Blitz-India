export const blogPosts = [
  {
    id: 1,
    title: 'Design for Manufacturability: Best Practices',
    slug: 'design-for-manufacturability-best-practices',
    excerpt:
      'Learn how to design products that are easier to manufacture, reduce costs, and improve yield with practical DFM tips.',
    date: '2025-10-05',
    readTime: '6 min read',
    category: { name: 'Manufacturing', slug: 'manufacturing' },
    imageUrl:
      'https://images.unsplash.com/photo-1564760290292-23341e4df6ec?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'John Carter',
      role: 'Manufacturing Strategist',
      slug: 'john-carter',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    featured: true,
  },
  {
    id: 2,
    title: 'Finite Element Analysis (FEA) Basics',
    slug: 'finite-element-analysis-basics',
    excerpt:
      'A gentle introduction to FEA, mesh quality, boundary conditions, and interpreting results for mechanical designs.',
    date: '2025-09-18',
    readTime: '8 min read',
    category: { name: 'Simulation', slug: 'simulation' },
    imageUrl:
      'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Sarah Chen',
      role: 'Lead Simulation Engineer',
      slug: 'sarah-chen',
      avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    featured: true,
  },
  {
    id: 3,
    title: 'Advanced FEA Techniques for Structural Optimization',
    slug: 'advanced-fea-techniques-for-structural-optimization',
    excerpt:
      'Discover how topology optimization, nonlinear analysis, and multi-physics simulations are pushing structural design.',
    date: '2025-08-22',
    readTime: '9 min read',
    category: { name: 'FEA Analysis', slug: 'fea-analysis' },
    imageUrl:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Marcus Rodriguez',
      role: 'FEA Specialist',
      slug: 'marcus-rodriguez',
      avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    featured: true,
  },
  {
    id: 4,
    title: 'Sustainable Engineering: Green Manufacturing Practices',
    slug: 'sustainable-engineering-green-manufacturing-practices',
    excerpt:
      'Explore innovative approaches to sustainable manufacturing and how engineering companies reduce their footprint.',
    date: '2025-08-01',
    readTime: '7 min read',
    category: { name: 'Sustainability', slug: 'sustainability' },
    imageUrl:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Sarah Chen',
      role: 'Sustainability Lead',
      slug: 'sarah-chen',
      avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    featured: false,
  },
  {
    id: 5,
    title: 'CFD Analysis in Automotive Aerodynamics',
    slug: 'cfd-analysis-in-automotive-aerodynamics',
    excerpt:
      'How computational fluid dynamics is revolutionizing vehicle design and improving fuel efficiency.',
    date: '2025-07-14',
    readTime: '5 min read',
    category: { name: 'CFD Analysis', slug: 'cfd-analysis' },
    imageUrl:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Maria Rodriguez',
      role: 'CFD Engineer',
      slug: 'maria-rodriguez',
      avatarUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
    },
    featured: false,
  },
  {
    id: 6,
    title: 'Prototype Development Best Practices',
    slug: 'prototype-development-best-practices',
    excerpt:
      'Essential strategies and considerations for successful prototype development in engineering projects.',
    date: '2025-06-29',
    readTime: '6 min read',
    category: { name: 'Prototype Development', slug: 'prototype-development' },
    imageUrl:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Alex Thompson',
      role: 'Product Development Lead',
      slug: 'alex-thompson',
      avatarUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
    featured: false,
  },
  {
    id: 7,
    title: 'Reverse Engineering: From Physical Part to Digital Twin',
    slug: 'reverse-engineering-from-physical-part-to-digital-twin',
    excerpt:
      'Explore the process of reverse engineering and how it enables the creation of digital twins for legacy parts.',
    date: '2025-06-10',
    readTime: '7 min read',
    category: { name: 'Reverse Engineering', slug: 'reverse-engineering' },
    imageUrl:
      'https://images.unsplash.com/photo-1600880292210-85938a039959?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'David Lee',
      role: 'Reverse Engineering Lead',
      slug: 'david-lee',
      avatarUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
    },
    featured: false,
  },
  {
    id: 8,
    title: '2D Drafting in the Modern Engineering Workflow',
    slug: '2d-drafting-in-the-modern-engineering-workflow',
    excerpt:
      'The evolving role of 2D drafting and how it integrates with modern 3D modeling and BIM workflows.',
    date: '2025-05-27',
    readTime: '4 min read',
    category: { name: '2D Drafting', slug: '2d-drafting' },
    imageUrl:
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Lisa Wang',
      role: 'Design Engineer',
      slug: 'lisa-wang',
      avatarUrl: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    featured: false,
  },
];

export const getFeaturedPosts = (limit = 3) =>
  blogPosts
    .filter((post) => post.featured)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

export const getCategories = () => {
  const unique = new Map();
  blogPosts.forEach((post) => {
    if (!unique.has(post.category.slug)) {
      unique.set(post.category.slug, post.category.name);
    }
  });
  return ['all', ...Array.from(unique.values())];
};

