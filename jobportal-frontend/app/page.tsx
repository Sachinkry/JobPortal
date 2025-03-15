'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api, { setAuthHeader } from '@/lib/api';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('RECRUITER');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [redirecting, setRedirecting] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setRedirecting(false);
        try {
            console.log('Sending registration request:', { username, password, role });
            const response = await api.post('/auth/register', {
                username,
                password,
                role,
            });
            console.log('Registration response:', response.data);
            setSuccess(`User ${response.data.username} registered successfully!`);
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('role', role); // Store role
            setAuthHeader(username, password);
            setRedirecting(true);
            setTimeout(() => {
                console.log('Navigating to /jobs');
                router.push('/jobs');
            }, 1000); // Delay to allow UI to update
        } catch (err: any) {
            console.error('Registration error:', err);
            if (err.response) {
                console.error('Error response:', err.response.data);
                setError(`Registration failed: ${err.response.data.message || err.response.statusText}`);
            } else if (err.request) {
                console.error('No response received:', err.request);
                setError('Registration failed: No response from server. Please try again.');
            } else {
                console.error('Error details:', err.message);
                setError(`Registration failed: ${err.message}`);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Register - Job Portal</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="RECRUITER">Recruiter</SelectItem>
                                    <SelectItem value="JOB_SEEKER">Job Seeker</SelectItem>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="w-full" disabled={redirecting}>
                            {redirecting ? 'Redirecting...' : 'Register'}
                        </Button>
                        {success && <p className="text-green-500 text-sm">{success}</p>}
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                    <p className="mt-4 text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Login here
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}