# HIRE-FLOW — Day 01 Learning Report

**Day:** 01  
**Topic:** Project Understanding, System Architecture and Folder Structure  
**Status:** Folder setup completed; architecture concepts introduced; assessment pending.

---

## 1. Project Overview

HireFlow is an AI-powered recruitment and campus placement management platform.

### Problem being addressed

Traditional placement processes can be fragmented:

- Students struggle to discover relevant opportunities and understand eligibility.
- Recruiters need an organized way to publish vacancies and manage applicants.
- College placement administrators need centralized placement information and monitoring.

### Main objective

Build a centralized platform connecting students, recruiters and college placement administrators.

## 2. User Roles

### Student
- Register and log in.
- Create a professional profile.
- Add education and skills.
- Browse and filter jobs.
- Check eligibility.
- Apply for jobs.
- Track application status.
- View interview schedules.

### Recruiter
- Register and manage a recruiter profile.
- Publish jobs and internships.
- Define eligibility requirements.
- View applicants.
- Shortlist or reject applicants.
- Schedule interviews.

### Placement Administrator
- Manage student and recruiter accounts.
- Review job postings.
- Manage placement drives.
- Monitor applications.
- View placement analytics.

## 3. Understanding a Full-Stack Web Application

A web application allows users to interact with information and perform operations.

HireFlow has three fundamental software layers:

1. **Frontend:** User interface and interactions.
2. **Backend:** Business logic, request processing, authentication and authorization.
3. **Database:** Persistent storage and retrieval of information.

A website displaying static information is not necessarily a full-stack web application.

## 4. HireFlow Technology Stack

| Layer | Technology | Responsibility |
|---|---|---|
| Frontend | React.js | User interface |
| Programming language | JavaScript | Application logic |
| Styling | Tailwind CSS | UI styling |
| Backend | Node.js | Server runtime |
| Backend framework | Express.js | APIs and request handling |
| Primary database | PostgreSQL | Structured business records |
| Secondary database | MongoDB | Flexible AI-related documents |
| Version control | Git | Track code changes |
| Repository hosting | GitHub | Store and share project code |

## 5. System Architecture

### Request flow

1. User performs an action in the React frontend.
2. Frontend sends an HTTP request to the backend.
3. Express.js receives the request.
4. Backend validates the request and permissions.
5. Backend communicates with the appropriate database.
6. Database returns the result.
7. Backend sends a response to the frontend.
8. Frontend updates the interface.

### PostgreSQL

Used for structured business information:

- Students
- Recruiters
- Jobs
- Applications
- Interviews

### MongoDB

Used for flexible documents:

- AI interview conversation histories
- Resume analysis documents
- AI-generated feedback

PostgreSQL remains the authoritative source for core recruitment records.

### Security principle

Hiding an administrator button in React is not sufficient authorization. The backend must independently verify user roles and permissions.

## 6. Project Folder Structure

### Root structure

```text
HIRE-FLOW/
├── client/
├── server/
├── docs/
├── .gitignore
├── README.md
└── environment-check.txt
```

### Frontend structure

```text
client/
└── src/
    ├── assets/
    ├── components/
    ├── pages/
    ├── layouts/
    ├── hooks/
    ├── services/
    ├── context/
    └── utils/
```

| Folder | Purpose |
|---|---|
| assets | Images, icons and static resources |
| components | Reusable UI components |
| pages | Application pages |
| layouts | Shared page structures |
| hooks | Reusable React hooks |
| services | API communication |
| context | Shared application state |
| utils | Helper functions |

### Backend structure

```text
server/
└── src/
    ├── config/
    ├── controllers/
    ├── routes/
    ├── middleware/
    ├── services/
    ├── models/
    └── utils/
```

| Folder | Purpose |
|---|---|
| config | Application and database configuration |
| controllers | Handle incoming requests |
| routes | Define API endpoints |
| middleware | Authentication and authorization |
| services | Business logic |
| models | Data models and database operations |
| utils | Helper functions |

### Documentation structure

```text
docs/
├── daily-learning/
├── architecture/
├── technical-reference/
└── troubleshooting/
```

## 7. PowerShell Commands Learned

### Navigate into a directory

```powershell
cd "$HOME\Documents\HIRE-FLOW"
```

### Display current directory

```powershell
Get-Location
```

### List files and folders

```powershell
Get-ChildItem
```

### Create a directory

```powershell
New-Item -ItemType Directory -Name "client"
```

### Create multiple directories using a loop

```powershell
$folders = @("assets", "components", "pages")

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Name $folder
}
```

### Display directory tree

```powershell
tree /F docs
```

### Inspect files recursively

```powershell
Get-ChildItem "docs/client" -Recurse -File
```

## 8. Practical Work Completed

- Opened the HIRE-FLOW project workspace.
- Inspected the project root directory.
- Created the missing root-level `client` directory.
- Created the frontend `src` directory.
- Created eight frontend subdirectories.
- Inspected the backend structure.
- Created the four documentation directories.
- Identified and removed the accidental `docs/client` directory.
- Verified the final documentation directory structure.

## 9. Important Learning Takeaways

1. A full-stack application contains frontend, backend and data layers.
2. React handles the user interface.
3. Express.js handles backend requests and business logic.
4. PostgreSQL stores structured recruitment records.
5. MongoDB stores flexible AI-related documents.
6. Frontend and backend code should be organized separately.
7. Backend authorization is essential for security.
8. PowerShell can automate project folder creation.

## 10. Current Project Status

| Item | Status |
|---|---|
| Root project folder | Created |
| Frontend directories | Created |
| Backend directories | Present and inspected |
| Documentation directories | Created and verified |
| React initialization | Not started |
| Backend initialization | Not started |
| Database connection | Not started |
| Authentication | Not implemented |
| AI integration | Not implemented |

**Important:** Folder creation does not mean the frontend or backend application has been initialized.

## 11. Pending Learning Assessment

- Explain why frontend and backend are separated.
- Explain how a student application request travels through the system.
- Explain why PostgreSQL is appropriate for structured application records.
- Explain why backend authorization is necessary.

## 12. Next Learning Objective

**Day 02:** Development environment preparation and React fundamentals.

Planned activities:
- Initialize the React application using Vite.
- Understand the React project structure.
- Learn the purpose of `package.json`.
- Run the first development server.
- Build the first HireFlow interface.

---

*End of Day 01 report.*