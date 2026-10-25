/* Mock data. Everything lives in memory; reloading the page resets it. */
import { extraData } from './extra.js';

export const USERS = {
  hr: { name: 'Rohit Gupta', title: 'HR Business Partner', dept: 'People', company: 'Acme Corp', role: 'hr' },
  manager: { name: 'Priya Menon', title: 'Engineering Manager', dept: 'Engineering', company: 'Acme Corp', role: 'manager' },
  employee: { name: 'Arjun Sharma', title: 'Senior Engineer', dept: 'Engineering', company: 'Acme Corp', role: 'employee' },
  leadership: { name: 'Kavitha Rao', title: 'Chief People Officer', dept: 'Leadership', company: 'Acme Corp', role: 'leadership' },
  admin: { name: 'Platform Admin', title: 'Super Admin', dept: 'Platform', company: 'Karyam', role: 'super_admin' },
};

export const ROLES = [
  { id: 'employee', label: 'Employee', desc: 'Goals, tasks, leave, appraisal, feedback and company hub.', icon: 'user', home: '/uer/dashboard' },
  { id: 'manager', label: 'Manager', desc: 'Team goals, task ratings, leave approvals and appraisal ratings.', icon: 'users', home: '/mgr/dashboard' },
  { id: 'hr', label: 'HR', desc: 'Employees, leave, appraisal tracking, recruitment and policies.', icon: 'id', home: '/hr/dashboard' },
  { id: 'leadership', label: 'Leadership', desc: 'Executive overview, team performance, reports and records.', icon: 'award', home: '/lead/overview' },
  { id: 'admin', label: 'Super Admin', desc: 'Companies, colleges, users, verification, revenue, settings.', icon: 'shield', home: '/admin/dashboard' },
];

