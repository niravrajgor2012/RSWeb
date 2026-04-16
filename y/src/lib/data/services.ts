import type { Service } from '$lib/types/services.ts';

export const services: Service[] = [
  {
    id: '1', slug: 'hr-consultancy',
    title: 'Consultancy for HR Strategies, Policies & Services',
    category: 'HR Solutions',
    shortDesc: 'End-to-end HR strategy design tailored to your organisation\'s goals and culture.',
    longDesc: 'We partner with organisations to design robust HR strategies, write clear policies, and implement people-first services that drive engagement and compliance. From scratch start-ups to established enterprises, our consultants bring decades of hands-on HR leadership.',
    icon: 'Users',
    features: ['HR Policy Drafting', 'Org Structure Design', 'Employee Handbook', 'HR Audit', 'Change Management'],
    targetAudience: ['Start-ups', 'SMEs', 'Corporates', 'NGOs']
  },
  {
    id: '2', slug: 'psychometric-tests',
    title: 'Psychometric Test Services',
    category: 'HR Solutions',
    shortDesc: 'Science-backed personality and aptitude assessments to hire the right fit.',
    longDesc: 'Our validated psychometric instruments assess cognitive ability, personality traits, and role-fit to help organisations make data-driven hiring and development decisions.',
    icon: 'Brain',
    features: ['Personality Profiling', 'Aptitude Testing', 'Leadership Assessment', 'Team Fit Analysis', 'Detailed Reports'],
    targetAudience: ['Corporates', 'Recruitment Agencies', 'Universities']
  },
  {
    id: '3', slug: 'permanent-recruitment',
    title: 'Permanent Recruitment Services',
    category: 'Recruitment',
    shortDesc: 'End-to-end talent acquisition for mid to senior-level permanent roles.',
    longDesc: 'We manage the full recruitment lifecycle — sourcing, screening, interviewing, and onboarding — ensuring you hire the best candidate efficiently and on budget.',
    icon: 'UserCheck',
    features: ['Role Profiling', 'Talent Mapping', 'Structured Interviews', 'Reference Checks', 'Offer Management'],
    targetAudience: ['Employers', 'MNCs', 'SMEs']
  },
  {
    id: '4', slug: 'rpo',
    title: 'Recruitment Process Outsourcing',
    category: 'Recruitment',
    shortDesc: 'Fully outsourced recruitment function to scale hiring without overhead.',
    longDesc: 'RPO lets you transfer some or all of your recruitment to us, reducing cost-per-hire, improving quality, and giving you scalable capacity on demand.',
    icon: 'RefreshCw',
    features: ['Dedicated Recruiters', 'ATS Management', 'Employer Branding', 'SLA-Based Delivery', 'Analytics Dashboard'],
    targetAudience: ['Large Enterprises', 'High-Growth Start-ups']
  },
  {
    id: '5', slug: 'contract-staffing',
    title: 'Contract Staffing (Workforce on Outsourcing Basis)',
    category: 'Recruitment',
    shortDesc: 'Flexible contract workforce deployed quickly to match project demands.',
    longDesc: 'We supply pre-vetted contract employees across functions, managing all HR and compliance aspects, so you focus purely on the work output.',
    icon: 'FileText',
    features: ['Quick Deployment', 'Compliance Management', 'Payroll Processing', 'Performance Monitoring', 'Flexible Exit'],
    targetAudience: ['Project-Based Companies', 'Seasonal Industries']
  },
  {
    id: '6', slug: 'nats',
    title: 'National Apprenticeship Training Scheme (NATS)',
    category: 'Recruitment',
    shortDesc: 'Government-approved NATS apprenticeship management for industry partners.',
    longDesc: 'We facilitate NATS enrolment, stipend processing, and compliance reporting, connecting industry employers with fresh graduates for structured on-the-job learning.',
    icon: 'GraduationCap',
    features: ['Portal Registration', 'Stipend Management', 'Compliance Reporting', 'Certificate Support', 'Industry Matching'],
    targetAudience: ['Manufacturing', 'IT Companies', 'Engineering Firms']
  },
  {
    id: '7', slug: 'naps',
    title: 'National Apprenticeship Promotion Scheme (NAPS)',
    category: 'Recruitment',
    shortDesc: 'NAPS-compliant apprenticeship programmes with government subsidy benefits.',
    longDesc: 'Our NAPS services help organisations access government reimbursements while building a skilled, apprentice-trained workforce under the Apprentices Act.',
    icon: 'BookOpen',
    features: ['NAPS Registration', 'Government Subsidy Claims', 'Skill Matching', 'Training Planning', 'Audit Support'],
    targetAudience: ['MSMEs', 'Large Corporates', 'Trade & Vocational Sectors']
  },
  {
    id: '8', slug: 'functional-hr',
    title: 'Functional HR Services on Outsourcing Basis',
    category: 'HR Solutions',
    shortDesc: 'Outsource your day-to-day HR operations to our expert team.',
    longDesc: 'From joining formalities and leave management to exit interviews and statutory filings, we handle all HR functions so your in-house team can focus on strategy.',
    icon: 'Settings',
    features: ['Onboarding & Offboarding', 'Leave & Attendance', 'Employee Records', 'Grievance Handling', 'MIS Reports'],
    targetAudience: ['SMEs', 'Start-ups without HR team']
  },
  {
    id: '9', slug: 'payroll-outsourcing',
    title: 'Payroll Outsourcing',
    category: 'HR Solutions',
    shortDesc: 'Accurate, on-time payroll processing with full statutory compliance.',
    longDesc: 'We manage end-to-end payroll including PF, ESIC, PT, TDS, and Form 16 generation, ensuring zero errors and complete regulatory compliance.',
    icon: 'Wallet',
    features: ['Monthly Payroll Processing', 'PF / ESIC / PT Compliance', 'TDS & Form 16', 'Salary Slips', 'Statutory Filings'],
    targetAudience: ['All Organisation Sizes']
  },
  {
    id: '10', slug: 'legal-compliance',
    title: 'Legal Compliance (HR Related)',
    category: 'Compliance & Legal',
    shortDesc: 'Stay compliant with all HR-related laws, acts, and regulations.',
    longDesc: 'Our compliance experts monitor regulatory changes and help you stay ahead of Labour Laws, Shops & Establishment Acts, Factories Act, and all applicable statutes.',
    icon: 'Scale',
    features: ['Labour Law Advisory', 'License & Registration', 'Inspector Liaison', 'Compliance Calendar', 'Document Management'],
    targetAudience: ['All Industries', 'Factories', 'Retail & Hospitality']
  },
  {
    id: '11', slug: 'third-party-auditor',
    title: 'Third Party Auditor for HR Services',
    category: 'Compliance & Legal',
    shortDesc: 'Independent HR compliance audits by certified third-party experts.',
    longDesc: 'We conduct objective audits of your HR processes, payroll, and compliance records, providing a detailed gap analysis and corrective action plan.',
    icon: 'ClipboardCheck',
    features: ['Process Audits', 'Payroll Verification', 'Compliance Audit', 'Gap Analysis Report', 'Corrective Action Plan'],
    targetAudience: ['Corporates', 'Principal Employers with Contractors']
  },
  {
    id: '12', slug: 'background-verification',
    title: 'Employment Background Verification',
    category: 'Compliance & Legal',
    shortDesc: 'Thorough pre-employment checks to hire with confidence.',
    longDesc: 'We verify education credentials, employment history, criminal records, address, and references — giving you reliable insights before making an offer.',
    icon: 'ShieldCheck',
    features: ['Education Verification', 'Employment History Check', 'Criminal Record Check', 'Address Verification', 'Reference Check'],
    targetAudience: ['All Employers', 'Banks & NBFCs', 'IT Companies']
  },
  {
    id: '13', slug: 'advisory-services',
    title: 'Advisory Services on Business Reforms & Improvement',
    category: 'Advisory',
    shortDesc: 'Strategic advisory to drive organisational transformation and growth.',
    longDesc: 'Our business advisors work alongside leadership teams to identify improvement opportunities, redesign processes, and implement change that delivers measurable ROI.',
    icon: 'Lightbulb',
    features: ['Process Re-engineering', 'Change Management', 'OD Interventions', 'Productivity Improvement', 'Leadership Coaching'],
    targetAudience: ['CEOs', 'Business Owners', 'Senior Management']
  },
  {
    id: '14', slug: 'training-development',
    title: 'Training & Development',
    category: 'Training & Development',
    shortDesc: 'Customised L&D programmes to upskill your workforce and leaders.',
    longDesc: 'From technical skills to behavioural competencies, we design and deliver impactful training programmes — classroom, online, or blended — aligned to your business goals.',
    icon: 'TrendingUp',
    features: ['Needs Analysis', 'Custom Curriculum', 'Facilitator-Led Training', 'E-Learning', 'ROI Assessment'],
    targetAudience: ['All Organisations', 'HR Managers', 'L&D Teams']
  },
  {
    id: '15', slug: 'rti-training',
    title: 'Training on RTI and Legal Services under RTI',
    category: 'Training & Development',
    shortDesc: 'Demystify RTI with practical workshops for public and private sectors.',
    longDesc: 'Our RTI training equips participants to draft RTI applications, understand appellate procedures, and leverage the Right to Information Act effectively.',
    icon: 'Eye',
    features: ['RTI Act Overview', 'Filing Applications', 'First & Second Appeal', 'Case Studies', 'Mock Practice'],
    targetAudience: ['Government Employees', 'Citizens', 'NGOs', 'Legal Teams']
  },
  {
    id: '16', slug: 'posh-training',
    title: 'Training on PoSH',
    category: 'Training & Development',
    shortDesc: 'Mandatory Prevention of Sexual Harassment training for a safe workplace.',
    longDesc: 'Our PoSH programmes cover the POSH Act 2013, Internal Complaints Committee (ICC) formation, complaint handling, and creating inclusive workplaces.',
    icon: 'Heart',
    features: ['POSH Act Awareness', 'ICC Training', 'Complaint Handling', 'Policy Drafting', 'Annual Compliance Report'],
    targetAudience: ['All Employers', 'ICC Members', 'HR Managers']
  },
  {
    id: '17', slug: 'labour-laws-training',
    title: 'Training on New Labour Laws',
    category: 'Training & Development',
    shortDesc: 'Stay updated on the four Labour Codes reshaping Indian employment law.',
    longDesc: 'India\'s four Labour Codes consolidate 29 central laws. Our training breaks down each Code, its impact, and practical compliance steps for HR and finance teams.',
    icon: 'Gavel',
    features: ['All Four Labour Codes', 'Practical Compliance Steps', 'Case Studies', 'Q&A Sessions', 'Reference Material'],
    targetAudience: ['HR Professionals', 'Finance Teams', 'Business Owners', 'Lawyers']
  },
  {
    id: '18', slug: 'tourism-solutions',
    title: 'Tourism Specific Solutions & Services',
    category: 'Specialty',
    shortDesc: 'Tailored HR and operational solutions for the tourism and hospitality industry.',
    longDesc: 'From seasonal workforce management to compliance for hotels and tour operators, we offer end-to-end HR solutions designed for the unique demands of tourism.',
    icon: 'MapPin',
    features: ['Seasonal Workforce', 'Hospitality Compliance', 'Training for Frontline Staff', 'Tourism Skill Standards', 'Industry Networking'],
    targetAudience: ['Hotels', 'Tour Operators', 'Travel Agencies', 'Resorts']
  },
  {
    id: '19', slug: 'csr',
    title: 'Supporting CSR Activity',
    category: 'Specialty',
    shortDesc: 'Plan, execute, and document impactful Corporate Social Responsibility initiatives.',
    longDesc: 'We help corporates meet their CSR obligations through community skill development, education support, and environment initiatives — with complete documentation for compliance.',
    icon: 'Leaf',
    features: ['CSR Planning', 'Project Execution', 'Beneficiary Identification', 'Impact Reporting', 'Section 135 Compliance'],
    targetAudience: ['Listed Companies', 'PSUs', 'Large Private Companies']
  },
  {
    id: '20', slug: 'institutional-collaboration',
    title: 'Collaborating with Various Institutions',
    category: 'Advisory',
    shortDesc: 'Building bridges between industry, academia, and government bodies.',
    longDesc: 'We facilitate MOUs, industry-academia partnerships, guest lecture series, and campus placement drives that benefit students, faculty, and employers alike.',
    icon: 'Building2',
    features: ['MOU Facilitation', 'Campus Placement Drives', 'Guest Lecture Coordination', 'Industry Advisory Boards', 'Research Collaboration'],
    targetAudience: ['Universities', 'Colleges', 'Industry Associations', 'Government Bodies']
  },
  {
    id: '21', slug: 'cultural-activities',
    title: 'Cultural Activities',
    category: 'Specialty',
    shortDesc: 'Producing and promoting musical programs, films, Gujarati serials, and drama.',
    longDesc: 'Beyond HR, we nurture Gujarat\'s rich cultural heritage by producing and managing musical events, films, regional-language serials, and theatrical productions.',
    icon: 'Music',
    features: ['Musical Events', 'Film Production Support', 'Gujarati Serials', 'Drama & Theatre', 'Cultural Festivals'],
    targetAudience: ['Artists', 'Cultural Organisations', 'Event Sponsors', 'Media Houses']
  },
  {
    id: '22', slug: 'it-consultancy',
    title: 'IT Consultancy & Solutions',
    category: 'IT & Digital',
    shortDesc: 'Digital transformation and IT solutions to modernise your HR operations.',
    longDesc: 'From HRMS implementation to custom web and mobile applications, our IT consultancy team helps you select, deploy, and optimise technology for maximum productivity.',
    icon: 'Monitor',
    features: ['HRMS Selection & Setup', 'Custom Web Apps', 'Mobile Applications', 'Data Analytics', 'IT Audit & Advisory'],
    targetAudience: ['All Organisations', 'HR Tech Buyers', 'Digital-First Companies']
  }
];

export const serviceCategories = [
  'HR Solutions', 'Recruitment', 'Compliance & Legal',
  'Training & Development', 'Advisory', 'IT & Digital', 'Specialty'
] as const;
