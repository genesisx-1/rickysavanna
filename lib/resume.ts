export interface ExperienceItem {
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  summary: string
  highlights: string[]
}

export const profile = {
  name: 'Ricky Savanna',
  title: 'IT & Operations Coordinator / Full-Stack Builder',
  phone: '682-283-5943',
  email: 'rickysvna@gmail.com',
  site: 'rickysavanna.me',
  location: 'Arlington, TX',
  summary:
    'Operations, administrative, and IT support professional with 5 years of experience keeping businesses running smoothly. I run end-to-end operations for a seven-figure transportation company — payments, vehicle purchasing, user support — and I help build and maintain the in-house software it runs on.',
  longSummary:
    'I sit where business operations and software meet. On the operations side I handle payments, vendor and driver payouts, vehicle purchasing, account onboarding, and first-line IT support for 100+ people. On the build side I ship full-scale applications with agentic coding tools, replacing spreadsheets with real platforms that the whole team uses every day.',
}

export const experience: ExperienceItem[] = [
  {
    role: 'IT & Operations Coordinator',
    company: 'NTX Limo',
    location: 'Fort Worth, TX (Hybrid)',
    period: 'Jan 2025 – Present',
    current: true,
    summary:
      'Day-to-day operations for a seven-figure transportation company with a 130+ vehicle fleet, and the central point of contact for 100+ drivers, admin staff, partners, and affiliated sub-companies.',
    highlights: [
      'Manage company payments and finances — vendor and driver payouts, invoicing, settlement statements, and vehicle purchases made with company funds, from sourcing and negotiation through registration.',
      'Manage 30–40 fleet owner accounts end to end: account setup, onboarding, billing questions, and ongoing support.',
      'Serve as first-line IT and help desk support: troubleshoot system and account issues, administer user access and permissions, and maintain the operations database.',
      'Helped build and maintain the in-house software used across the sub-companies, replacing spreadsheet-based dispatch and revenue tracking and cutting recurring admin work for the whole team.',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'GenPX Inc.',
    location: 'Irving, TX (Remote)',
    period: 'Jan 2026 – Mar 2026',
    summary: 'Part-time, temporary engineering role in a Python back-end codebase.',
    highlights: [
      'Resolved assigned tickets in a Python back-end codebase, troubleshooting bugs and implementing fixes that were reviewed and merged by senior developers.',
      'Tested and documented changes, and participated in standups and code reviews to communicate progress and blockers.',
    ],
  },
  {
    role: 'Operations & Administrative Support',
    company: 'Dallas Fort Worth International Airport (DFW)',
    location: 'DFW Airport, TX',
    period: 'Jun 2024 – Dec 2024',
    summary: 'Scheduling, records, and expense tracking across multiple airport teams.',
    highlights: [
      'Managed employee schedules, hourly records, and departmental expenses across multiple teams in Excel, keeping payroll, staffing, and budget data accurate day to day.',
      'Logged daily flight operations data and reconciled expense reports, producing the spreadsheets and summaries cross-functional teams relied on to track efficiency and costs.',
    ],
  },
  {
    role: 'Campaign & Client Services Specialist',
    company: 'Wholesale Communication',
    location: 'Arlington, TX (Hybrid)',
    period: 'Sep 2021 – May 2024',
    summary: 'Owned 15–20 political and nonprofit client accounts from kickoff through delivery.',
    highlights: [
      'Main point of contact for 15–20 accounts, managing each from kickoff to delivery and consistently hitting tight election and event deadlines.',
      'Designed and ran automated voice and SMS outreach campaigns reaching tens of thousands of contacts each, refining messaging and timing to improve response rates.',
      'Pulled campaign performance data with SQL and delivered clear results reports that shaped client strategy for future campaigns.',
    ],
  },
]

export const education = {
  school: 'Tarrant County College',
  location: 'Arlington, TX',
  degree: 'Associate of Arts',
  period: '2024 – 2026',
}

export interface SkillGroup {
  category: string
  icon: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'AI & Agentic Engineering',
    icon: 'spark',
    items: ['Claude Code', 'Codex', 'Grok', 'Antigravity', 'n8n Automation', 'Agentic Workflows', 'Prompt Engineering', 'LLM Integrations'],
  },
  {
    category: 'Application Development',
    icon: 'code',
    items: ['TypeScript', 'JavaScript', 'Python', 'React', 'Next.js', 'Node.js', 'React Native', 'Three.js'],
  },
  {
    category: 'Data & Reporting',
    icon: 'chart',
    items: ['Advanced Excel', 'Pivot Tables & Lookups', 'SQL', 'PostgreSQL', 'Dashboards', 'KPI Reporting', 'Financial Tracking'],
  },
  {
    category: 'Operations & Admin',
    icon: 'ops',
    items: ['Payments & Payouts', 'Vehicle Purchasing', 'Invoicing & Billing', 'Account Onboarding', 'Scheduling', 'Records Management'],
  },
  {
    category: 'Client & User Support',
    icon: 'support',
    items: ['Help Desk Troubleshooting', 'Account Setup & Permissions', 'Issue Resolution', 'Stakeholder Communication', 'CRM Integrations'],
  },
  {
    category: 'Platforms & Tooling',
    icon: 'tools',
    items: ['Git', 'Twilio', 'Netlify', 'Supabase', 'Microsoft Office', 'Windows / macOS / Linux'],
  },
]

