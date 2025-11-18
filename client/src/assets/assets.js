import logo from "./logo.png";
import teamImg from "./team.jpg";
import project1Img from "./project1.png";
import project2Img from "./project2.png";
import project3Img from "./project3.png";
import drafting2dImg from "./2d-drafting.jpg";
import modeling3dImg from "./3d-modeling.jpg";
import cfdAnalysisImg from "./cfd-analysis.jpg";
import feaImg from "./FEA.gif";
import sheetMetalImg from "./sheet-metal-design.jpg";
import factoryLayoutImg from "./factory-layout.jpg";
import processFlowImg from "./process-flow-diagrams-(pfd).jpg";
import dfmeaImg from "./dfmeara.jpg";
import pfmeaImg from "./pfmea-&-control-plans.jpg";
import inspectionDocsImg from "./inspection-documents.jpg";
import weldingImg from "./welded-structures.jpg";
import assemblyInstructionsImg from "./work-and-assembly-instructions.jpg";
import shouldCostingImg from "./should-costing.jpg";
import vendorCoordinationImg from "./vendor-coordination.jpg";
import isoStandardsImg from "./iso.jpg";
import designExamplesImg from "./design_examples.png";
import machiningToolsImg from "./machining-tools-&-spms.jpg";
import excellenceImg from "./excellence.png";
import innovationImg from "./innovation.png";
import collaborationImg from "./collaboration.png";
import integrityImg from "./integrity.png";
import customerFocusImg from "./customer.png";
import bielogo from "./bielogo.png";
import about1 from "./about1.png";
import about2 from "./about2.png";
import about3 from "./about3.png";
import designmodelling from "./desingmodelling.png";
import documentation from "./documentation.png";
import analysis from "./analysis.png";
import manufacturing from "./manufacturing.png";
import team1 from "./team1.jpeg";
import team2 from "./team2.jpeg";
import team3 from "./team3.jpeg";
import design from "./design.mp4";
import doc from "./doc.mp4";
import analysisvd from "./analysisvd.mp4";
import manufact from "./manufact.mp4";
import servicedesign from "./servicedesign.png";
import servicedoc from "./servicedoc.png";
import serviceanal from "./serviceanal.png";
import serviceman from "./serviceman.png";
import docpng from "./docpng.png";
import analpng from "./anapng.png";
import manupng from "./manupng.png";
import aboutheroImg from "./abouthero.jpg";

export const abouthero = {
  abouthero: aboutheroImg,
}
export const categoryImages = {
  docpng,
  analpng,
  manupng
}

export const serviceimgs = {
  servicedesign,
  servicedoc,
  serviceanal,
  serviceman,
}



export const videos = {
  design,
  doc,
  analysisvd,
  manufact
};

export const team = {
  team1,
  team2,
  team3
}


export const values = {
  excellenceImg,
  innovationImg,
  collaborationImg,
  integrityImg,
  customerFocusImg,
  bielogo,
  about1,
  about2,
  about3,

};

export const serviceImg = {
  designmodelling: designmodelling,
  documentation: documentation,
  analysis: analysis,
  manufacturing: manufacturing
};