const EMP = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid', title: 'My Dashboard', sub: 'Your performance at a glance' },
  { id: 'goals', label: 'Goals', icon: 'target', title: 'Goals', sub: 'Plan, track and rate your objectives' },
  { id: 'tasks', label: 'Task Board', icon: 'kanban', title: 'Task Board', sub: 'Move work through your pipeline' },
  { id: 'leave', label: 'Leave & WFH', icon: 'calendar', title: 'Leave & WFH', sub: 'Balances, requests and history' },
  { id: 'policies', label: 'Policy Compliance', icon: 'shield', title: 'Policy Compliance', sub: 'Read and acknowledge company policies' },
  { id: 'appraisal', label: 'Appraisal', icon: 'award', title: 'Appraisal', sub: 'Monthly, quarterly and annual reviews' },
  { id: 'feedback', label: '360 Feedback', icon: 'message', title: '360° Feedback', sub: 'What peers and managers say about you' },
  { id: 'hub', label: 'Company Hub', icon: 'users', title: 'Company Hub', sub: 'Team, news and gallery' },
  { id: 'cxo', label: 'CXO Connect', icon: 'send', title: 'CXO Connect', sub: 'Talk directly to leadership' },
];
const MGR = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid', title: 'Manager Dashboard', sub: 'Your team at a glance' },
  { id: 'team', label: 'My Team', icon: 'users', title: 'My Team', sub: 'Direct reports and ratings' },
  { id: 'goals', label: 'Goals & Tasks', icon: 'target', title: 'Goals & Tasks', sub: 'Create goals, assign tasks and rate them' },
  { id: 'approvals', label: 'Approvals', icon: 'calendar', title: 'Approvals', sub: 'Team leave and WFH requests' },
  { id: 'appraisals', label: 'Team Appraisals', icon: 'award', title: 'Team Appraisals', sub: 'Rate submitted self-appraisals' },
];
const HR = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid', title: 'HR Dashboard', sub: 'People operations overview' },
  { id: 'employees', label: 'Employees', icon: 'users', title: 'Employees', sub: 'Directory and onboarding' },
  { id: 'leave', label: 'Leave Approvals', icon: 'calendar', title: 'Leave Approvals', sub: 'HR-stage approvals for leave and WFH' },
  { id: 'appraisals', label: 'Appraisal Tracker', icon: 'award', title: 'Appraisal Tracker', sub: 'Monthly, quarterly and annual cycles' },
  { id: 'recruitment', label: 'Recruitment', icon: 'briefcase', title: 'Recruitment', sub: 'Openings and candidate pipeline' },
  { id: 'policies', label: 'Policies', icon: 'shield', title: 'Policies', sub: 'Publish and track acknowledgement' },
  { id: 'disputes', label: 'Disputes', icon: 'alert', title: 'Disputes', sub: 'Review and resolve employee disputes' },
];
const LEAD = [
  { id: 'overview', label: 'Executive Overview', icon: 'chart', title: 'Executive Overview', sub: 'Organisation-wide performance and risk', base: '/lead' },
  { id: 'team', label: 'Team', icon: 'users', title: 'Team', sub: 'Everyone reporting into your organisation', base: '/lead' },
  { id: 'reports', label: 'Reports', icon: 'file', title: 'Reports', sub: 'Trends, averages and downloads', base: '/lead' },
  { id: 'registry', label: 'Registry Search', icon: 'search', title: 'Registry Search', sub: 'Verify candidates by email, PAN or name', base: '/lead' },
  { id: 'records', label: 'Employee Records', icon: 'id', title: 'Employee Records', sub: 'Active, ex-employees and non-joiners', base: '/lead' },
  { id: 'disputes', label: 'Dispute Center', icon: 'alert', title: 'Dispute Center', sub: 'Review and resolve employee disputes', base: '/lead' },
  { id: 'sublogins', label: 'Sub-Logins', icon: 'key', title: 'Sub-Logins', sub: 'Seats and permissions for your delegates', base: '/lead' },
];
const ADM = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid', title: 'Platform Overview', sub: 'Everything happening across the platform' },
  { id: 'companies', label: 'Companies', icon: 'building', title: 'Company Management', sub: 'Tenants, plans and revenue' },
  { id: 'colleges', label: 'Colleges', icon: 'grad', title: 'College Management', sub: 'Institution tenants' },
  { id: 'users', label: 'Users', icon: 'users', title: 'User Management', sub: 'All platform users' },
  { id: 'verification', label: 'Verification', icon: 'shield', title: 'Verification Center', sub: 'Review Blue, Green & Grey tick requests' },
  { id: 'analytics', label: 'Analytics', icon: 'chart', title: 'Analytics Center', sub: 'Growth and engagement metrics' },
  { id: 'revenue', label: 'Revenue', icon: 'dollar', title: 'Revenue Dashboard', sub: 'Financial metrics and subscriptions' },
  { id: 'settings', label: 'Settings', icon: 'settings', title: 'Platform Settings', sub: 'Feature flags, automation & support' },
];

export function navFor(role) {
  const emp = EMP.map(n => ({ ...n, to: '/uer/' + n.id }));
  if (role === 'employee') return [{ group: 'Workspace', items: emp }];
  if (role === 'manager') return [
    { group: 'Management', items: MGR.map(n => ({ ...n, to: '/mgr/' + n.id })) },
    { group: 'My workspace', items: emp },
  ];
  if (role === 'hr') return [
    { group: 'People ops', items: HR.map(n => ({ ...n, to: '/hr/' + n.id })) },
    { group: 'My workspace', items: emp },
  ];
  if (role === 'leadership') return [
    { group: 'Executive', items: LEAD.map(n => ({ ...n, to: '/lead/' + n.id })) },
    { group: 'My workspace', items: emp },
  ];
  return [{ group: 'Platform', items: ADM.map(n => ({ ...n, to: '/admin/' + n.id })) }];
}

export const flatNav = role => navFor(role).flatMap(g => g.items);

