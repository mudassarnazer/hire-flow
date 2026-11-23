/**
 * HireFlow Sample Student Placement Data (Demonstration State)
 *
 * NOTE: This is mock/sample data for UI prototyping and evaluation purposes only.
 * No backend database, institutional registrar, or employer integrations are connected.
 * Developer Attribution: MUDASSAR NAZER
 */

export const mockStudentData = {
  profile: {
    id: 'stu-1042',
    name: 'Alex Morgan (Sample Profile)',
    avatarInitials: 'AM',
    rollNumber: 'DEMO-2027-CS',
    department: 'Computer Science & Engineering',
    institution: 'Sample Technical Institute (Demo)',
    batch: 'Class of 2027 (Sample)',
    cgpa: '8.94 / 10.0 (Sample)',
    eligibilityStatus: 'Standard Placement Track (Sample)',
    eligibilityBadge: 'neutral',
    resumeScore: 92, // Illustrative simulated score
    skills: ['React', 'JavaScript', 'Node.js', 'Python', 'SQL', 'Algorithms'],
    bio: 'Sample candidate profile for HIRE-FLOW evaluation. Focusing on full-stack web engineering and distributed systems.',
    portfolioLink: 'https://example.com/candidate-portfolio-demo',
  },

  metrics: [
    {
      id: 'metric-1',
      label: 'Applications Submitted',
      value: '4',
      icon: '📄',
      trend: 'Sample application records',
      accent: 'primary',
    },
    {
      id: 'metric-2',
      label: 'Under Review',
      value: '2',
      icon: '⏳',
      trend: 'Sample review stages',
      accent: 'accent',
    },
    {
      id: 'metric-3',
      label: 'Interviews Scheduled',
      value: '1',
      icon: '🎯',
      trend: 'Sample scheduled session',
      accent: 'warning',
    },
    {
      id: 'metric-4',
      label: 'Offers Received',
      value: '1',
      icon: '🏆',
      trend: 'Sample offer scenario (Demo)',
      accent: 'success',
    },
  ],

  applications: [
    {
      id: 'app-01',
      company: 'Google (Sample Record)',
      role: 'Software Developer Intern',
      location: 'Bengaluru',
      stipend: '₹30K/month (Sample)',
      appliedDate: '04 Nov 2026',
      currentStage: 'Technical Round 2 (Sample)',
      status: 'Interview Scheduled',
      statusVariant: 'warning',
      nextAction: 'Sample round: Tomorrow at 10:30 AM',
      isSample: true,
    },
    {
      id: 'app-02',
      company: 'Microsoft (Sample Record)',
      role: 'Data Analyst Intern',
      location: 'Hyderabad',
      stipend: '₹25K/month (Sample)',
      appliedDate: '29 Oct 2026',
      currentStage: 'Resume Screening (Sample)',
      status: 'Under Review',
      statusVariant: 'accent',
      nextAction: 'Sample stage: Under Review',
      isSample: true,
    },
    {
      id: 'app-03',
      company: 'Amazon (Sample Record)',
      role: 'Cloud Support Associate',
      location: 'Remote',
      stipend: '₹8–12 LPA (Sample)',
      appliedDate: '18 Oct 2026',
      currentStage: 'HR Final (Sample)',
      status: 'Offer Received',
      statusVariant: 'success',
      nextAction: 'Sample offer demonstration',
      isSample: true,
    },
    {
      id: 'app-04',
      company: 'Uber (Sample Record)',
      role: 'Backend Engineering Intern',
      location: 'Bengaluru',
      stipend: '₹45K/month (Sample)',
      appliedDate: '12 Oct 2026',
      currentStage: 'Coding Assessment (Sample)',
      status: 'Under Review',
      statusVariant: 'neutral',
      nextAction: 'Sample stage: Under Review',
      isSample: true,
    },
  ],

  upcomingSchedule: [
    {
      id: 'sch-01',
      company: 'Google (Sample Drive)',
      role: 'Software Developer Intern',
      round: 'Technical Interview (Algorithms & System Design) — Sample',
      date: 'Tomorrow, 08 Nov 2026',
      time: '10:30 AM – 11:30 AM',
      mode: 'Google Meet (Sample Link)',
      interviewer: 'Sample Technical Lead',
      isUpcoming: true,
    },
    {
      id: 'sch-02',
      company: 'Morgan Stanley (Sample Drive)',
      role: 'Summer Technology Analyst',
      round: 'Campus Assessment (Sample Demo)',
      date: 'Monday, 10 Nov 2026',
      time: '06:00 PM – 07:30 PM',
      mode: 'Online Assessment Platform (Sample)',
      interviewer: 'Sample Recruitment Coordinator',
      isUpcoming: false,
    },
  ],
}

export default mockStudentData
