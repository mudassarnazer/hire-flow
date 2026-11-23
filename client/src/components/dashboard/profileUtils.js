/**
 * Profile completion calculation and validation utilities
 * Developer Attribution: MUDASSAR NAZER
 */

export function calculateProfileCompletion(profile) {
  if (!profile) {
    return {
      percentage: 0,
      completedCount: 0,
      totalCount: 5,
      items: [],
    }
  }

  const items = [
    {
      id: 'academics',
      label: 'Academic Profile Details',
      shortLabel: 'Academics Listed',
      detail:
        profile.department && profile.institution && profile.cgpa
          ? `${profile.department} (${profile.cgpa})`
          : null,
      isComplete: Boolean(profile.department && profile.institution && profile.cgpa),
    },
    {
      id: 'skills',
      label: 'Technical Skills Profile',
      shortLabel: `Skills (${Array.isArray(profile.skills) ? profile.skills.length : 0})`,
      detail:
        Array.isArray(profile.skills) && profile.skills.length > 0
          ? `${profile.skills.length} skills listed`
          : null,
      isComplete: Array.isArray(profile.skills) && profile.skills.length > 0,
    },
    {
      id: 'resume',
      label: 'Simulated ATS Resume Evaluation',
      shortLabel: `ATS Score (${profile.resumeScore || 0}/100, Simulated)`,
      detail:
        typeof profile.resumeScore === 'number' && profile.resumeScore > 0
          ? `${profile.resumeScore}/100 (Simulated)`
          : null,
      isComplete: typeof profile.resumeScore === 'number' && profile.resumeScore > 0,
    },
    {
      id: 'bio',
      label: 'Candidate Bio & Summary',
      shortLabel: 'Candidate Bio',
      detail:
        profile.bio && profile.bio.trim().length >= 10
          ? 'Profile summary provided'
          : null,
      isComplete: Boolean(profile.bio && profile.bio.trim().length >= 10),
    },
    {
      id: 'portfolio',
      label: 'Portfolio or Repository Link',
      shortLabel: 'Portfolio Link',
      detail:
        profile.portfolioLink && /^https?:\/\//i.test(profile.portfolioLink.trim())
          ? profile.portfolioLink.trim()
          : null,
      isComplete: Boolean(
        profile.portfolioLink && /^https?:\/\//i.test(profile.portfolioLink.trim())
      ),
    },
  ]

  const completedCount = items.filter((item) => item.isComplete).length
  const percentage = Math.round((completedCount / items.length) * 100)

  return { percentage, completedCount, totalCount: items.length, items }
}
