import type { Service } from '$lib/types/services.ts';

export const services: Service[] = [
  {
    id: '1', slug: 'hr-consultancy',
    title: 'Consultancy for HR Strategies, Policies & Services',
    category: 'HR Solutions',
    shortDesc: 'Comprehensive human capital management solutions tailored to your organisation\'s unique culture, vision and mission.',
    longDesc: 'R Square HR Services (RSHRS) provides comprehensive human capital management solutions, offering expertise in organisational structure design, strategic workforce planning, HR policy optimization, and the creation of competitive compensation and rewards strategies.\n\nWhile providing all these services we also write Manuals for the services and carry out hand holding process during implementation.\n\nIn parallel, our business growth and transformation services cover sales strategy and enablement, digital transformation, supply chain management, and project management. Our strategies are tailor-made for customers to align with the culture, vision and mission unique to them. Each solution is customised to align with the client\'s unique culture, vision, and mission, driving sustainable growth and long-term organisational success.',
    icon: 'Users',
    features: ['HR Policy Drafting & Manuals', 'Org Structure Design', 'Strategic Workforce Planning', 'Compensation & Rewards Strategy', 'Hand-holding During Implementation'],
    targetAudience: ['Start-ups', 'SMEs', 'Corporates', 'NGOs', 'MSMEs']
  },
  {
    id: '2', slug: 'psychometric-tests',
    title: 'Psychometric Test Services',
    category: 'HR Solutions',
    shortDesc: 'Science-backed assessments for talent identification, leadership evaluation, and performance development.',
    longDesc: 'Employability Skill Assessment: Skill assessment is important in nurturing the lowest segment of the pyramid of the organization. Our services for skill assessment help in talent identification and development.\n\nManagerial and Leadership Skills / Entrepreneurial Assessment: We conduct assessment of managerial and leadership skills. The assessments are used constructively to add value to an organization in the form of coaching and development.\n\nCompetency Mapping: Developing of HR process and competency mapping — we also have expertise in developing and aligning HR systems and processes for organizations in the MSME sector.\n\nPerformance Evaluation: Performance Evaluation assessment for the suitability on the current position and growth path.',
    icon: 'Brain',
    features: ['Employability Skill Assessment', 'Managerial & Leadership Assessment', 'Competency Mapping', 'Performance Evaluation', 'Entrepreneurial Assessment'],
    targetAudience: ['Corporates', 'MSMEs', 'Recruitment Agencies', 'Universities']
  },
  {
    id: '3', slug: 'permanent-recruitment',
    title: 'Permanent Recruitment Services',
    category: 'Recruitment',
    shortDesc: 'End-to-end talent acquisition across industries, from executive search to mass hiring.',
    longDesc: 'R SQUARE HR Services is basically an effort to create value in talent management domains and business consulting services. We specialize in talent acquisition, deployment & outsourcing, corporate learning & development. We also cater to the organization consulting space primarily servicing the industry through business process improvement, managerial outsourcing and other organizational development interventions. We are connected to companies in India helping them source best solutions to their intellectual & resourcing needs for both their onsite / offshore requirements.\n\nR SQUARE HR Differentiation: Unlike generalist competitors, we choose to specialize in industries and applications that are highly information-intensive and such increasingly challenging areas as HR consulting and executive search, along with our specialization in IT recruitment.\n\nPresence across Industries & Locations: Our clients are spread across India in different segments including Tourism, Education, Information Technology, Pharmaceuticals, Engineering, Manufacturing, Services and Retail.\n\nR SQUARE\'s Executive Search: At R SQUARE HR, we invest in understanding the context of the client, the organization\'s structure, the role to be filled and its context. We specialize in Executive Search / Middle Management / Board Member & CXO Search. In addition, we have expertise in Mass Hiring or Team Hiring within a stipulated time.',
    icon: 'UserCheck',
    features: ['Executive Search / CXO Hiring', 'Middle Management Recruitment', 'Mass / Team Hiring', 'Reference Checks & Offer Management', 'Role Profiling & Talent Mapping'],
    targetAudience: ['Employers', 'MNCs', 'SMEs', 'Start-ups', 'Fortune 500 Companies']
  },
  {
    id: '4', slug: 'rpo',
    title: 'Recruitment Process Outsourcing',
    category: 'Recruitment',
    shortDesc: 'Fully outsourced recruitment function — scalable, compliant, and data-driven.',
    longDesc: 'R SQUARE HR understands the significance of onboarding a set of people as per a recruitment plan and what it takes to make it happen. A number of activities have to happen in harmony with one another and continuous monitoring is required to make sure that the harmony is maintained.\n\nScope of Work includes: Understanding the organization, the structure, the context of each role holder and the requirements; Designing a plan for talent attraction, candidate assessment and candidate communication; Advertising jobs on a variety of media; Sourcing candidates through multiple channels; Managing vendors and internal referrals; Receiving and screening applications sourced through all channels; Capturing details of applicants in a trackable format; Coordinating interviews and selection process steps with shortlisted candidates; Working with client teams for the issuance of offer letters; Negotiating offers with the candidates; and Engaging offered candidates till their successful joining.\n\nR SQUARE HR Advantages: Matches your compliance requirements fully without taking any short-cuts. A team of expert consultants who have the experience in designing and executing some of the largest RPO programs in India will make sure that the client has a good plan and executes it rigorously.',
    icon: 'RefreshCw',
    features: ['End-to-End Recruitment Management', 'Multi-Channel Candidate Sourcing', 'Offer Negotiation & Onboarding', 'SLA-Based Delivery', 'Compliance-First Process'],
    targetAudience: ['Large Enterprises', 'High-Growth Start-ups', 'Companies with Volume Hiring Needs']
  },
  {
    id: '5', slug: 'contract-staffing',
    title: 'Contract Staffing (Workforce Service on Outsourcing Basis)',
    category: 'Recruitment',
    shortDesc: 'Flexible Flex Staff (Deputies) on R Square\'s payroll deployed at your organisation.',
    longDesc: 'R SQUARE HR provides Flex staff with varied skill-sets on its payroll across multiple locations. We call them our Deputies (Flex Staff). They work at our client organizations for a specified period of time across different functions and levels. We do end-to-end employee life cycle management with an option to be hired on to the client payroll, offering complete flexibility. Our technology enabled transparent work process brings in proven efficiency in deputee engagement and reduces employee Query Resolution Time massively.\n\nR SQUARE HR is sensitive to the fact that in addition to Flex Staffing, organizations also need value added services not just limited to employee engagement, performance management, talent pipeline management etc. In such cases, we bring in a dedicated team for them; they operate out of the customer\'s office / location and do everything for that client — for the line managers, HR team, finance team, legal team and all the temp staff of R SQUARE HR working there; they bring in higher efficiency in staffing and a significant increase in productivity.\n\nKey Advantages: Rigorous management of compliance and risks; Domain experts carry out payroll and all compliance matters; Right selection of candidates using our expertise and unique matching algorithm; Transparent work processes using technology that leads to a huge reduction in queries from employees and line managers.',
    icon: 'FileText',
    features: ['Flex Staff (Deputies) on R Square Payroll', 'End-to-End Employee Life Cycle Management', 'Option to Convert to Client Payroll', 'Compliance & Risk Management', 'Quick Resolution of Employee Queries'],
    targetAudience: ['Project-Based Companies', 'Seasonal Industries', 'Organisations Needing Dedicated Onsite Teams']
  },
  {
    id: '6', slug: 'nats',
    title: 'National Apprenticeship Training Scheme (NATS)',
    category: 'Recruitment',
    shortDesc: 'Comprehensive end-to-end management of NATS apprenticeship programmes for industry partners.',
    longDesc: 'R Square\'s National Apprenticeship Training Scheme (NATS) service offers comprehensive, end-to-end management of apprenticeship programs, helping organisations seamlessly comply with the Government of India\'s initiative to upskill young professionals. We handle every aspect of the process, from sourcing and mobilising apprentices to coordinating training, conducting assessments, and facilitating final certification. Our expertise ensures that both apprentices and organisations benefit from structured skill development, while adhering to all government apprenticeship guidelines and statutory requirements.\n\nWith RSHRS\'s NATS services, organisations can implement apprenticeship programs effortlessly. We not only ensure compliance but also help companies maximise government incentives, providing a cost-effective way to build a skilled workforce. Our extensive network enables us to place apprentices from diverse regions into meaningful roles, offering young professionals valuable industry-aligned skills to launch their careers, while ensuring businesses benefit from a trained, capable talent pipeline.',
    icon: 'GraduationCap',
    features: ['Apprentice Sourcing & Mobilisation', 'Training Coordination', 'Assessment & Certification', 'Government Compliance & Incentives', 'Statutory Reporting'],
    targetAudience: ['Manufacturing', 'IT Companies', 'Engineering Firms', 'All Establishments with 30+ Workforce']
  },
  {
    id: '7', slug: 'naps',
    title: 'National Apprenticeship Promotion Scheme (NAPS)',
    category: 'Recruitment',
    shortDesc: 'NAPS-compliant apprenticeship programmes with government financial support for establishments.',
    longDesc: 'National Apprenticeship Promotion Scheme (NAPS) is a scheme launched by the Government of India on 19th August 2016 to provide financial support to establishments undertaking apprenticeship training.\n\nApprenticeship training is a course of training in an industry or establishment, under a contract of Apprenticeship which: (1) Provides a "learn while earn" opportunity to the apprentice; (2) Tackles skill shortages and develops a talent pipeline for future needs.\n\nAll establishments having a workforce (regular and contract employees) of 30 or more are mandated to undertake Apprenticeship Programs in a range from 2.5% to 15% of their workforce every year.\n\nBasic Training consists of theoretical and practical / lab instruction segments for every Apprenticeship Program. On-the-Job Training (OJT) is practical training imparted at the workplace premises.\n\nCategories covered: ITI Pass Outs; All Pass Outs from NSQF aligned courses including PMKVY / DDUGKY etc.; Dual-Learning Mode; Fresh Apprentices.\n\nDesignated Trades are those notified by the Government; Optional Trades are those not included in the notified list but opted by an establishment.',
    icon: 'BookOpen',
    features: ['NAPS Registration & Compliance', 'Government Subsidy Claims', 'Basic Training & OJT Coordination', 'Designated & Optional Trades Management', 'All NSQF-Aligned Categories'],
    targetAudience: ['MSMEs', 'Large Corporates', 'Trade & Vocational Sectors', 'All Establishments with 30+ Employees']
  },
  {
    id: '8', slug: 'functional-hr',
    title: 'Functional HR Services on Outsourcing Basis',
    category: 'HR Solutions',
    shortDesc: 'All HR services under one roof — freeing small companies from HR overhead entirely.',
    longDesc: 'We provide all HR Services under one roof. So, small companies do not require an HR Department to carry out HR processes. We carry out all the tasks on an outsourcing basis and thus make companies tension-free from manpower issues and provide strength for their core business operations.',
    icon: 'Settings',
    features: ['Joining Formalities & Onboarding', 'Leave & Attendance Management', 'Employee Records Maintenance', 'Grievance Handling', 'MIS Reports & Exit Interviews'],
    targetAudience: ['SMEs without HR Teams', 'Start-ups', 'Small Companies']
  },
  {
    id: '9', slug: 'payroll-outsourcing',
    title: 'Payroll Outsourcing',
    category: 'HR Solutions',
    shortDesc: 'Technology-integrated payroll management with compliance, payslips, and a self-service portal.',
    longDesc: 'RSHRS offers a comprehensive payroll management solution that integrates technology and streamlines processes. Our services cover leaves and attendance management, verification of employee investments and claims, payroll calculation, and the generation of pay slips and statutory reports. Additionally, employees can access relevant employment details through a self-service portal, simplifying HR administration for businesses.',
    icon: 'Wallet',
    features: ['Leaves & Attendance Management', 'Employee Investment Verification', 'Payroll Calculation & Pay Slips', 'Statutory Reports', 'Employee Self-Service Portal'],
    targetAudience: ['All Organisation Sizes']
  },
  {
    id: '10', slug: 'legal-compliance',
    title: 'Legal Compliance (HR Related)',
    category: 'Compliance & Legal',
    shortDesc: 'Labour law compliance services including statutory dues, returns, registers, and government liaison.',
    longDesc: 'We also provide labour law compliance services, including remitting statutory dues, filing returns, maintaining statutory registers, and liaising with government offices to address complex queries and disputes.',
    icon: 'Scale',
    features: ['Remitting Statutory Dues', 'Filing Returns', 'Maintaining Statutory Registers', 'Government Office Liaison', 'Complex Query & Dispute Resolution'],
    targetAudience: ['All Industries', 'Factories', 'Retail & Hospitality', 'Service Organisations']
  },
  {
    id: '11', slug: 'third-party-auditor',
    title: 'Third Party Auditor for HR Services',
    category: 'Compliance & Legal',
    shortDesc: 'Independent HR compliance audits — protecting principal employers from contractor-default liability.',
    longDesc: 'A number of organizations engage manpower agencies for their manpower requirement in offices, housekeeping, security services etc. These agencies / contractors sometimes fail in maintaining legal compliance and unfortunately the organization that has engaged them is held responsible as a principal employer for the mistakes carried out by the contractor.\n\nWe provide service as Third Party Auditor for the HR services and legal compliances, conducting objective audits of your HR processes, payroll, and compliance records, providing a detailed gap analysis and corrective action plan.',
    icon: 'ClipboardCheck',
    features: ['HR Process Audits', 'Payroll Verification', 'Legal Compliance Audit', 'Gap Analysis Report', 'Corrective Action Plan'],
    targetAudience: ['Corporates', 'Principal Employers with Contractors', 'Organisations Using Manpower Agencies']
  },
  {
    id: '12', slug: 'background-verification',
    title: 'Employment Background Verification',
    category: 'Compliance & Legal',
    shortDesc: 'Comprehensive pre-employment checks: employment, education, reference, credential, address, identity, criminal, and drug screening.',
    longDesc: 'Employment check is a process to validate an applicant\'s previous employment details including length of employment, position, and rehire eligibility. Frequently, information supplied by job applicants is either false or inflated.\n\nEducation check: Determines the validity and accuracy of an applicant\'s educational history including degree received, dates of attendance, graduation date, and any special recognition or awards.\n\nReference check: For a sensitive or confidential position, often a reference check is the best way to determine what an applicant is really like. For middle and upper level management, this search is vital in determining the true character of an applicant.\n\nCredential check: State-of-the-art technology helps our researchers verify relevant education, training, professional state licensure and certification credentials.\n\nAddress check: Verifies that the address provided by the applicant is accurate and that the addressee resided there.\n\nIdentity check: A process to find out if they are who they say they are. Negligent hiring may lead to a lawsuit or corporate culture breach.\n\nCriminal check: Reveals any past convictions or criminal activities. Reported information includes location, case number, date filed, charges, conviction date, and disposition.\n\nDrug check – 5 Panel: Tests for amphetamines, cocaine, marijuana, opiates, and phencyclidine (PCP).\nDrug check – 10 Panel: Tests for amphetamines, barbiturates, benzodiazepines, cocaine, marijuana, methadone, methaqualone, opiates, phencyclidine (PCP), and propoxyphene.',
    icon: 'ShieldCheck',
    features: ['Employment History Verification', 'Education & Credential Check', 'Reference Check', 'Address & Identity Check', 'Criminal Check & Drug Screening (5/10 Panel)'],
    targetAudience: ['All Employers', 'Banks & NBFCs', 'IT Companies', 'Healthcare Providers']
  },
  {
    id: '13', slug: 'advisory-services',
    title: 'Advisory Services on Business Reforms & Improvement',
    category: 'Advisory',
    shortDesc: 'Strategic advisory to drive organisational transformation, productivity, and sustainable growth.',
    longDesc: 'As the Business world tries to steer the present challenges, many of the management practices will undergo changes in the days ahead. The biggest challenge today is to achieve the strategic intent of the business, provide organizational scalability & sustained growth through optimized resources — manpower and material. We need to make our work force more engaged, enjoy what they do and draw motivation from their achievement. Performance parameters need to more align to key outcome.\n\nOur output needs to meet higher level quality. We should set objectives without draining ourselves or burning out our talent pool. We need to understand that it\'s not quantum but quality of our focus on the key areas that will give us the desired results. Quantum can in the short run give us a level of output though higher than the previous level and in line with our business target but not near the possible potential and perhaps on target but with a cost. Thus, many a times the approach is not sustainable.\n\nOur business advisors work alongside leadership teams to identify improvement opportunities, redesign processes, and implement change that delivers measurable ROI.',
    icon: 'Lightbulb',
    features: ['Strategic Intent Alignment', 'Process Re-engineering', 'Productivity & Performance Improvement', 'Change Management', 'OD Interventions'],
    targetAudience: ['CEOs', 'Business Owners', 'Senior Management', 'SMEs']
  },
  {
    id: '14', slug: 'training-development',
    title: 'Training & Development',
    category: 'Training & Development',
    shortDesc: 'Comprehensive L&D programmes delivered by renowned professionals across all organisational levels.',
    longDesc: 'Someone has beautifully said: "What happens if we train our people and they leave?" — Wrong question! According to Zig Ziglar, you should be asking "What happens if we don\'t train our people, and they stay?"\n\nR SQUARE HR employs a suite of interventions to enhance & develop general and professional skills of all our client\'s employees which aim for betterment of basic knowledge and competency skills. All programs are delivered by well-qualified and renowned training professionals having rich experience in organizational learning and development. The entire Learning & Development delivery model is performed at 5 levels across the organizational hierarchy with specific modes at each level.\n\nEducation and Learning Process covers critical methodologies like Self Reflection, Action Therapy, Dramatics, and Case Studies & Role Plays.\n\nTechno Management Modules: Quality & Process Compliance, Preventative Maintenance, Cost Effectiveness, Supply Chain & Logistics / Inventory Management, Production Planning & Control (PPC), Six Sigma Applications, Business Excellence.\n\nExecutive Coaching Modules: Leadership Development, Train the Trainer (TTT), Change Management, Project Management, Managerial Effectiveness Programme, Coaching & Mentoring, Vision & Mission Exercise for Senior Management Group, Thinking Strategy.\n\nSoft Skills / Behavioural Modules: Magic of Teams, Creating Right Attitude, Motivation, Managing Stress, Problem Solving & Decision Making Skills, Creativity and Out of Box Thinking, Effective Time Management, Communications, Interpersonal Skills, Presentation Skills, CRM, Business Etiquettes, Transactional Analysis, Self-Awareness.',
    icon: 'TrendingUp',
    features: ['Techno Management Modules', 'Executive Coaching Modules', 'Soft Skills & Behavioural Modules', '5-Level L&D Delivery Model', 'Custom Curriculum Design'],
    targetAudience: ['All Organisations', 'HR Managers', 'L&D Teams', 'Senior Management']
  },
  {
    id: '15', slug: 'rti-training',
    title: 'Training on RTI and Legal Services under RTI',
    category: 'Training & Development',
    shortDesc: 'Practical RTI workshops for government organisations, semi-government bodies, and the general public.',
    longDesc: 'After the implementation of Right to Information Act, all the Government, Semi Government and such other organisations need to adopt certain changes in their day-to-day working style. It requires a balanced approach between speed of working and protection of the law.\n\nR Square provides specific insight to the employees and officers working in such organizations. We train officers as well as general public to get the best out of RTI. Interested organizations may approach R Square for their specific needs.',
    icon: 'Eye',
    features: ['RTI Act Overview', 'Filing RTI Applications', 'First & Second Appeal Process', 'Case Studies', 'Training for Officers & General Public'],
    targetAudience: ['Government Employees', 'Semi-Government Organisations', 'Citizens', 'NGOs', 'Legal Teams']
  },
  {
    id: '16', slug: 'posh-training',
    title: 'Training on Prevention of Sexual Harassment (PoSH) Act',
    category: 'Training & Development',
    shortDesc: 'Mandatory PoSH Act training to create safe, inclusive workplaces and ensure legal compliance.',
    longDesc: 'The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, commonly known as POSH (Prevention of Sexual Harassment) Act is a legislative act in India that seeks to protect women from sexual harassment at their place of work. It was passed by the Lok Sabha (the lower house of the Indian Parliament) on 3 September 2012, by the Rajya Sabha (the upper house) on 26 February 2013, and got the assent of the President on 23 April 2013. The Act came into force on 9 December 2013. This statute superseded the Vishaka Guidelines for Prevention of Sexual Harassment (POSH) introduced by the Supreme Court (SC) of India.\n\nIt was reported by the International Labour Organization that very few Indian employers were compliant to this statute. Most Indian employers have not implemented the law despite the legal requirement that any workplace with more than 10 employees needs to implement it. According to a FICCI-EY November 2015 report, 36% of Indian companies and 25% among MNCs are not compliant with the Sexual Harassment Act, 2013. The government has threatened to take stern action against employers who fail to comply with this law.\n\nA report by the Indian Express in May 2023 finds that half of India\'s sports federations are yet to create an "Internal Complaints Committee" as mandated by this law.\n\nSometimes, companies desire to implement but need support. We extend our helping hand to such organizations by providing them necessary guidance and training.',
    icon: 'Heart',
    features: ['PoSH Act 2013 Awareness', 'ICC Formation & Training', 'Complaint Handling Procedures', 'HR Policy Drafting for PoSH', 'Annual Compliance Support'],
    targetAudience: ['All Employers (10+ Employees)', 'ICC Members', 'HR Managers', 'Sports Federations']
  },
  {
    id: '17', slug: 'labour-laws-training',
    title: 'Training on New Labour Codes',
    category: 'Training & Development',
    shortDesc: 'Expert-led training on India\'s four New Labour Codes — prepare your organisation before implementation.',
    longDesc: 'India\'s labour law landscape is undergoing one of the biggest transformations in decades. The new labour codes for HR professionals and businesses are expected to reshape how organizations manage wages, working conditions, social security, and industrial relations.\n\nThe Government of India has consolidated 29 existing labour laws into four new labour codes to simplify compliance and create a more transparent and structured system: (1) Code on Wages; (2) Industrial Relations Code; (3) Occupational Safety, Health and Working Conditions Code; (4) Social Security Code.\n\nKey changes that will require attention include: New wage definitions impacting salary structures; Changes in working hours and overtime rules; Updated PF and social security contributions; New regulations pertaining to contract employees; New regulations around contract labour and gig workers; Revised compliance and documentation requirements.\n\nR Square provides new labour codes training designed specifically for HR professionals, compliance managers, and business leaders. Participants gain a clear understanding of the structure and scope of all four labour codes, key changes in wages and employee benefits, the impact on HR policies and payroll, and practical steps organizations must take before implementation.\n\nAll participants will receive a Certificate of Appreciation. Preparing early will help organizations avoid last-minute compliance challenges and ensure smooth implementation once the codes come into effect.',
    icon: 'Gavel',
    features: ['All Four Labour Codes Coverage', 'Wage & Compliance Changes', 'Impact on HR Policies & Payroll', 'Certificate of Appreciation', 'Practical Implementation Guidance'],
    targetAudience: ['HR Professionals', 'Compliance Managers', 'Finance Teams', 'Business Owners', 'Lawyers']
  },
  {
    id: '18', slug: 'tourism-solutions',
    title: 'Tourism Specific Solutions & Services',
    category: 'Specialty',
    shortDesc: 'Tailored HR and IT solutions for tourism-centric organisations, leveraging proven expertise in tribal and heritage tourism.',
    longDesc: 'R Square has excellent experience in working with Tourist-centric organizations. We have supported projects in the tribal areas and hence developed expertise on local employment. R Square, being a company with a versatile background, can provide excellent IT and Non-IT solutions for Tourism Projects.\n\nOur proven track record includes training and providing 132 Tourist Guides to the Tourism Corporation of Gujarat Limited (TCGL) for the Statue of Unity and 7 other district locations of Gujarat, with these guides performing since July 2019. R Square has also organized and conducted training programs on Tourist Guides, Housekeeping, Security, Spoken English, International Languages, and various skill development schemes including PMKVY, PM-DAKSH, DDU-GKY, and DAY-NULM.',
    icon: 'MapPin',
    features: ['Tourist Guide Training & Deployment', 'Hospitality & Housekeeping Training', 'IT & Non-IT Tourism Solutions', 'Local Employment in Tribal Areas', 'Skill Development under Govt. Schemes'],
    targetAudience: ['Tourism Corporations', 'Hotels & Resorts', 'Tour Operators', 'Government Tourism Authorities']
  },
  {
    id: '19', slug: 'csr',
    title: 'Supporting CSR Activity',
    category: 'Specialty',
    shortDesc: 'Leveraging our founder\'s social initiatives to help organisations strengthen and document their CSR programmes.',
    longDesc: 'The allied social activities of our founder encourage us to support CSR activities. If any organization wants the services of R Square to strengthen their CSR activity and wants appropriate recognition of the company in the respective sector, they should approach R Square.\n\nWe help corporates meet their CSR obligations through community skill development, education support, and environment initiatives — with complete documentation for compliance.',
    icon: 'Leaf',
    features: ['CSR Programme Planning', 'Community Skill Development', 'Education Support Initiatives', 'Impact Reporting & Documentation', 'Section 135 Compliance'],
    targetAudience: ['Listed Companies', 'PSUs', 'Large Private Companies']
  },
  {
    id: '20', slug: 'institutional-collaboration',
    title: 'Collaborating with Various Institutions',
    category: 'Advisory',
    shortDesc: 'MoU-based partnerships with 30+ universities, colleges, and institutions across Gujarat and India.',
    longDesc: 'We have signed MoUs with renowned institutions, colleges and Universities for various educational and placement programs.\n\nThe list of institutes with whom we are working in various capacities & roles includes: IIM Udaipur; Silver Oak University, Ahmedabad (all institutes under the University); Sardarkrushinagar Dantiwada Agricultural University, Dantivada, Gujarat; Society For Creation of Opportunities Through Proficiency In English – SCOPE; Knowledge Consortium of Gujarat; Hk School of Foreign Languages & Hkumars Education Institute, Ahmedabad; All the Government Colleges & Schools of Gujarat; Gujarat Disaster Management Institute, Gandhinagar; The M S University of Baroda, Vadodara; Nirma University, Ahmedabad; Gujarat University, Ahmedabad; GLS University, Ahmedabad; Ahmedabad Management Association, Ahmedabad; Sardar Patel Institute of Public Administration, Ahmedabad; Computer Society of India, Ahmedabad; Sardar Patel Institute of Economic & Social Research, Ahmedabad; Prakshal IT Academy, Ahmedabad; Sardar Patel College of Pharmacy; Sardar Patel College of Engineering; Sardar Patel College of Administration & Management; Sardar Patel College of Education; Sardar Patel College of Applied Science; Sardar Patel College of Commerce; Balaji College of Paramedical; Balaji College of Law; Balaji College of Physiotherapy; Balaji College of Nursing (Guj. Nursing Council); Tirupati School of Nursing (Guj. Nursing Council); Tirupati Industrial Training Institute, Vadodara; My Shanen School (GSEB), Vadodara; Sharda Mandir English Medium School (GSEB), Vadodara; Gujarat Refinery School (GSEB), Vadodara; Atmiya Vidyalay, Vadodara; Shanen School (CBSE), Vadodara; My Shanen Pre-School, Vadodara; Sarvamangal School, Vadodara.',
    icon: 'Building2',
    features: ['MoU Facilitation', 'Campus Placement Drives', 'Guest Lecture Coordination', 'Industry Advisory Board Participation', '30+ Institutional Partnerships'],
    targetAudience: ['Universities', 'Colleges', 'Industry Associations', 'Government Bodies']
  },
  {
    id: '21', slug: 'cultural-activities',
    title: 'Cultural Activities (Musical Programs, Films, Serials, Drama)',
    category: 'Specialty',
    shortDesc: 'Providing artists and supporting cultural activities at schools, colleges, and in the broader community.',
    longDesc: 'R Square is an HR company having founders with a versatile background. With numerous contacts, R Square is sometimes requested to provide artists from different areas like music, theater, serials and films. During providing such service, R Square in association with extraordinary personalities from this industry initiated a new venture of supporting Cultural Activities at Schools, Colleges and in general.',
    icon: 'Music',
    features: ['Artist Sourcing & Management', 'Musical Events & Programs', 'Film & Serial Production Support', 'Gujarati Drama & Theatre', 'Cultural Activities at Schools & Colleges'],
    targetAudience: ['Artists', 'Cultural Organisations', 'Schools & Colleges', 'Event Sponsors', 'Media Houses']
  },
  {
    id: '22', slug: 'it-consultancy',
    title: 'IT Consultancy & Solutions',
    category: 'IT & Digital',
    shortDesc: 'Over 45 years of IT leadership — ERP, MIS, Business Applications, and IT manpower solutions.',
    longDesc: 'The founder of R Square, Mr. S N Rao, is having more than 45 years of experience in the development and implementation of IT solutions at various organisations. R Square also gets assignments for providing IT manpower to various IT companies. So, the combination of consultation in IT, development of ERP/MIS and successful implementation by providing appropriate training and change management put together lead R Square in the field of IT also.\n\nMr. Rao is expert in development and implementation of Business Applications, MIS, ERP, Logistics & Supply Chain Management, and Human Resource Management System covering framing HR strategy, HR Policies, manpower planning, recruitment, employee life cycle and legal compliance. Mr. Rao is recognized for consistent success in developing systems, processes and procedures to streamline corporate operations, increase revenue, decrease cost and enhance profit.',
    icon: 'Monitor',
    features: ['ERP / MIS / DSS Development', 'IT Manpower Supply', 'Business Application Implementation', 'Change Management & Training', 'IT Audit & Advisory'],
    targetAudience: ['All Organisations', 'HR Tech Buyers', 'IT Companies Needing Manpower', 'Digital-First Companies']
  }
];

export const serviceCategories = [
  'HR Solutions', 'Recruitment', 'Compliance & Legal',
  'Training & Development', 'Advisory', 'IT & Digital', 'Specialty'
] as const;
