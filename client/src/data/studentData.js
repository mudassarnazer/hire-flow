/**
 * HireFlow Mock Student Placement Data (Day 3 Demonstration)
 *
 * NOTE: This is mock data for UI prototyping and development purposes only.
 * No backend database or live authentication is connected.
 */

export const mockStudentData = {
  profile: {
    id: 'stu-1042',
    name: 'Priya Sharma',
    avatarInitials: 'PS',
    rollNumber: '2023CSB1042',
    department: 'Computer Science & Engineering',
    institution: 'National Institute of Technology',
    batch: 'Class of 2027 (Final Year)',
    cgpa: '8.94 / 10.0',
    eligibilityStatus: 'Tier-1 Eligible',
    eligibilityBadge: 'success',
    resumeScore: 92,
    skills: ['React', 'JavaScript', 'Node.js', 'Python', 'SQL', 'Algorithms'],
  },

  metrics: [
    {
      id: 'metric-1',
      label: 'Applications Submitted',
      value: '8',
      icon: '📄',
      trend: '+2 this week',
      accent: 'primary',
    },
    {
      id: 'metric-2',
      label: 'Under Review',
      value: '3',
      icon: '⏳',
      trend: '3 active processes',
      accent: 'accent',
    },
    {
      id: 'metric-3',
      label: 'Interviews Scheduled',
      value: '2',
      icon: '🎯',
      trend: 'Next: Tomorrow',
      accent: 'warning',
    },
    {
      id: 'metric-4',
      label: 'Offers Received',
      value: '1',
      icon: '🏆',
      trend: '₹10 LPA Offer',
      accent: 'success',
    },
  ],

  applications: [
    {
      id: 'app-01',
      company: 'Google',
      role: 'Software Developer Intern',
      location: 'Bengaluru',
      stipend: '₹30K/month',
      appliedDate: '04 Nov 2026',
      currentStage: 'Technical Round 2',
      status: 'Interview Scheduled',
      statusVariant: 'warning',
      nextAction: 'Tomorrow at 10:30 AM',
    },
    {
      id: 'app-02',
      company: 'Microsoft',
      role: 'Data Analyst Intern',
      location: 'Hyderabad',
      stipend: '₹25K/month',
      appliedDate: '29 Oct 2026',
      currentStage: 'Resume Screening Completed',
      status: 'Under Review',
      statusVariant: 'accent',
      nextAction: 'Awaiting Shortlist',
    },
    {
      id: 'app-03',
      company: 'Amazon',
      role: 'Cloud Support Associate',
      location: 'Remote',
      stipend: '₹8–12 LPA',
      appliedDate: '18 Oct 2026',
      currentStage: 'HR Final Completed',
      status: 'Offer Received',
      statusVariant: 'success',
      nextAction: 'Offer Letter Available',
    },
    {
      id: 'app-04',
      company: 'Uber',
      role: 'Backend Engineering Intern',
      location: 'Bengaluru',
      stipend: '₹45K/month',
      appliedDate: '12 Oct 2026',
      currentStage: 'Coding Assessment',
      status: 'Under Review',
      statusVariant: 'neutral',
      nextAction: 'Results by Friday',
    },
  ],

  upcomingSchedule: [
    {
      id: 'sch-01',
      company: 'Google',
      role: 'Software Developer Intern',
      round: 'Technical Interview (Algorithms & System Design)',
      date: 'Tomorrow, 08 Nov 2026',
      time: '10:30 AM – 11:30 AM',
      mode: 'Google Meet',
      interviewer: 'Lead Systems Engineer',
      isUpcoming: true,
    },
    {
      id: 'sch-02',
      company: 'Morgan Stanley',
      role: 'Summer Technology Analyst',
      round: 'Campus Online Assessment',
      date: 'Monday, 10 Nov 2026',
      time: '06:00 PM – 07:30 PM',
      mode: 'HackerRank Platform',
      interviewer: 'Campus Recruitment Team',
      isUpcoming: false,
    },
  ],
}

export default mockStudentData
