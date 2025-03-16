"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const jobListings = [
  {
    title: "HR Intern",
    type: "Unpaid Internship",
    location: "Remote, India",
    description: `We're seeking a passionate HR Intern to join our dynamic team and gain hands-on experience in human resources management and talent acquisition.

Key Responsibilities:
• Assist in full-cycle recruitment process
• Support employee onboarding and orientation programs
• Help maintain HR documentation and employee records
• Coordinate with team leads for performance reviews
• Assist in organizing company culture initiatives

Requirements:
• Currently pursuing a degree in HR, Business Administration, or related field
• Strong interpersonal and communication skills
• Basic understanding of HR practices and principles
• Proficiency in MS Office suite
• Excellent organizational skills and attention to detail`,
  },
  {
    title: "Marketing Intern",
    type: "Unpaid Internship",
    location: "Remote, India",
    description: `We're looking for a creative and enthusiastic Marketing Intern to join our growing team. You'll get hands-on experience in digital marketing, content creation, and brand development.

Key Responsibilities:
• Create engaging content for social media platforms
• Assist in developing marketing campaigns
• Analyze marketing metrics and prepare reports
• Support email marketing initiatives
• Contribute to content marketing strategy

Requirements:
• Currently pursuing a degree in Marketing, Business, or related field
• Strong written and verbal communication skills
• Familiarity with social media platforms
• Basic understanding of digital marketing concepts
• Creative mindset and ability to think outside the box`,
  },
  {
    title: "Application Developer Intern",
    type: "Unpaid Internship",
    location: "Remote, India",
    description: `Join our development team as an Application Developer Intern and work on cutting-edge financial technology solutions.

Key Responsibilities:
• Develop and maintain web and mobile applications
• Write clean, maintainable, and efficient code
• Collaborate with cross-functional teams
• Participate in code reviews
• Debug and fix software issues

Requirements:
• Knowledge of JavaScript, TypeScript, and modern frameworks
• Experience with React or similar frontend frameworks
• Understanding of REST APIs and web services
• Basic knowledge of database systems
• Strong problem-solving skills`,
  },
  {
    title: "Software Engineer - Backend Intern",
    type: "Unpaid Internship",
    location: "Remote, India",
    description: `We're seeking a Backend Engineering Intern to help build robust and scalable server-side applications.

Key Responsibilities:
• Design and implement backend services and APIs
• Work with databases and data storage solutions
• Optimize application performance
• Write unit tests and documentation
• Collaborate with frontend developers

Requirements:
• Knowledge of Node.js, Python, or similar backend technologies
• Understanding of databases (SQL and NoSQL)
• Basic knowledge of cloud services (AWS/GCP/Azure)
• Familiarity with version control systems (Git)
• Strong analytical and problem-solving skills`,
  },
  {
    title: "Data Engineer Intern",
    type: "Unpaid Internship",
    location: "Remote, India",
    description: `Looking for a Data Engineer Intern to help build and maintain our data infrastructure.

Key Responsibilities:
• Design and implement data pipelines
• Work with large datasets and data warehouses
• Optimize data delivery and processing
• Create data validation tools
• Support data analysis initiatives

Requirements:
• Knowledge of SQL and data modeling
• Experience with Python or similar programming languages
• Understanding of ETL processes
• Familiarity with big data technologies
• Strong analytical mindset`,
  },
  {
    title: "Frontend Engineer Intern",
    type: "Unpaid Internship",
    location: "Remote, India",
    description: `Join us as a Frontend Engineering Intern to create beautiful and responsive user interfaces.

Key Responsibilities:
• Implement user interface components
• Ensure cross-browser compatibility
• Optimize application performance
• Work with UI/UX designers
• Write clean and maintainable code

Requirements:
• Strong knowledge of HTML, CSS, and JavaScript
• Experience with React or similar frameworks
• Understanding of responsive design principles
• Basic knowledge of version control
• Eye for detail and design`,
  },
  {
    title: "UI/UX Designer",
    type: "Unpaid Internship",
    location: "Remote, India",
    description: `We're looking for a creative UI/UX Designer Intern to help create intuitive and engaging user experiences.

Key Responsibilities:
• Create user-centered designs and wireframes
• Develop UI mockups and prototypes
• Conduct user research and testing
• Create user flows and journey maps
• Collaborate with development team

Requirements:
• Knowledge of design tools (Figma, Adobe XD)
• Understanding of UI/UX principles
• Basic prototyping skills
• Knowledge of responsive design
• Strong visual design skills`,
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4"
          >
            Help us build the future of investments
          </motion.p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobListings.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-border p-6 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                <ArrowUpRight className="h-5 w-5 text-blue-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{job.type}</p>
              <p className="mt-1 text-sm text-muted-foreground">{job.location}</p>
              <div className="mt-4 text-sm text-muted-foreground">
                {job.description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
              <Link href={`/careers/apply?position=${encodeURIComponent(job.title)}`}>
                <button className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600">
                  Apply Now
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 