export interface Capability {
  title: string
  body: string
  icon: string
}

export const capabilities: Capability[] = [
  {
    title: 'Full-Scale Apps with Agentic Coding',
    icon: 'spark',
    body: 'I design and ship complete production applications — frontend, backend, database, deploy — driving agentic coding tools end to end instead of writing every line by hand.',
  },
  {
    title: 'AI Tooling I Actually Use',
    icon: 'ai',
    body: 'Claude Code, Codex, Grok, and Antigravity are part of my daily workflow. I know where each one is strong, how to scope work for them, and how to review what comes back.',
  },
  {
    title: 'Automation & n8n Workflows',
    icon: 'flow',
    body: 'I wire systems together with n8n and custom automation so the repetitive admin work — payouts, onboarding, reporting, notifications — runs itself.',
  },
  {
    title: 'CRM Integrations',
    icon: 'crm',
    body: 'Connecting CRMs to dispatch, billing, and reporting so customer and account data lives in one place instead of five spreadsheets.',
  },
  {
    title: 'Mobile App Development',
    icon: 'mobile',
    body: 'Cross-platform mobile apps with React Native and Expo — driver tools, owner portals, and customer-facing booking apps.',
  },
  {
    title: 'Business Operations',
    icon: 'ops',
    body: 'Payments, vendor and driver payouts, invoicing, settlement statements, vehicle purchasing, and fleet owner account management for a 130+ vehicle operation.',
  },
  {
    title: 'Administrative Work',
    icon: 'admin',
    body: 'Scheduling, records management, expense reconciliation, payroll data, and the reporting that cross-functional teams rely on day to day.',
  },
  {
    title: 'IT & Help Desk Support',
    icon: 'support',
    body: 'First-line technical support for 100+ users: account access and permissions, system troubleshooting, and explaining technical problems to non-technical people.',
  },
]

export interface Platform {
  name: string
  url: string
  domain: string
  tagline: string
  description: string
  stack: string[]
  accent: string
}

export const platforms: Platform[] = [
  {
    name: 'NTX Limo',
    url: 'https://ntxlimo.com',
    domain: 'ntxlimo.com',
    tagline: 'Booking & operations platform',
    description:
      'Customer booking and operations platform for a seven-figure transportation company — live revenue monitoring, account management, dispatch, and secure customer data handling.',
    stack: ['Next.js', 'PostgreSQL', 'Payments', 'Dispatch'],
    accent: '#6c5ce7',
  },
  {
    name: 'LXM Auto',
    url: 'https://lxmauto.com',
    domain: 'lxmauto.com',
    tagline: 'Dealership management software',
    description:
      'Admin dashboard for an auto dealership: vehicle inventory, client records, and transaction tracking in a single system.',
    stack: ['React', 'Inventory', 'CRM', 'Reporting'],
    accent: '#00cec9',
  },
  {
    name: 'NTX Fleet',
    url: 'https://ntxfleetss.app',
    domain: 'ntxfleetss.app',
    tagline: 'Investor & fleet owner portal',
    description:
      'Owner-facing portal where fleet investors track their vehicles, monitor rental performance, and see returns on their investment in real time.',
    stack: ['Next.js', 'Analytics', 'Auth', 'Realtime'],
    accent: '#a29bfe',
  },
  {
    name: 'MindMine',
    url: 'https://mindmine.app',
    domain: 'mindmine.app',
    tagline: 'AI product',
    description:
      'An AI-driven application built end to end with agentic coding — from product idea through deployed, usable product.',
    stack: ['AI', 'Next.js', 'Agentic Build'],
    accent: '#00b894',
  },
]

export const stats = [
  { value: '5+', label: 'Years in operations & IT' },
  { value: '130+', label: 'Vehicle fleet supported' },
  { value: '100+', label: 'Users supported daily' },
  { value: '4', label: 'Live platforms shipped' },
]
