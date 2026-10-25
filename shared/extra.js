/* Mock data for the HR and Manager portals. */
export const extraData = () => ({
  // One row per employee per cycle. HR only reviews monthly/quarterly; hike is annual-only.
  hrAppr: [
    { id: 1, emp: 'Arjun Sharma', dept: 'Engineering', cycle: 'Monthly', period: 'Jun 2025', submitted: true, self: 4.2, manager: 4.4, hrRating: 0, hrRemark: '', status: 'Submitted' },
    { id: 2, emp: 'Meera Iyer', dept: 'Design', cycle: 'Monthly', period: 'Jun 2025', submitted: true, self: 4.0, manager: 4.3, hrRating: 4.2, hrRemark: 'Consistent delivery.', status: 'Reviewed' },
    { id: 3, emp: 'Sneha Joshi', dept: 'Analytics', cycle: 'Monthly', period: 'Jun 2025', submitted: false, self: 0, manager: 0, hrRating: 0, hrRemark: '', status: 'Not submitted' },
    { id: 4, emp: 'Divya Pillai', dept: 'Sales', cycle: 'Monthly', period: 'Jun 2025', submitted: true, self: 3.8, manager: 4.0, hrRating: 0, hrRemark: '', status: 'Submitted' },
    { id: 5, emp: 'Arjun Sharma', dept: 'Engineering', cycle: 'Quarterly', period: 'Q1 FY 2025-26', submitted: true, self: 4.2, manager: 4.3, hrRating: 4.3, hrRemark: 'Strong quarter.', status: 'Reviewed' },
    { id: 6, emp: 'Meera Iyer', dept: 'Design', cycle: 'Quarterly', period: 'Q1 FY 2025-26', submitted: true, self: 4.1, manager: 4.2, hrRating: 0, hrRemark: '', status: 'Submitted' },
    { id: 7, emp: 'Sneha Joshi', dept: 'Analytics', cycle: 'Quarterly', period: 'Q1 FY 2025-26', submitted: true, self: 3.5, manager: 3.6, hrRating: 0, hrRemark: '', status: 'Submitted' },
    { id: 8, emp: 'Arjun Sharma', dept: 'Engineering', cycle: 'Annual', period: 'FY 2024-25', submitted: true, self: 4.3, manager: 4.4, hrRating: 4.4, hrRemark: 'Audit complete.', hike: 12, status: 'Audited', released: false },
    { id: 9, emp: 'Meera Iyer', dept: 'Design', cycle: 'Annual', period: 'FY 2024-25', submitted: true, self: 4.1, manager: 4.3, hrRating: 0, hrRemark: '', hike: 0, status: 'Submitted', released: false },
    { id: 10, emp: 'Divya Pillai', dept: 'Sales', cycle: 'Annual', period: 'FY 2024-25', submitted: true, self: 3.9, manager: 4.0, hrRating: 4.0, hrRemark: 'Meets expectations.', hike: 8, status: 'Released', released: true },
  ],
  openings: [
    { id: 1, role: 'Senior Backend Engineer', dept: 'Engineering', location: 'Bengaluru', openings: 2, status: 'Open' },
    { id: 2, role: 'Product Designer', dept: 'Design', location: 'Remote', openings: 1, status: 'Open' },
    { id: 3, role: 'Sales Associate', dept: 'Sales', location: 'Mumbai', openings: 3, status: 'On hold' },
  ],
  candidates: [
    { id: 1, name: 'Ananya Rao', role: 'Senior Backend Engineer', stage: 'Interview', exp: '6 yrs' },
    { id: 2, name: 'Karthik Menon', role: 'Senior Backend Engineer', stage: 'Screening', exp: '5 yrs' },
    { id: 3, name: 'Ishita Das', role: 'Product Designer', stage: 'Offer', exp: '4 yrs' },
    { id: 4, name: 'Rahul Verma', role: 'Sales Associate', stage: 'Applied', exp: '2 yrs' },
    { id: 5, name: 'Pooja Nair', role: 'Product Designer', stage: 'Interview', exp: '3 yrs' },
  ],
  teamLeaves: [
    { id: 1, emp: 'Meera Iyer', type: 'Casual Leave', from: '2025-07-02', to: '2025-07-03', days: 2, status: 'Pending' },
    { id: 2, emp: 'Arjun Sharma', type: 'Work From Home', from: '2025-07-08', to: '2025-07-08', days: 1, status: 'Pending' },
    { id: 3, emp: 'Sneha Joshi', type: 'Sick Leave', from: '2025-06-24', to: '2025-06-25', days: 2, status: 'Approved' },
  ],
  mGoals: [
    { id: 1, title: 'Reduce API latency by 30%', owner: 'Priya Menon', progress: 72, tasks: [
      { id: 1, title: 'Profile slow checkout queries', assignee: 'Arjun Sharma', state: 'Submitted', rating: 0 },
      { id: 2, title: 'Add caching layer to /orders', assignee: 'Meera Iyer', state: 'Rated', rating: 4.5 },
    ] },
    { id: 2, title: 'Ship self-service onboarding', owner: 'Priya Menon', progress: 40, tasks: [
      { id: 3, title: 'Draft onboarding wireframes', assignee: 'Meera Iyer', state: 'In progress', rating: 0 },
    ] },
  ],
  mAppr: [
    { id: 1, emp: 'Arjun Sharma', period: 'Jun 2025', self: 4.2, note: 'Closed the latency work early.', rating: 0, remark: '', status: 'Pending' },
    { id: 2, emp: 'Meera Iyer', period: 'Jun 2025', self: 4.0, note: 'Wireframes done, design system updates.', rating: 4.3, remark: 'Great collaboration.', status: 'Rated' },
  ],
  policyAck: [
    { id: 1, title: 'Code of Conduct', version: 'v3.2', ack: 92, status: 'Published' },
    { id: 2, title: 'Information Security Policy', version: 'v2.0', ack: 78, status: 'Published' },
    { id: 3, title: 'Remote Work Guidelines', version: 'v1.4', ack: 41, status: 'Published' },
  ],
});
