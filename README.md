# Freelance MarketPlace

**Live Site:** [(https://freemarket-5612f.web.app/)]

Freelance MarketPlace is a full-stack web application where users can explore, add, update, and manage jobs or tasks. Authenticated users can control their posted jobs, while others can accept available tasks. The project integrates Node.js + Express.js backend, MongoDB Atlas, and Firebase authentication.

---

## Features

- **User Authentication:** Login/Register with Firebase & Google Login.  
- **CRUD Operations:** Users can add, update, delete, and view jobs.  
- **Accepted Tasks:** Track and manage accepted jobs.  
- **Dark/Light Theme Toggle:** Switch between dark and light themes across the platform.  
- **Dynamic Content:** Fetch latest jobs dynamically from MongoDB.  
- **Responsive Design:** Fully responsive for mobile, tablet, and desktop.  
- **Toast Notifications:** Success/error messages for all actions (no alerts).  
- **Private Routes:** Only authenticated users can access job management pages.  

---

## Pages & Routes

- `/` → Home page with banner, dynamic job listings, and top categories.  
- `/allJobs` → Browse all jobs (table/grid format).  
- `/allJobs/:id` → View job details and accept tasks.  
- `/addJob` → Add new jobs (private route).  
- `/my-added-tasks` → Manage jobs posted by the logged-in user.  
- `/updateJob/:id` → Update a posted job (private route).  
- `/my-accepted-tasks` → View and manage accepted jobs (private route).  

---

## Technologies Used

- **Frontend:** React, React Router, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** Firebase Auth (Email/Password & Google Login)  
- **Notifications:** React Toastify  
- **Other Libraries:** Axios, TanStack Query, Framer Motion  

---

## Design & UI

- Consistent heading styles, spacing, and buttons across the site.  
- Grid layout for jobs and categories with uniform card sizes.  
- Fully responsive design with elegant banners and animations.  
- Unique logo and modern UI inspired by leading freelance marketplaces.  

---

## Installation & Setup

1. Clone the repository:  
   git clone https://github.com/Sanzid-Ahmed/ph-assignment-10-client.git

2. Install dependencies:
    npm install

3. Create a .env file with your Firebase keys and MongoDB URI.

4. 