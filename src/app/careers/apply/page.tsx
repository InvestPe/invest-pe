"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

interface FormData {
  position: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  portfolio: string;
  coverLetter: string;
  resume: File | null;
}

export default function ApplicationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    position: "",
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    education: "",
    portfolio: "",
    coverLetter: "",
    resume: null,
  });

  useEffect(() => {
    const position = searchParams.get("position");
    if (position) {
      setFormData(prev => ({ ...prev, position: decodeURIComponent(position) }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'resume' && value !== null) {
          formDataToSend.append(key, value);
        }
      });

      // Append resume file if exists
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await fetch('/api/submit-application', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      alert("Thank you for your application! We will get back to you soon.");
      router.push('/careers');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/careers"
            className="inline-flex items-center text-blue-500 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl p-8 shadow-lg border border-border"
        >
          <h1 className="text-3xl font-bold text-foreground mb-6">Job Application</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Position *
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select a position</option>
                <option value="HR Intern">HR Intern</option>
                <option value="Marketing Intern">Marketing Intern</option>
                <option value="Application Developer Intern">Application Developer Intern</option>
                <option value="Software Engineer - Backend Intern">Software Engineer - Backend Intern</option>
                <option value="Data Engineer Intern">Data Engineer Intern</option>
                <option value="Frontend Engineer Intern">Frontend Engineer Intern</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Years of Experience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Education *
              </label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your educational background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Portfolio/GitHub URL
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={5}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Tell us why you'd be a great fit for this position"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Resume/CV *
              </label>
              <input
                type="file"
                name="resume"
                onChange={handleFileChange}
                required
                accept=".pdf,.doc,.docx"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-1 text-sm text-muted-foreground">
                Accepted formats: PDF, DOC, DOCX
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-lg bg-blue-500 px-4 py-2 text-white font-medium transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 