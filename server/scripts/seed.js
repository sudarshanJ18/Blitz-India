require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../utils/logger');

// Import models
const Service = require('../models/Service');
const ServiceCategory = require('../models/ServiceCategory');
const Project = require('../models/Project');
const HomeContent = require('../models/HomeContent');
const AboutContent = require('../models/AboutContent');
const SiteSettings = require('../models/SiteSettings');
const LegalContent = require('../models/LegalContent');
const Admin = require('../models/Admin');

// Import data from frontend assets (you'll need to copy the data here)
const seedData = {
    serviceCategories: [
        {
            categoryId: 1,
            title: "Design & Modelling",
            description: "Comprehensive design and modeling services for product development",
            order: 1,
            published: true
        },
        {
            categoryId: 2,
            title: "Documentation",
            description: "Comprehensive documentation services for manufacturing and quality control",
            order: 2,
            published: true
        },
        {
            categoryId: 3,
            title: "Analysis & Validation",
            description: "Advanced analysis and validation services for design optimization",
            order: 3,
            published: true
        },
        {
            categoryId: 4,
            title: "Manufacturing Support",
            description: "Comprehensive manufacturing support services for production optimization",
            order: 4,
            published: true
        }
    ],

    services: [
        // Design & Modelling
        { categoryId: 1, subId: 1, title: "3D Modeling", category: "Design & Modelling", shortDescription: "Precise digital models for design verification and manufacturing", description: "Our 3D Modeling service delivers precise and detailed digital representations of your products or components. Using advanced CAD software, we create models suitable for design verification, simulation, and manufacturing. This service helps reduce design errors and accelerates product development cycles by enabling early visualization and testing.", features: ["Advanced CAD software utilization", "Design verification support", "Simulation-ready models", "Early visualization capabilities"], timeline: "Project-based engagement", order: 1, published: true },
        { categoryId: 1, subId: 2, title: "2D Drafting", category: "Design & Modelling", shortDescription: "Detailed engineering drawings with dimensions and tolerances", description: "Our 2D Drafting service produces detailed engineering drawings adhering to industry standards for manufacturing and documentation. It includes all necessary views, dimensions, and tolerances to ensure error-free production.", features: ["Industry standard compliance", "Complete views and dimensions", "Manufacturing-ready drawings", "Error-free production support"], timeline: "Typical turnaround 5-10 days", order: 2, published: true },
        { categoryId: 1, subId: 3, title: "Sheet Metal Design", category: "Design & Modelling", shortDescription: "Manufacturable sheet metal components", description: "Specializing in sheet metal design, we create manufacturable and optimized components, considering bends, reliefs, and material properties to ensure high quality and cost-effective fabrication.", features: ["Bend and relief optimization", "Material property consideration", "High quality fabrication", "Cost-effective solutions"], order: 3, published: true },
        { categoryId: 1, subId: 4, title: "Welded Structures", category: "Design & Modelling", shortDescription: "Welded joint design and structural analysis", description: "Our welded structure design services include weld joint design, welding procedure specifications, and structural analysis to ensure strong, durable, and code-compliant welded assemblies.", features: ["Weld joint design", "Procedure specifications", "Structural analysis", "Code compliance assurance"], order: 4, published: true },
        { categoryId: 1, subId: 5, title: "Machining Tools & SPMs", category: "Design & Modelling", shortDescription: "Specialized machining tools and custom machines", description: "We design specialized machining tools and Special Purpose Machines (SPMs) tailored to your specific manufacturing requirements. Our designs focus on precision, efficiency, and reliability for high-volume production.", features: ["Custom tool design", "High-volume production support", "Precision engineering", "Efficiency optimization"], order: 5, published: true },

        // Documentation
        { categoryId: 2, subId: 1, title: "Process Flow Diagrams (PFD)", category: "Documentation", shortDescription: "Manufacturing process flow visualization", description: "We create detailed Process Flow Diagrams that illustrate the sequence of operations, material flow, and equipment requirements for your manufacturing processes. These diagrams are essential for process optimization and operator training.", features: ["Operation sequence mapping", "Material flow illustration", "Equipment requirement documentation", "Process optimization support"], order: 1, published: true },
        { categoryId: 2, subId: 2, title: "PFMEA & Control Plans", category: "Documentation", shortDescription: "Process failure prevention and control", description: "We develop Process Failure Mode and Effects Analysis (PFMEA) and comprehensive control plans to ensure manufacturing processes are robust and capable of producing high-quality products consistently.", features: ["Process failure prevention", "Control plan development", "Quality consistency assurance", "Manufacturing robustness"], order: 2, published: true },
        { categoryId: 2, subId: 3, title: "Work & Assembly Instructions", category: "Documentation", shortDescription: "Detailed assembly and work procedures", description: "We develop clear, detailed work instructions and assembly procedures that guide operators through complex manufacturing and assembly processes. Our instructions include visual aids, safety precautions, and quality checkpoints.", features: ["Visual aid integration", "Safety precaution documentation", "Quality checkpoint definition", "Operator guidance"], order: 3, published: true },
        { categoryId: 2, subId: 4, title: "Inspection Documents", category: "Documentation", shortDescription: "Quality control documentation and procedures", description: "We create comprehensive inspection documents including checklists, procedures, and acceptance criteria to ensure quality control throughout the manufacturing process. Our documents comply with industry standards and regulatory requirements.", features: ["Inspection checklists", "Procedure documentation", "Acceptance criteria definition", "Standards compliance"], order: 4, published: true },
        { categoryId: 2, subId: 5, title: "ASME / ISO Standards", category: "Documentation", shortDescription: "Industry standards compliance and certification", description: "We ensure your designs and processes comply with relevant ASME, ISO, and other industry standards. Our expertise includes pressure vessel codes, welding standards, and quality management systems.", features: ["ASME code compliance", "ISO standards adherence", "Pressure vessel codes", "Quality management systems"], order: 5, published: true },

        // Analysis & Validation
        { categoryId: 3, subId: 1, title: "FEA: Static, Dynamic, Thermal", category: "Analysis & Validation", shortDescription: "Static, dynamic, and thermal simulations", description: "Our Finite Element Analysis services include static, dynamic, and thermal simulations to validate designs under real-world conditions and improve product performance.", features: ["Static analysis", "Dynamic simulation", "Thermal analysis", "Real-world condition validation"], timeline: "Simulation cycles completed in 2-3 weeks", order: 1, published: true },
        { categoryId: 3, subId: 2, title: "CFD Analysis", category: "Analysis & Validation", shortDescription: "Fluid flow and heat transfer analysis", description: "We perform Computational Fluid Dynamics analysis to study fluid flow and heat transfer phenomena critical to your product's operation.", features: ["Fluid flow simulation", "Heat transfer analysis", "Performance optimization", "Critical operation validation"], timeline: "Analysis reports within 2-4 weeks", order: 2, published: true },
        { categoryId: 3, subId: 3, title: "DFMEA & Root Cause Analysis", category: "Analysis & Validation", shortDescription: "Design failure prevention and problem solving", description: "Our Design Failure Mode and Effects Analysis (DFMEA) service identifies potential failure modes in your designs and implements preventive measures. We also perform root cause analysis to solve existing quality issues.", features: ["Failure mode identification", "Preventive measure implementation", "Root cause analysis", "Quality issue resolution"], order: 3, published: true },

        // Manufacturing Support
        { categoryId: 4, subId: 1, title: "Should Costing", category: "Manufacturing Support", shortDescription: "Manufacturing cost analysis and optimization", description: "Our should-costing analysis provides detailed cost breakdowns for manufactured components, helping you understand cost drivers and identify opportunities for cost reduction without compromising quality.", features: ["Cost breakdown analysis", "Cost driver identification", "Reduction opportunity finding", "Quality maintenance"], order: 1, published: true },
        { categoryId: 4, subId: 2, title: "Factory Layout", category: "Manufacturing Support", shortDescription: "Optimized factory workflow and layout design", description: "We design efficient factory layouts that optimize workflow, minimize material handling, and maximize productivity. Our layouts consider equipment placement, material flow, safety requirements, and future expansion needs.", features: ["Workflow optimization", "Material handling minimization", "Productivity maximization", "Safety compliance"], order: 2, published: true },
        { categoryId: 4, subId: 3, title: "Vendor Coordination", category: "Manufacturing Support", shortDescription: "Supplier management and coordination", description: "We manage vendor relationships and coordinate supplier activities to ensure timely delivery of quality components. Our services include supplier evaluation, quality audits, and performance monitoring.", features: ["Supplier evaluation", "Quality audits", "Performance monitoring", "Delivery coordination"], order: 3, published: true }
    ],

    projects: [
        {
            title: "Manufacturing Plant Layout Optimization",
            category: "Factory Layout",
            shortDescription: "30% improvement in material flow efficiency",
            description: "Complete factory layout redesign resulting in 30% improvement in material flow and 25% reduction in production time. The project included equipment placement optimization, workflow analysis, and safety compliance verification.",
            client: "Automotive Manufacturer",
            date: new Date("2024-03-15"),
            duration: "6 months",
            results: ["30% material flow improvement", "25% production time reduction", "Enhanced safety compliance", "Future expansion planning"],
            featured: true,
            published: true,
            order: 1
        },
        {
            title: "Custom Machining Tools & SPMs",
            category: "Machining",
            shortDescription: "40% production capacity increase with custom tools",
            description: "Design and development of specialized machining tools and Special Purpose Machines for high-precision automotive component manufacturing. The solution increased production capacity by 40% while maintaining tight tolerances.",
            client: "Tier 1 Automotive Supplier",
            date: new Date("2024-02-20"),
            duration: "8 months",
            results: ["40% production capacity increase", "Tight tolerance maintenance", "Reduced setup time by 60%", "Improved surface finish quality"],
            featured: true,
            published: true,
            order: 2
        },
        {
            title: "Process Flow Optimization",
            category: "Process Design",
            shortDescription: "35% improvement in overall equipment effectiveness",
            description: "Development of comprehensive Process Flow Diagrams for a complex manufacturing process involving multiple workstations and quality checkpoints. The project streamlined operations and improved overall equipment effectiveness by 35%.",
            client: "Industrial Equipment Manufacturer",
            date: new Date("2024-01-10"),
            duration: "4 months",
            results: ["35% OEE improvement", "Streamlined operations", "Enhanced quality control", "Reduced waste by 20%"],
            published: true,
            order: 3
        },
        {
            title: "DFMEA Implementation for New Product",
            category: "Quality Analysis",
            shortDescription: "Zero field failures during product launch",
            description: "Comprehensive Design Failure Mode and Effects Analysis for a new automotive component, identifying 50+ potential failure modes and implementing preventive measures. The project resulted in zero field failures during launch.",
            client: "Automotive OEM",
            date: new Date("2023-12-05"),
            duration: "3 months",
            results: ["50+ failure modes identified", "Zero field failures at launch", "Reduced warranty claims by 80%", "Accelerated product approval"],
            published: true,
            order: 4
        },
        {
            title: "Sheet Metal Design Optimization",
            category: "Sheet Metal Design",
            shortDescription: "25% cost savings with improved durability",
            description: "Complete redesign of sheet metal components for a consumer electronics product, focusing on manufacturability, cost reduction, and aesthetic appeal. The project achieved 25% cost savings while improving product durability.",
            client: "Consumer Electronics Manufacturer",
            date: new Date("2023-11-15"),
            duration: "5 months",
            results: ["25% manufacturing cost reduction", "Improved product durability", "Enhanced aesthetic appeal", "Simplified assembly process"],
            published: true,
            order: 5
        }
    ],

    homeContent: {
        hero: {
            title: "Engineering Excellence for Global Industries",
            subtitle: "Comprehensive Design, FEA, and Documentation Services",
            description: "We deliver precision engineering solutions that drive innovation and efficiency across automotive, aerospace, and industrial sectors worldwide.",
            ctaButton: "Explore Our Services"
        },
        stats: [
            { label: "Projects Completed", value: "500+", icon: "📊" },
            { label: "Years of Experience", value: "15+", icon: "⚡" },
            { label: "Global Clients", value: "100+", icon: "🌍" },
            { label: "Success Rate", value: "98%", icon: "✅" }
        ]
    },

    aboutContent: {
        hero: {
            title: "About Blitz India Engineering",
            subtitle: "Driving Innovation Through Engineering Excellence"
        },
        story: {
            title: "Our Story",
            content: "Blitz India Engineering was founded in 2015 with a vision to provide world-class engineering services to global industries. With over 15 years of combined experience, our team specializes in mechanical design, FEA analysis, and comprehensive documentation services."
        },
        values: [
            { title: "Excellence", description: "We strive for perfection in every project we undertake", icon: "⭐" },
            { title: "Innovation", description: "Leading the way with cutting-edge engineering solutions", icon: "💡" },
            { title: "Collaboration", description: "Working closely with clients to ensure project success", icon: "🤝" },
            { title: "Integrity", description: "Building trust through transparency and accountability", icon: "🛡️" },
            { title: "Customer Focus", description: "Your success is our primary objective", icon: "🎯" }
        ],
        stats: [
            { label: "Years of Experience", value: "15+", description: "Industry expertise" },
            { label: "Team Members", value: "50+", description: "Expert engineers" },
            { label: "Projects Completed", value: "500+", description: "Successful deliveries" },
            { label: "Client Satisfaction", value: "98%", description: "Happy clients" }
        ],
        leadership: [
            {
                name: "Omkar Kale",
                role: "CEO",
                bio: "Leading innovation through design excellence and a decade of engineering wisdom.",
                experience: "10+ years",
                education: "Mechanical Engineering",
                order: 1
            },
            {
                name: "Sumeet Patil",
                role: "CTO",
                bio: "Transforming complex engineering challenges into scalable technological solutions.",
                experience: "15+ years",
                education: "MTech in Machine Design",
                order: 2
            },
            {
                name: "Dr. Tushar Bhoite",
                role: "Tech. Advisor",
                bio: "Guiding engineering innovation with deep research, precision, and vision.",
                experience: "15+ years",
                education: "PhD in Advance MFG",
                order: 3
            }
        ]
    },

    siteSettings: {
        companyName: "Blitz India Engineering",
        tagline: "Engineering Excellence for Global Industries",
        description: "Comprehensive design, FEA, and documentation services",
        email: "info@blitzindiaengineering.com",
        phone: "+91-91585-75785",
        address: {
            city: "Pune",
            state: "Maharashtra",
            country: "India"
        }
    },

    legalContent: [
        {
            type: "privacy",
            content: "# Privacy Policy\n\nLast updated: November 2024\n\nBlitz India Engineering is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.\n\n## Information We Collect\n\nWe collect information that you provide directly to us, such as:\n- Contact Information (name, email, phone number, company)\n- Service inquiries and project details\n- Communication preferences\n\n## How We Use Your Information\n\nWe use the information we collect to:\n- Respond to your inquiries and provide our services\n- Communicate with you about projects and updates\n- Improve and optimize our services\n- Comply with legal obligations\n\n## Data Security\n\nWe implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and accidental loss, destruction, or damage.\n\n## Contact Us\n\nIf you have any questions about this Privacy Policy, please contact us at info@blitzindiaengineering.com",
            version: "1.0"
        },
        {
            type: "terms",
            content: "# Terms of Service\n\nLast updated: November 2024\n\n## Agreement to Terms\n\nBy accessing or using Blitz India Engineering services, you agree to be bound by these Terms of Service.\n\n## Services\n\nBlitz India Engineering provides mechanical engineering services including design, analysis, documentation, and manufacturing support. Specific terms for each project are detailed in individual contracts or agreements.\n\n## Intellectual Property\n\nAll intellectual property rights in our services and deliverables, unless otherwise agreed in writing, remain with Blitz India Engineering or are licensed to you for specific use.\n\n## Limitation of Liability\n\nBlitz India Engineering shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.\n\n## Governing Law\n\nThese Terms shall be governed by and construed in accordance with the laws of India.\n\n## Contact\n\nFor questions about these Terms, please contact us at info@blitzindiaengineering.com",
            version: "1.0"
        }
    ]
};

