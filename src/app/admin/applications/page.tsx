"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SortAsc, SortDesc, X } from 'lucide-react';

interface JobApplication {
  id: number;
  submissionDate: string;
  position: string;
  fullName: string;
  email: string;
  phone: string | null;
  resumeLink: string | null;
  portfolioLink: string | null;
  experience: string | null;
  skills: string | null;
  comments: string | null;
  status: string;
}

interface SortConfig {
  key: keyof JobApplication;
  direction: 'asc' | 'desc';
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'submissionDate', direction: 'desc' });
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch applications');
      }

      setApplications(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setApplications(apps =>
        apps.map(app =>
          app.id === id ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredApplications = applications
    .filter(app => {
      const matchesSearch = Object.values(app).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      // Handle null values
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      return aValue < bValue ? -1 * direction : aValue > bValue ? 1 * direction : 0;
    });

  const handleSort = (key: keyof JobApplication) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading applications...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Job Applications</h1>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-card border-b border-border">
                  <th
                    onClick={() => handleSort('submissionDate')}
                    className="px-6 py-3 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  >
                    Date {sortConfig.key === 'submissionDate' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />
                    )}
                  </th>
                  <th
                    onClick={() => handleSort('position')}
                    className="px-6 py-3 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  >
                    Position {sortConfig.key === 'position' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />
                    )}
                  </th>
                  <th
                    onClick={() => handleSort('fullName')}
                    className="px-6 py-3 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  >
                    Name {sortConfig.key === 'fullName' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="inline h-4 w-4" /> : <SortDesc className="inline h-4 w-4" />
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="border-b border-border hover:bg-card/50">
                    <td className="px-6 py-4 text-sm">
                      {new Date(app.submissionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">{app.position}</td>
                    <td className="px-6 py-4 text-sm">{app.fullName}</td>
                    <td className="px-6 py-4 text-sm">{app.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className="px-2 py-1 rounded border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Application Details</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Position</h3>
                <p className="mt-1">{selectedApplication.position}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                <p className="mt-1">{selectedApplication.fullName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                <p className="mt-1">Email: {selectedApplication.email}</p>
                <p className="mt-1">Phone: {selectedApplication.phone || 'Not provided'}</p>
              </div>

              {selectedApplication.experience && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Experience</h3>
                  <p className="mt-1">{selectedApplication.experience}</p>
                </div>
              )}

              {selectedApplication.skills && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Skills</h3>
                  <p className="mt-1">{selectedApplication.skills}</p>
                </div>
              )}

              {selectedApplication.portfolioLink && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Portfolio</h3>
                  <a
                    href={selectedApplication.portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-blue-500 hover:text-blue-600"
                  >
                    View Portfolio
                  </a>
                </div>
              )}

              {selectedApplication.resumeLink && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Resume</h3>
                  <a
                    href={selectedApplication.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-blue-500 hover:text-blue-600"
                  >
                    View Resume
                  </a>
                </div>
              )}

              {selectedApplication.comments && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Comments</h3>
                  <p className="mt-1">{selectedApplication.comments}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 