export const initialData = () => ({
  ...extraData(),
  goals: [
    { id: 1, title: 'Reduce API latency by 30%', category: 'Technical', priority: 'High', weight: 30, progress: 72, status: 'Approved', fy: 'FY 2025-26', rating: 4.5, assignedBy: 'Priya Menon', target: '2026-03-31', visibility: 'Public' },
    { id: 2, title: 'Mentor two junior engineers', category: 'People', priority: 'Medium', weight: 15, progress: 55, status: 'Approved', fy: 'FY 2025-26', rating: 0, assignedBy: 'Self Created', target: '2026-03-31', visibility: 'Public' },
    { id: 3, title: 'Ship self-service onboarding flow', category: 'Product', priority: 'High', weight: 25, progress: 40, status: 'Draft', fy: 'FY 2025-26', rating: 0, assignedBy: 'Self Created', target: '2026-02-28', visibility: 'Private' },
    { id: 4, title: 'Migrate legacy billing service', category: 'Technical', priority: 'Medium', weight: 20, progress: 100, status: 'Completed', fy: 'FY 2024-25', rating: 4.2, assignedBy: 'Priya Menon', target: '2025-03-31', visibility: 'Public' },
    { id: 5, title: 'Internal hackathon organiser', category: 'Culture', priority: 'Low', weight: 10, progress: 100, status: 'Archived', fy: 'FY 2024-25', rating: 3.8, assignedBy: 'Self Created', target: '2025-01-31', visibility: 'Public' },
  ],
  // col: assigned | high | week | hold | review | done | private. review = submitted for goal-owner approval; rating set once approved.
  tasks: [
    { id: 1, title: 'Profile slow checkout queries', goalId: 1, assignee: 'Arjun Sharma', priority: 'High', due: '2026-01-20', col: 'high', tags: 'backend', rating: 0 },
    { id: 2, title: 'Draft onboarding wireframes', goalId: 3, assignee: 'Arjun Sharma', priority: 'Medium', due: '2026-01-22', col: 'week', tags: 'design', rating: 0 },
    { id: 3, title: 'Review PR #482 for Meera', goalId: 2, assignee: 'Arjun Sharma', priority: 'Low', due: '2026-01-18', col: 'review', tags: 'mentoring', rating: 0 },
    { id: 4, title: 'Waiting on DevOps for staging access', goalId: 1, assignee: 'Arjun Sharma', priority: 'High', due: '2026-01-25', col: 'hold', tags: 'devops', rating: 0 },
    { id: 5, title: 'Add caching layer to /orders', goalId: 1, assignee: 'Arjun Sharma', priority: 'High', due: '2026-02-10', col: 'assigned', tags: 'backend', rating: 0 },
    { id: 6, title: 'Quarterly mentoring check-in notes', goalId: 2, assignee: 'Arjun Sharma', priority: 'Low', due: '2025-12-30', col: 'done', tags: 'mentoring', rating: 4 },
    { id: 7, title: 'Billing migration cut-over', goalId: 4, assignee: 'Arjun Sharma', priority: 'High', due: '2025-03-20', col: 'done', tags: 'billing', rating: 5 },
    { id: 8, title: 'Design system audit', goalId: 3, assignee: 'Meera Iyer', priority: 'Medium', due: '2026-01-30', col: 'review', tags: 'design', rating: 0 },
  ],
  leaves: [
    { id: 1, type: 'Casual Leave', from: '2025-06-12', to: '2025-06-13', days: 2, manager: 'Approved', hr: 'Approved', overall: 'Approved' },
    { id: 2, type: 'Work From Home', from: '2025-06-20', to: '2025-06-20', days: 1, manager: 'Approved', hr: 'Pending', overall: 'Pending' },
    { id: 3, type: 'Sick Leave', from: '2025-05-02', to: '2025-05-03', days: 2, manager: 'Approved', hr: 'Approved', overall: 'Approved' },
    { id: 4, type: 'Earned Leave', from: '2025-04-14', to: '2025-04-18', days: 5, manager: 'Rejected', hr: 'Pending', overall: 'Rejected' },
  ],
  balances: [
    { type: 'Casual Leave', left: 7, total: 12 }, { type: 'Sick Leave', left: 8, total: 10 },
    { type: 'Earned Leave', left: 14, total: 18 }, { type: 'Work From Home', left: 6, total: 12 },
  ],
  policies: [
    { id: 1, title: 'Code of Conduct', version: 'v3.2', updated: 'Apr 2025', status: 'Signed', body: 'All employees are expected to act with integrity, respect colleagues, avoid conflicts of interest and report violations through the ethics line. Harassment and discrimination of any form is prohibited.' },
    { id: 2, title: 'Information Security Policy', version: 'v2.0', updated: 'Mar 2025', status: 'Signed', body: 'Use strong, unique passwords with MFA. Do not share credentials. Report suspected phishing or data loss immediately to security@company.com. Company data must stay on approved systems.' },
    { id: 3, title: 'Remote Work Guidelines', version: 'v1.4', updated: 'Jun 2025', status: 'Pending', body: 'Remote days are agreed with your manager. Core hours are 11:00-16:00 IST. Employees must be reachable on chat and attend scheduled meetings with video on where practical.' },
    { id: 4, title: 'Anti-Harassment (POSH)', version: 'v2.1', updated: 'Jan 2025', status: 'Pending', body: 'The company maintains a zero-tolerance approach. Complaints go to the Internal Committee, are handled confidentially, and no retaliation is permitted against complainants.' },
  ],
  appraisals: [
    { id: 1, cycle: 'Monthly', period: 'Jun 2025', status: 'Pending', self: 0, manager: 0, note: '', mNote: '' },
    { id: 2, cycle: 'Quarterly', period: 'Q1 FY 2025-26', status: 'Completed', self: 4.2, manager: 4.3, note: 'Delivered the latency programme ahead of plan and onboarded two juniors.', mNote: 'Strong quarter. Keep driving cross-team alignment.' },
    { id: 3, cycle: 'Annual', period: 'FY 2024-25', status: 'Draft', self: 0, manager: 0, note: '', mNote: '' },
  ],
  feedback: [
    { id: 1, from: 'Priya Menon', role: 'Manager', rating: 4.6, strengths: 'Ownership, technical depth', growth: 'Delegate more', text: 'Arjun consistently raises the bar on reliability.' },
    { id: 2, from: 'Meera Iyer', role: 'Peer', rating: 4.3, strengths: 'Clear communication', growth: 'Share context earlier', text: 'Always happy to unblock the team.' },
    { id: 3, from: 'Rahul Das', role: 'Direct report', rating: 4.8, strengths: 'Mentoring, patience', growth: 'More 1:1 time', text: 'Learned more in 3 months than the whole last year.' },
  ],
  feedbackReq: [
    { id: 1, from: 'Sneha Joshi', role: 'Peer', due: 'Jun 28', done: false },
    { id: 2, from: 'Vikram Nair', role: 'Skip-level', due: 'Jul 02', done: false },
  ],
  team: [
    { id: 1, name: 'Priya Menon', title: 'Engineering Manager', dept: 'Engineering', email: 'priya@acmecorp.com', grade: 'L5', type: 'Permanent', rating: 4.8, status: 'Active', joined: '2019-05-12', manager: 'Vikram Nair', location: 'Bengaluru', skills: 'Leadership, Architecture, Mentoring' },
    { id: 2, name: 'Arjun Sharma', title: 'Senior Engineer', dept: 'Engineering', email: 'arjun@acmecorp.com', grade: 'L4', type: 'Permanent', rating: 4.2, status: 'Active', joined: '2021-03-15', manager: 'Priya Menon', location: 'Bengaluru', skills: 'Node.js, System design, AWS' },
    { id: 3, name: 'Meera Iyer', title: 'Product Designer', dept: 'Design', email: 'meera@acmecorp.com', grade: 'L3', type: 'Permanent', rating: 4.5, status: 'Active', joined: '2022-07-01', manager: 'Priya Menon', location: 'Pune', skills: 'Figma, UX research, Prototyping' },
    { id: 4, name: 'Ravi Teja', title: 'Backend Engineer', dept: 'Engineering', email: 'ravi@acmecorp.com', grade: 'L3', type: 'Contractual', rating: 3.8, status: 'Active', joined: '2022-01-10', manager: 'Priya Menon', location: 'Hyderabad', skills: 'Go, PostgreSQL, Kafka' },
    { id: 5, name: 'Ananya Singh', title: 'Data Analyst', dept: 'Analytics', email: 'ananya@acmecorp.com', grade: 'L3', type: 'Permanent', rating: 4.1, status: 'Active', joined: '2023-03-20', manager: 'Priya Menon', location: 'Mumbai', skills: 'SQL, Python, Tableau' },
    { id: 6, name: 'Kiran Reddy', title: 'DevOps Engineer', dept: 'Engineering', email: 'kiran@acmecorp.com', grade: 'L4', type: 'Contractual', rating: 3.5, status: 'Resigned', joined: '2020-11-01', manager: 'Priya Menon', location: 'Bengaluru', skills: 'Kubernetes, Terraform, CI/CD' },
    { id: 7, name: 'Rohit Gupta', title: 'HR Business Partner', dept: 'People', email: 'rohit@acmecorp.com', grade: 'L5', type: 'Permanent', rating: 4.4, status: 'Active', joined: '2020-08-20', manager: 'Kavitha Rao', location: 'Mumbai', skills: 'Talent, Policy, Employee relations' },
    { id: 8, name: 'Vikram Nair', title: 'CEO', dept: 'Leadership', email: 'vikram@acmecorp.com', grade: 'L7', type: 'Permanent', rating: 4.9, status: 'Active', joined: '2015-01-15', manager: 'Board', location: 'Mumbai', skills: 'Strategy, Fundraising' },
    { id: 9, name: 'Divya Pillai', title: 'Sales Lead', dept: 'Sales', email: 'divya@acmecorp.com', grade: 'L4', type: 'Permanent', rating: 4.0, status: 'Active', joined: '2021-09-06', manager: 'Kavitha Rao', location: 'Delhi', skills: 'Enterprise sales, Negotiation' },
    { id: 10, name: 'Sneha Joshi', title: 'Data Analyst', dept: 'Analytics', email: 'sneha@acmecorp.com', grade: 'L3', type: 'Contractual', rating: 3.6, status: 'On notice', joined: '2023-06-12', manager: 'Ananya Singh', location: 'Mumbai', skills: 'Excel, Power BI' },
  ],
  news: [
    { id: 1, tag: 'Announcement', title: 'Q2 all-hands on 28 June', text: 'Join leadership for results, roadmap and an open Q&A.' },
    { id: 2, tag: 'Recognition', title: 'Platform team wins Innovator of the Quarter', text: 'Congratulations to the entire platform engineering group.' },
    { id: 3, tag: 'Event', title: 'Wellness week starts Monday', text: 'Yoga, health checks and mental wellbeing sessions.' },
  ],
  gallery: ['Offsite Goa', 'Diwali 2024', 'Hackathon', 'Town Hall', 'Women in Tech', 'Charity Run'],
  cxo: [
    { id: 1, to: 'Kavitha Rao', subject: 'Request for learning budget', text: 'Could we get an annual learning budget for certifications?', status: 'Replied', reply: 'Approved in principle. Please share a plan with HR.' },
    { id: 2, to: 'Kavitha Rao', subject: 'Hybrid policy clarification', text: 'Is the Wednesday in-office rule mandatory?', status: 'Open', reply: '' },
  ],
  disputes: [
    { id: 'D-101', employee: 'Sneha Joshi', subject: 'Appraisal rating disagreement', raised: 'Jun 02', status: 'Open', priority: 'High' },
    { id: 'D-100', employee: 'Rohit Gupta', subject: 'Incorrect leave deduction', raised: 'May 28', status: 'In review', priority: 'Medium' },
    { id: 'D-099', employee: 'Meera Iyer', subject: 'Relieving letter delay', raised: 'May 20', status: 'Resolved', priority: 'Low' },
  ],
  sublogins: [
    { id: 1, name: 'Anita Bose', email: 'anita@acmecorp.com', perms: ['Reports', 'Team'], active: true },
    { id: 2, name: 'Karthik N', email: 'karthik@acmecorp.com', perms: ['Records'], active: true },
    { id: 3, name: 'Leela S', email: 'leela@acmecorp.com', perms: ['Reports', 'Disputes'], active: false },
  ],
  records: [
    { id: 1, name: 'Aditya Rao', email: 'aditya@acmecorp.com', pan: 'ABCPR1234K', kind: 'Active', tenure: '3y 2m', conduct: 'Good' },
    { id: 2, name: 'Neha Kulkarni', email: 'neha.k@gmail.com', pan: 'BHKPK5678L', kind: 'Ex-Employee', tenure: '2y 8m', conduct: 'Good' },
    { id: 3, name: 'Imran Khan', email: 'imran@gmail.com', pan: 'CDEPK9012M', kind: 'Non-Joiner', tenure: '-', conduct: 'Flagged' },
    { id: 4, name: 'Pooja Shetty', email: 'pooja@acmecorp.com', pan: 'DEFPS3456N', kind: 'Active', tenure: '1y 1m', conduct: 'Good' },
  ],
  companies: [
    { id: 1, name: 'Acme Corp', plan: 'Enterprise', employees: 1240, mrr: 18200, growth: 12, status: 'Active' },
    { id: 2, name: 'BharatManuf Ltd', plan: 'Professional', employees: 860, mrr: 9400, growth: 8, status: 'Active' },
    { id: 3, name: 'GovtCorp India', plan: 'Enterprise', employees: 2100, mrr: 15600, growth: 5, status: 'Active' },
    { id: 4, name: 'Fintech Pulse', plan: 'Professional', employees: 140, mrr: 0, growth: 0, status: 'Trial' },
    { id: 5, name: 'RetailGiant India', plan: 'Enterprise', employees: 1800, mrr: 14200, growth: 14, status: 'Active' },
    { id: 6, name: 'HealthPlus Systems', plan: 'Professional', employees: 420, mrr: 6100, growth: 9, status: 'Active' },
    { id: 7, name: 'EduTech Ventures', plan: 'Starter', employees: 95, mrr: 1900, growth: 22, status: 'Active' },
  ],
  colleges: [
    { id: 1, name: 'MIT Manipal', loc: 'Manipal, KA', plan: 'Premium', students: 4200, depts: 8, placement: 92, ctc: 14, revenue: '$48,000/yr', status: 'Active' },
    { id: 2, name: 'BITS Pilani', loc: 'Pilani, RJ', plan: 'Premium', students: 3800, depts: 10, placement: 96, ctc: 22, revenue: '$48,000/yr', status: 'Active' },
    { id: 3, name: 'NIT Trichy', loc: 'Trichy, TN', plan: 'Standard', students: 5100, depts: 12, placement: 89, ctc: 12, revenue: '$24,000/yr', status: 'Active' },
    { id: 4, name: 'SRM University', loc: 'Chennai, TN', plan: 'Basic', students: 8900, depts: 15, placement: 78, ctc: 8, revenue: 'Trial', status: 'Trial' },
    { id: 5, name: 'VIT Vellore', loc: 'Vellore, TN', plan: 'Standard', students: 7200, depts: 11, placement: 85, ctc: 10, revenue: '$24,000/yr', status: 'Active' },
    { id: 6, name: 'Amity University', loc: 'Noida, UP', plan: 'Basic', students: 6500, depts: 14, placement: 72, ctc: 7, revenue: '$12,000/yr', status: 'Active' },
  ],
  users: [
    { id: 1, name: 'Arjun Sharma', email: 'arjun@acmecorp.com', role: 'employee', product: 'UER', company: 'Acme Corp', verified: '', last: '2h ago', status: 'Active' },
    { id: 2, name: 'Deepa Krishnan', email: 'deepa@uhr.com', role: 'hr_professional', product: 'UHR', company: '-', verified: 'Blue', last: '5m ago', status: 'Active' },
    { id: 3, name: 'Sneha Patel', email: 'sneha@college.edu', role: 'student', product: 'USKEP', company: 'MIT Manipal', verified: 'Grey', last: '1h ago', status: 'Active' },
    { id: 4, name: 'Priya Menon', email: 'priya@acmecorp.com', role: 'manager', product: 'UER', company: 'Acme Corp', verified: '', last: '30m ago', status: 'Active' },
    { id: 5, name: 'TalentBridge Inc', email: 'contact@talentbridge.com', role: 'vendor', product: 'UHR', company: 'TalentBridge', verified: 'Green', last: '1d ago', status: 'Active' },
    { id: 6, name: 'Kavitha Rao', email: 'kavitha@acmecorp.com', role: 'leadership', product: 'UER', company: 'Acme Corp', verified: '', last: '3h ago', status: 'Active' },
    { id: 7, name: 'Rohit Gupta', email: 'rohit@acmecorp.com', role: 'hr', product: 'UER', company: 'Acme Corp', verified: '', last: '5d ago', status: 'Inactive' },
    { id: 8, name: 'Anil Kapoor', email: 'anil@mentor.com', role: 'mentor', product: 'USKEP', company: 'Google', verified: 'Blue', last: '2d ago', status: 'Active' },
  ],
  verifications: [
    { id: 1, name: 'Shruti Malhotra', tick: 'Blue', role: 'HR Director @ Microsoft', evidence: 'LinkedIn + Company Email', date: '2025-06-10', status: 'Pending' },
    { id: 2, name: 'HRTech Solutions', tick: 'Green', role: 'HR Software Vendor', evidence: 'GST Certificate + Website', date: '2025-06-09', status: 'Pending' },
    { id: 3, name: 'Rahul Kumar', tick: 'Grey', role: 'Student @ NIT Trichy', evidence: 'College ID + Admit Card', date: '2025-06-08', status: 'Pending' },
    { id: 4, name: 'Anita Bose', tick: 'Blue', role: 'L&D Manager @ HDFC', evidence: 'LinkedIn + Work Email', date: '2025-06-07', status: 'Approved' },
    { id: 5, name: 'Rajesh Vendors', tick: 'Green', role: 'Payroll Software Co.', evidence: 'MCA Registration', date: '2025-06-06', status: 'Rejected' },
  ],
  flags: [
    { id: 1, name: 'AI Goal Suggestions', product: 'UER', desc: 'ML-powered goal recommendations', on: true },
    { id: 2, name: 'Video Reels', product: 'UHR', desc: 'Short-form video in HR feed', on: false },
    { id: 3, name: 'Auto-verification', product: 'UHR', desc: 'Auto-approve grey tick for .edu emails', on: true },
    { id: 4, name: 'Smart Mentor Match', product: 'USKEP', desc: 'AI student-mentor pairing', on: false },
    { id: 5, name: 'CXO SLA Alerts', product: 'UER', desc: 'Auto-escalate after 5 days no reply', on: true },
  ],
  tickets: [
    { id: 1042, title: 'Appraisal form not submitting', org: 'Acme Corp', ago: '30m ago', sev: 'bad', assignee: '' },
    { id: 1041, title: 'CSV export broken', org: 'MIT Manipal', ago: '2h ago', sev: 'warn', assignee: '' },
    { id: 1040, title: 'Billing discrepancy', org: 'GovtCorp', ago: '5h ago', sev: 'bad', assignee: '' },
  ],
});

export const CHART = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  trajectory: [3.6, 3.8, 3.9, 4.0, 4.1, 4.2],
  revenue: [118, 126, 139, 151, 176, 214],
  mrr: [38, 42, 48, 53, 60, 71.5],
  newC: [8, 12, 15, 11, 18, 22], churn: [2, 3, 2, 4, 2, 3],
  reviewCompletion: { Monthly: [72, 78, 81, 85, 88, 91], Quarterly: [64, 70, 75, 79, 84, 88], Annual: [50, 58, 66, 72, 80, 86] },
  growth: { UER: [3.2, 3.9, 4.4, 5.0, 5.6, 6.2], UHR: [6.1, 7.4, 8.6, 9.8, 10.9, 11.8], USKEP: [28, 33, 38, 43, 48, 52.3] },
  depts: ['Eng', 'Design', 'People', 'Sales', 'Ops'],
  deptAvg: [4.3, 4.1, 3.9, 4.0, 3.8], deptPrev: [4.1, 4.0, 3.8, 3.8, 3.9],
};