/**
 * Seed the database
 */
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('MongoDB connected for seeding');

        // Clear existing data by dropping collections to reset indexes
        // Clear existing data by dropping collections to reset indexes
        logger.info('Dropping existing collections...');

        // Get list of all collections in the database
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        logger.info(`Found collections: ${collectionNames.join(', ')}`);

        const targetCollections = [
            'services',
            'servicecategories',
            'projects',
            'homecontents',
            'aboutcontents',
            'sitesettings',
            'legalcontents'
        ];

        for (const name of targetCollections) {
            if (collectionNames.includes(name)) {
                try {
                    await mongoose.connection.db.dropCollection(name);
                    logger.info(`Dropped collection: ${name}`);
                } catch (error) {
                    logger.warn(`Failed to drop ${name}: ${error.message}`);
                }
            }
        }
        logger.info('Existing collections dropped');

        // Wait for indexes to be fully cleared
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Seed Service Categories
        logger.info('Seeding service categories...');
        await ServiceCategory.insertMany(seedData.serviceCategories);
        logger.info(`✓ ${seedData.serviceCategories.length} service categories created`);

        // Seed Services
        logger.info('Seeding services...');
        await Service.insertMany(seedData.services);
        logger.info(`✓ ${seedData.services.length} services created`);

        // Seed Projects
        logger.info('Seeding projects...');
        await Project.insertMany(seedData.projects);
        logger.info(`✓ ${seedData.projects.length} projects created`);

        // Seed Home Content
        logger.info('Seeding home content...');
        await HomeContent.create(seedData.homeContent);
        logger.info('✓ Home content created');

        // Seed About Content
        logger.info('Seeding about content...');
        await AboutContent.create(seedData.aboutContent);
        logger.info('✓ About content created');

        // Seed Site Settings
        logger.info('Seeding site settings...');
        await SiteSettings.create(seedData.siteSettings);
        logger.info('✓ Site settings created');

        // Seed Legal Content
        logger.info('Seeding legal content...');
        await LegalContent.insertMany(seedData.legalContent);
        logger.info('✓ Legal content created');

        // Check if admin exists, if not create one
        const adminExists = await Admin.countDocuments();
        if (adminExists === 0) {
            logger.info('No admin user found. Please create one using: npm run create-admin');
        } else {
            logger.info(`✓ ${adminExists} admin user(s) already exist`);
        }

        logger.info('\n🎉 Database seeding completed successfully!');
        logger.info('\nNext steps:');
        logger.info('1. Create an admin user: npm run create-admin');
        logger.info('2. Start the server: npm start');
        logger.info('3. Login to admin panel and setup TOTP MFA\n');

        process.exit(0);
    } catch (error) {
        console.error('ERROR MESSAGE:', error.message);
        console.error('ERROR STACK:', error.stack);
        logger.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Run seeder
seedDatabase();
