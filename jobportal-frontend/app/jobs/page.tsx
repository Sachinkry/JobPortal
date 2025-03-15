'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

interface Job {
    id: number;
    title: string;
    description: string;
    location: string;
    skills: string;
    recruiterUsername: string;
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get('/jobs');
                setJobs(response.data);
                setError('');
            } catch (err: any) {
                console.error('Error fetching jobs:', err);
                setError('Failed to fetch jobs. Please try again later.');
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
                <Link href="/">
                    <Button variant="outline" className="mb-4 mr-2">
                        Register
                    </Button>
                </Link>
                <Link href="/login">
                    <Button variant="outline" className="mb-4">
                        Login
                    </Button>
                </Link>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {jobs.length === 0 && !error && <p className="text-gray-600">No jobs available.</p>}
                <div className="space-y-4">
                    {jobs.map((job) => (
                        <Card key={job.id}>
                            <CardHeader>
                                <CardTitle>{job.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">{job.description}</p>
                                <p className="text-gray-600 mt-2">Location: {job.location}</p>
                                <p className="text-gray-600">Skills: {job.skills}</p>
                                <p className="text-gray-600">Posted by: {job.recruiterUsername}</p>
                                <Button
                                    className="mt-4"
                                    onClick={() => alert('Login or register to apply for this job!')}
                                >
                                    Apply
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}