// Service Categories Structure
export const serviceCategories = [
  {
    id: 1,
    title: "Design & Modelling",
    description: "Comprehensive design and modeling services for product development",
    services: [
      {
        id: 1,
        categoryId: 1,
        subId: 1,
        title: "3D Modeling",
        description:
          "Our 3D Modeling service delivers precise and detailed digital representations of your products or components. Using advanced CAD software, we create models suitable for design verification, simulation, and manufacturing. This service helps reduce design errors and accelerates product development cycles by enabling early visualization and testing.",
        shortDescription: "Precise digital models for design verification and manufacturing",
        image: modeling3dImg,
        features: [
          "Advanced CAD software utilization",
          "Design verification support",
          "Simulation-ready models",
          "Early visualization capabilities",
        ],
        timeline: "Project-based engagement",
      },
      {
        id: 2,
        categoryId: 1,
        subId: 2,
        title: "2D Drafting",
        description:
          "Our 2D Drafting service produces detailed engineering drawings adhering to industry standards for manufacturing and documentation. It includes all necessary views, dimensions, and tolerances to ensure error-free production.",
        shortDescription: "Detailed engineering drawings with dimensions and tolerances",
        image: drafting2dImg,
        features: [
          "Industry standard compliance",
          "Complete views and dimensions",
          "Manufacturing-ready drawings",
          "Error-free production support",
        ],
        timeline: "Typical turnaround 5-10 days",
      },
      {
        id: 3,
        categoryId: 1,
        subId: 3,
        title: "Sheet Metal Design",
        description:
          "Specializing in sheet metal design, we create manufacturable and optimized components, considering bends, reliefs, and material properties to ensure high quality and cost-effective fabrication.",
        shortDescription: "Manufacturable sheet metal components",
        image: sheetMetalImg,
        features: [
          "Bend and relief optimization",
          "Material property consideration",
          "High quality fabrication",
          "Cost-effective solutions",
        ],
      },
      {
        id: 4,
        categoryId: 1,
        subId: 4,
        title: "Welded Structures",
        description:
          "Our welded structure design services include weld joint design, welding procedure specifications, and structural analysis to ensure strong, durable, and code-compliant welded assemblies.",
        shortDescription: "Welded joint design and structural analysis",
        image: weldingImg,
        features: [
          "Weld joint design",
          "Procedure specifications",
          "Structural analysis",
          "Code compliance assurance",
        ],
      },
      {
        id: 5,
        categoryId: 1,
        subId: 5,
        title: "Machining Tools & SPMs",
        description:
          "We design specialized machining tools and Special Purpose Machines (SPMs) tailored to your specific manufacturing requirements. Our designs focus on precision, efficiency, and reliability for high-volume production.",
        shortDescription: "Specialized machining tools and custom machines",
        image: machiningToolsImg,
        features: [
          "Custom tool design",
          "High-volume production support",
          "Precision engineering",
          "Efficiency optimization",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Documentation",
    description: "Comprehensive documentation services for manufacturing and quality control",
    services: [
      {
        id: 6,
        categoryId: 2,
        subId: 1,
        title: "Process Flow Diagrams (PFD)",
        description:
          "We create detailed Process Flow Diagrams that illustrate the sequence of operations, material flow, and equipment requirements for your manufacturing processes. These diagrams are essential for process optimization and operator training.",
        shortDescription: "Manufacturing process flow visualization",
        image: processFlowImg,
        features: [
          "Operation sequence mapping",
          "Material flow illustration",
          "Equipment requirement documentation",
          "Process optimization support",
        ],
      },
      {
        id: 7,
        categoryId: 2,
        subId: 2,
        title: "PFMEA & Control Plans",
        description:
          "We develop Process Failure Mode and Effects Analysis (PFMEA) and comprehensive control plans to ensure manufacturing processes are robust and capable of producing high-quality products consistently.",
        shortDescription: "Process failure prevention and control",
        image: pfmeaImg,
        features: [
          "Process failure prevention",
          "Control plan development",
          "Quality consistency assurance",
          "Manufacturing robustness",
        ],
      },
      {
        id: 8,
        categoryId: 2,
        subId: 3,
        title: "Work & Assembly Instructions",
        description:
          "We develop clear, detailed work instructions and assembly procedures that guide operators through complex manufacturing and assembly processes. Our instructions include visual aids, safety precautions, and quality checkpoints.",
        shortDescription: "Detailed assembly and work procedures",
        image: assemblyInstructionsImg,
        features: [
          "Visual aid integration",
          "Safety precaution documentation",
          "Quality checkpoint definition",
          "Operator guidance",
        ],
      },
      {
        id: 9,
        categoryId: 2,
        subId: 4,
        title: "Inspection Documents",
        description:
          "We create comprehensive inspection documents including checklists, procedures, and acceptance criteria to ensure quality control throughout the manufacturing process. Our documents comply with industry standards and regulatory requirements.",
        shortDescription: "Quality control documentation and procedures",
        image: inspectionDocsImg,
        features: [
          "Inspection checklists",
          "Procedure documentation",
          "Acceptance criteria definition",
          "Standards compliance",
        ],
      },
      {
        id: 10,
        categoryId: 2,
        subId: 5,
        title: "ASME / ISO Standards",
        description:
          "We ensure your designs and processes comply with relevant ASME, ISO, and other industry standards. Our expertise includes pressure vessel codes, welding standards, and quality management systems.",
        shortDescription: "Industry standards compliance and certification",
        image: isoStandardsImg,
        features: [
          "ASME code compliance",
          "ISO standards adherence",
          "Pressure vessel codes",
          "Quality management systems",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Analysis & Validation",
    description: "Advanced analysis and validation services for design optimization",
    services: [
      {
        id: 11,
        categoryId: 3,
        subId: 1,
        title: "FEA: Static, Dynamic, Thermal",
        description:
          "Our Finite Element Analysis services include static, dynamic, and thermal simulations to validate designs under real-world conditions and improve product performance.",
        shortDescription: "Static, dynamic, and thermal simulations",
        image: feaImg,
        features: [
          "Static analysis",
          "Dynamic simulation",
          "Thermal analysis",
          "Real-world condition validation",
        ],
        timeline: "Simulation cycles completed in 2-3 weeks",
      },
      {
        id: 12,
        categoryId: 3,
        subId: 2,
        title: "CFD Analysis",
        description:
          "We perform Computational Fluid Dynamics analysis to study fluid flow and heat transfer phenomena critical to your product's operation.",
        shortDescription: "Fluid flow and heat transfer analysis",
        image: cfdAnalysisImg,
        features: [
          "Fluid flow simulation",
          "Heat transfer analysis",
          "Performance optimization",
          "Critical operation validation",
        ],
        timeline: "Analysis reports within 2-4 weeks",
      },
      {
        id: 13,
        categoryId: 3,
        subId: 3,
        title: "DFMEA & Root Cause Analysis",
        description:
          "Our Design Failure Mode and Effects Analysis (DFMEA) service identifies potential failure modes in your designs and implements preventive measures. We also perform root cause analysis to solve existing quality issues.",
        shortDescription: "Design failure prevention and problem solving",
        image: dfmeaImg,
        features: [
          "Failure mode identification",
          "Preventive measure implementation",
          "Root cause analysis",
          "Quality issue resolution",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Manufacturing Support",
    description: "Comprehensive manufacturing support services for production optimization",
    services: [
      {
        id: 14,
        categoryId: 4,
        subId: 1,
        title: "Should Costing",
        description:
          "Our should-costing analysis provides detailed cost breakdowns for manufactured components, helping you understand cost drivers and identify opportunities for cost reduction without compromising quality.",
        shortDescription: "Manufacturing cost analysis and optimization",
        image: shouldCostingImg,
        features: [
          "Cost breakdown analysis",
          "Cost driver identification",
          "Reduction opportunity finding",
          "Quality maintenance",
        ],
      },
      {
        id: 15,
        categoryId: 4,
        subId: 2,
        title: "Factory Layout",
        description:
          "We design efficient factory layouts that optimize workflow, minimize material handling, and maximize productivity. Our layouts consider equipment placement, material flow, safety requirements, and future expansion needs.",
        shortDescription: "Optimized factory workflow and layout design",
        image: factoryLayoutImg,
        features: [
          "Workflow optimization",
          "Material handling minimization",
          "Productivity maximization",
          "Safety compliance",
        ],
      },
      {
        id: 16,
        categoryId: 4,
        subId: 3,
        title: "Vendor Coordination",
        description:
          "We manage vendor relationships and coordinate supplier activities to ensure timely delivery of quality components. Our services include supplier evaluation, quality audits, and performance monitoring.",
        shortDescription: "Supplier management and coordination",
        image: vendorCoordinationImg,
        features: [
          "Supplier evaluation",
          "Quality audits",
          "Performance monitoring",
          "Delivery coordination",
        ],
      },
    ],
  },
];

// Flattened services array for backward compatibility and easy lookup
export const services = serviceCategories.flatMap(category => 
  category.services.map(service => ({
    ...service,
    category: category.title,
  }))
);

export const projects = [
  {
    _id: 1,
    title: "Manufacturing Plant Layout Optimization",
    description:
      "Complete factory layout redesign resulting in 30% improvement in material flow and 25% reduction in production time. The project included equipment placement optimization, workflow analysis, and safety compliance verification.",
    shortDescription: "30% improvement in material flow efficiency",
    image: factoryLayoutImg,
    category: "Factory Layout",
    date: "2024-03-15",
    client: "Automotive Manufacturer",
    duration: "6 months",
    results: [
      "30% material flow improvement",
      "25% production time reduction",
      "Enhanced safety compliance",
      "Future expansion planning",
    ],
  },
  {
    _id: 2,
    title: "Custom Machining Tools & SPMs",
    description:
      "Design and development of specialized machining tools and Special Purpose Machines for high-precision automotive component manufacturing. The solution increased production capacity by 40% while maintaining tight tolerances.",
    shortDescription: "40% production capacity increase with custom tools",
    image: machiningToolsImg,
    category: "Machining",
    date: "2024-02-20",
    client: "Tier 1 Automotive Supplier",
    duration: "8 months",
    results: [
      "40% production capacity increase",
      "Tight tolerance maintenance",
      "Reduced setup time by 60%",
      "Improved surface finish quality",
    ],
  },
  {
    _id: 3,
    title: "Process Flow Optimization",
    description:
      "Development of comprehensive Process Flow Diagrams for a complex manufacturing process involving multiple workstations and quality checkpoints. The project streamlined operations and improved overall equipment effectiveness by 35%.",
    shortDescription: "35% improvement in overall equipment effectiveness",
    image: processFlowImg,
    category: "Process Design",
    date: "2024-01-10",
    client: "Industrial Equipment Manufacturer",
    duration: "4 months",
    results: [
      "35% OEE improvement",
      "Streamlined operations",
      "Enhanced quality control",
      "Reduced waste by 20%",
    ],
  },
  {
    _id: 4,
    title: "DFMEA Implementation for New Product",
    description:
      "Comprehensive Design Failure Mode and Effects Analysis for a new automotive component, identifying 50+ potential failure modes and implementing preventive measures. The project resulted in zero field failures during launch.",
    shortDescription: "Zero field failures during product launch",
    image: dfmeaImg,
    category: "Quality Analysis",
    date: "2023-12-05",
    client: "Automotive OEM",
    duration: "3 months",
    results: [
      "50+ failure modes identified",
      "Zero field failures at launch",
      "Reduced warranty claims by 80%",
      "Accelerated product approval",
    ],
  },
  {
    _id: 5,
    title: "Sheet Metal Design Optimization",
    description:
      "Complete redesign of sheet metal components for a consumer electronics product, focusing on manufacturability, cost reduction, and aesthetic appeal. The project achieved 25% cost savings while improving product durability.",
    shortDescription: "25% cost savings with improved durability",
    image: sheetMetalImg,
    category: "Sheet Metal Design",
    date: "2023-11-15",
    client: "Consumer Electronics Manufacturer",
    duration: "5 months",
    results: [
      "25% manufacturing cost reduction",
      "Improved product durability",
      "Enhanced aesthetic appeal",
      "Simplified assembly process",
    ],
  },
  {
    _id: 6,
    title: "CFD Analysis for Cooling System",
    description:
      "Computational Fluid Dynamics analysis of an electronic cooling system to optimize airflow and heat dissipation. The analysis led to a 40% improvement in cooling efficiency while reducing fan noise by 15%.",
    shortDescription: "40% improvement in cooling efficiency",
    image: cfdAnalysisImg,
    category: "CFD Analysis",
    date: "2023-10-20",
    client: "Electronics Manufacturer",
    duration: "2 months",
    results: [
      "40% cooling efficiency improvement",
      "15% fan noise reduction",
      "Optimized component placement",
      "Extended product lifespan",
    ],
  },
];

export const teamMembers = [
  {
    id: 1,
    name: "Omkar Kale",
    role: "CEO",
    experience: "10+ years",
    expertise: [" "],
    education: "Mechanical Engineering",
    certifications: [" "],
    image: team1,
    bio: "Leading innovation through design excellence and a decade of engineering wisdom.",
  },
  {
    id: 2,
    name: "Sumeet Patil",
    role: "CTO",
    experience: "15+ years",
    expertise: [""],
    education: "MTech in Machine Design",
    certifications: [""],
    image: team2,
    bio: "Transforming complex engineering challenges into scalable technological solutions.",
  },
  {
    id: 3,
    name: "Dr. Tushar Bhoite",
    role: "Tech. Advisor",
    experience: "15+ years",
    expertise: [""],
    education: "PhD in Advance MFG",
    certifications: [""],
    image: team3,
    bio: "Guiding engineering innovation with deep research, precision, and vision.",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Robert Wilson",
    company: "Tech Manufacturing Inc.",
    role: "Production Director",
    content:
      "Blitz India Engineering's expertise and attention to detail helped us achieve a 40% improvement in our manufacturing efficiency. Their team's professionalism and technical depth exceeded our expectations.",
    rating: 5,
    image: teamImg,
    project: "Factory Layout Optimization",
    date: "2024-03-20",
  },
  {
    id: 2,
    name: "Lisa Anderson",
    company: "Industrial Solutions Ltd.",
    role: "Operations Manager",
    content:
      "The CFD and FEA analysis provided by Blitz India Engineering was crucial for our product development. Their insights helped us optimize performance while reducing material costs by 25%.",
    rating: 5,
    image: teamImg,
    project: "CFD Analysis for Cooling System",
    date: "2024-02-15",
  },
  {
    id: 3,
    name: "David Martinez",
    company: "Auto Parts Corporation",
    role: "Engineering Manager",
    content:
      "Professional service with exceptional technical knowledge. Their sheet metal design and welding analysis exceeded our expectations and helped us launch our product ahead of schedule.",
    rating: 5,
    image: teamImg,
    project: "Sheet Metal Design Optimization",
    date: "2024-01-10",
  },
  {
    id: 4,
    name: "Jennifer Liu",
    company: "Aerospace Components Inc.",
    role: "Quality Assurance Director",
    content:
      "The DFMEA implementation by Blitz India Engineering was comprehensive and systematic. They identified potential issues we hadn't considered and provided practical solutions. Zero field failures since implementation.",
    rating: 5,
    image: teamImg,
    project: "DFMEA Implementation",
    date: "2023-12-05",
  },
  {
    id: 5,
    name: "Michael Thompson",
    company: "Heavy Machinery Solutions",
    role: "Chief Engineer",
    content:
      "Outstanding project management and technical execution. Blitz India Engineering delivered our complex machining tool project on time and within budget, exceeding our performance specifications.",
    rating: 5,
    image: teamImg,
    project: "Custom Machining Tools",
    date: "2023-11-20",
  },
];

// Legacy serviceCategories array removed - now using structured serviceCategories above

export const industries = [
  "Automotive",
  "Aerospace",
  "Manufacturing",
  "Energy & Power",
  "Consumer Products",
  "Industrial Equipment",
  "Heavy Machinery",
  "Electronics",
];

export const companyInfo = {
  name: "Blitz India Engineering",
  tagline: "Engineering Excellence for Global Industries",
  description:
    "We offer comprehensive design, FEA, and documentation services to global engineering clients. Our team combines technical expertise with practical manufacturing experience to deliver exceptional results.",
  established: "2015",
  headquarters: "Pune, India",
  globalReach: "Worldwide",
  specialties: [
    "Mechanical Design",
    "FEA Analysis",
    "Documentation",
    "Quality Control",
    "Engineering Services",
  ],
  certifications: ["ISO 9001", "ASME Compliance", "AWS Certified"],
  contact: {
    email: "info@blitzindiaengineering.com",
    phone: "+91-91585-75785",
    address: "Pune, Maharashtra, India",
  },
};

export const heroData = {
  title: "Engineering Excellence for Global Industries",
  subtitle: "Comprehensive Design, FEA, and Documentation Services",
  description:
    "We deliver precision engineering solutions that drive innovation and efficiency across automotive, aerospace, and industrial sectors worldwide.",
  ctaButton: "Explore Our Services",
  backgroundImage: project1Img,
};

export const serviceStats = [
  { label: "Projects Completed", value: "500+", icon: "📊" },
  { label: "Years of Experience", value: "15+", icon: "⚡" },
  { label: "Global Clients", value: "100+", icon: "🌍" },
  { label: "Success Rate", value: "98%", icon: "✅" },
];

export const technologies = [
  "SolidWorks",
  "CATIA",
  "Creo",
  "AutoCAD",
  "ANSYS",
  "ABAQUS",
  "Nastran",
  "Fluent",
  "COMSOL",
  "Mastercam",
];

const imageCollections = {
  team: [teamImg, project1Img, project2Img, project3Img],
  services: [
    drafting2dImg,
    modeling3dImg,
    cfdAnalysisImg,
    feaImg,
    factoryLayoutImg,
    sheetMetalImg,
    shouldCostingImg,
    vendorCoordinationImg,
  ],
  projects: [project1Img, project2Img, project3Img],
};

export const assets = {
  logo,
  team: teamImg,
  project1: project1Img,
  project2: project2Img,
  project3: project3Img,
  drafting2d: drafting2dImg,
  modeling3d: modeling3dImg,
  cfd: cfdAnalysisImg,
  fea: feaImg,
  sheetMetal: sheetMetalImg,
  factoryLayout: factoryLayoutImg,
  processFlow: processFlowImg,
  dfmea: dfmeaImg,
  pfmea: pfmeaImg,
  inspectionDocs: inspectionDocsImg,
  welding: weldingImg,
  assemblyInstructions: assemblyInstructionsImg,
  shouldCosting: shouldCostingImg,
  vendorCoordination: vendorCoordinationImg,
  isoStandards: isoStandardsImg,
  designExamples: designExamplesImg,
  images: imageCollections,
  services,
  projects,
  teamMembers,
  testimonials,
  serviceCategories,
  industries,
  companyInfo,
  heroData,
  serviceStats,
  technologies,
};

export default assets;