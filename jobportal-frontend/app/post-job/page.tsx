'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';

export default function PostJobPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const username = sessionStorage.getItem('loggedInUser') || 'jay'; // Use logged-in user
      const response = await api.post('/jobs/add', {
        title,
        description,
        location,
        skills,
        recruiterUsername: username,
      });
      console.log('Job posted:', response.data);
      setSuccess('Job posted successfully!');
      setTimeout(() => router.push('/jobs'), 1000);
    } catch (err: any) {
      console.error('Error posting job:', err);
      setError(`Failed to post job: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Post a Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostJob} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <Input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <Input id="skills" type="text" value={skills} onChange={(e) => setSkills(e.target.value)} required className="mt-1" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </Button>
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}