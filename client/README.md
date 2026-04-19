# Dossier — Job Application Tracker

A full-stack job application tracking tool built to help job seekers organize and monitor their applications in one place.

🔗 **Live App:** http://dossier-frontend.s3-website-us-east-1.amazonaws.com

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- React Router

**Backend**
- Node.js + Express
- JWT Authentication (bcrypt)
- RESTful API

**Database**
- PostgreSQL

**Cloud Infrastructure (AWS)**
- EC2 — Node.js/Express backend with PM2 process management
- S3 — React frontend static hosting
- CloudFront — CDN distribution
- Security Groups — firewall configuration

## Features
- User registration and login with JWT authentication
- Add, edit, and delete job applications
- Filter applications by status (All / Active / Closed)
- Status badges (Applied, Interviewing, Hired, Rejected)
- Dashboard with live stats and recent activity
- Responsive UI with letter avatars and color-coded statuses

## Future Improvements
- Custom domain with HTTPS via Route 53 + ACM
- CI/CD pipeline with GitHub Actions
- Migrate database to AWS RDS