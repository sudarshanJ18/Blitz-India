const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000';

// Login and get token
async function getAuthToken() {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'jsudarshanreddy2003@gmail.com',
                password: '2003@Jalla'
            })
        });

        const data = await response.json();

        if (data.requiresMFA) {
            console.log('⚠️  MFA is required. Please provide TOTP code or disable MFA temporarily.');
            return null;
        }

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data.token;
    } catch (error) {
        console.error('Login failed:', error.message);
        return null;
    }
}

// Service Categories Data
const serviceCategories = [
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
];

// Services Data
const services = [
    // Design & Modelling (categoryId: 1)
    { categoryId: 1, subId: 1, title: "3D Modeling", category: "Design & Modelling", shortDescription: "Precise digital models for design verification and manufacturing", description: "Our 3D Modeling service delivers precise and detailed digital representations of your products or components. Using advanced CAD software, we create models suitable for design verification, simulation, and manufacturing.", features: ["Advanced CAD software utilization", "Design verification support", "Simulation-ready models", "Early visualization capabilities"], timeline: "Project-based engagement", order: 1, published: true },
    { categoryId: 1, subId: 2, title: "2D Drafting", category: "Design & Modelling", shortDescription: "Detailed engineering drawings with dimensions and tolerances", description: "Our 2D Drafting service produces detailed engineering drawings adhering to industry standards for manufacturing and documentation.", features: ["Industry standard compliance", "Complete views and dimensions", "Manufacturing-ready drawings", "Error-free production support"], timeline: "Typical turnaround 5-10 days", order: 2, published: true },
    { categoryId: 1, subId: 3, title: "Sheet Metal Design", category: "Design & Modelling", shortDescription: "Manufacturable sheet metal components", description: "Specializing in sheet metal design, we create manufacturable and optimized components, considering bends, reliefs, and material properties.", features: ["Bend and relief optimization", "Material property consideration", "High quality fabrication", "Cost-effective solutions"], order: 3, published: true },
    { categoryId: 1, subId: 4, title: "Welded Structures", category: "Design & Modelling", shortDescription: "Welded joint design and structural analysis", description: "Our welded structure design services include weld joint design, welding procedure specifications, and structural analysis.", features: ["Weld joint design", "Procedure specifications", "Structural analysis", "Code compliance assurance"], order: 4, published: true },
    { categoryId: 1, subId: 5, title: "Machining Tools & SPMs", category: "Design & Modelling", shortDescription: "Specialized machining tools and custom machines", description: "We design specialized machining tools and Special Purpose Machines (SPMs) tailored to your specific manufacturing requirements.", features: ["Custom tool design", "High-volume production support", "Precision engineering", "Efficiency optimization"], order: 5, published: true },

    // Documentation (categoryId: 2)
    { categoryId: 2, subId: 1, title: "Process Flow Diagrams (PFD)", category: "Documentation", shortDescription: "Manufacturing process flow visualization", description: "We create detailed Process Flow Diagrams that illustrate the sequence of operations, material flow, and equipment requirements.", features: ["Operation sequence mapping", "Material flow illustration", "Equipment requirement documentation", "Process optimization support"], order: 1, published: true },
    { categoryId: 2, subId: 2, title: "PFMEA & Control Plans", category: "Documentation", shortDescription: "Process failure prevention and control", description: "We develop Process Failure Mode and Effects Analysis (PFMEA) and comprehensive control plans.", features: ["Process failure prevention", "Control plan development", "Quality consistency assurance", "Manufacturing robustness"], order: 2, published: true },
    { categoryId: 2, subId: 3, title: "Work & Assembly Instructions", category: "Documentation", shortDescription: "Detailed assembly and work procedures", description: "We develop clear, detailed work instructions and assembly procedures that guide operators through complex processes.", features: ["Visual aid integration", "Safety precaution documentation", "Quality checkpoint definition", "Operator guidance"], order: 3, published: true },
    { categoryId: 2, subId: 4, title: "Inspection Documents", category: "Documentation", shortDescription: "Quality control documentation and procedures", description: "We create comprehensive inspection documents including checklists, procedures, and acceptance criteria.", features: ["Inspection checklists", "Procedure documentation", "Acceptance criteria definition", "Standards compliance"], order: 4, published: true },
    { categoryId: 2, subId: 5, title: "ASME / ISO Standards", category: "Documentation", shortDescription: "Industry standards compliance and certification", description: "We ensure your designs and processes comply with relevant ASME, ISO, and other industry standards.", features: ["ASME code compliance", "ISO standards adherence", "Pressure vessel codes", "Quality management systems"], order: 5, published: true },

    // Analysis & Validation (categoryId: 3)
    { categoryId: 3, subId: 1, title: "FEA: Static, Dynamic, Thermal", category: "Analysis & Validation", shortDescription: "Static, dynamic, and thermal simulations", description: "Our Finite Element Analysis services include static, dynamic, and thermal simulations to validate designs.", features: ["Static analysis", "Dynamic simulation", "Thermal analysis", "Real-world condition validation"], timeline: "Simulation cycles completed in 2-3 weeks", order: 1, published: true },
    { categoryId: 3, subId: 2, title: "CFD Analysis", category: "Analysis & Validation", shortDescription: "Fluid flow and heat transfer analysis", description: "We perform Computational Fluid Dynamics analysis to study fluid flow and heat transfer phenomena.", features: ["Fluid flow simulation", "Heat transfer analysis", "Performance optimization", "Critical operation validation"], timeline: "Analysis reports within 2-4 weeks", order: 2, published: true },
    { categoryId: 3, subId: 3, title: "DFMEA & Root Cause Analysis", category: "Analysis & Validation", shortDescription: "Design failure prevention and problem solving", description: "Our DFMEA service identifies potential failure modes in your designs and implements preventive measures.", features: ["Failure mode identification", "Preventive measure implementation", "Root cause analysis", "Quality issue resolution"], order: 3, published: true },

    // Manufacturing Support (categoryId: 4)
    { categoryId: 4, subId: 1, title: "Should Costing", category: "Manufacturing Support", shortDescription: "Manufacturing cost analysis and optimization", description: "Our should-costing analysis provides detailed cost breakdowns for manufactured components.", features: ["Cost breakdown analysis", "Cost driver identification", "Reduction opportunity finding", "Quality maintenance"], order: 1, published: true },
    { categoryId: 4, subId: 2, title: "Factory Layout", category: "Manufacturing Support", shortDescription: "Optimized factory workflow and layout design", description: "We design efficient factory layouts that optimize workflow, minimize material handling, and maximize productivity.", features: ["Workflow optimization", "Material handling minimization", "Productivity maximization", "Safety compliance"], order: 2, published: true },
    { categoryId: 4, subId: 3, title: "Vendor Coordination", category: "Manufacturing Support", shortDescription: "Supplier management and coordination", description: "We manage vendor relationships and coordinate supplier activities to ensure timely delivery of quality components.", features: ["Supplier evaluation", "Quality audits", "Performance monitoring", "Delivery coordination"], order: 3, published: true }
];

async function seedData() {
    console.log('🌱 Starting data seeding...\n');

    // Get auth token
    const token = await getAuthToken();
    if (!token) {
        console.log('\n❌ Failed to authenticate. Exiting...');
        process.exit(1);
    }

    console.log('✅ Authenticated successfully\n');

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    // Seed Service Categories
    console.log('📁 Creating service categories...');
    let createdCategories = 0;
    for (const category of serviceCategories) {
        try {
            const response = await fetch(`${API_URL}/api/admin/services/categories`, {
                method: 'POST',
                headers,
                body: JSON.stringify(category)
            });

            if (response.ok) {
                console.log(`  ✓ Created: ${category.title}`);
                createdCategories++;
            } else {
                const error = await response.json();
                console.log(`  ⚠ ${category.title}: ${error.message || 'Already exists'}`);
            }
        } catch (error) {
            console.log(`  ✗ Failed: ${category.title} - ${error.message}`);
        }
    }
    console.log(`\n✅ Categories: ${createdCategories}/${serviceCategories.length} created\n`);

    // Seed Services
    console.log('🔧 Creating services...');
    let createdServices = 0;
    for (const service of services) {
        try {
            const response = await fetch(`${API_URL}/api/admin/services`, {
                method: 'POST',
                headers,
                body: JSON.stringify(service)
            });

            if (response.ok) {
                console.log(`  ✓ ${service.categoryId}.${service.subId} ${service.title}`);
                createdServices++;
            } else {
                const error = await response.json();
                console.log(`  ⚠ ${service.categoryId}.${service.subId} ${service.title}: ${error.message || 'Already exists'}`);
            }
        } catch (error) {
            console.log(`  ✗ Failed: ${service.title} - ${error.message}`);
        }
    }
    console.log(`\n✅ Services: ${createdServices}/${services.length} created\n`);

    console.log('🎉 Data seeding completed!\n');
    console.log('Next steps:');
    console.log('1. Visit http://localhost:5173/services to see the services');
    console.log('2. Login to admin panel to manage content');
    console.log('3. All changes in admin will reflect immediately on the site\n');
}

seedData().catch(error => {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
});
