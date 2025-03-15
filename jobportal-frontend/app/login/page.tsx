'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api, { setAuthHeader } from '@/lib/api';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [redirecting, setRedirecting] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setRedirecting(false);
        try {
            console.log('Attempting login with:', { username, password });
            setAuthHeader(username, password);
            // Test the header with a simple request
            const response = await api.get('/auth/check'); // Use a permissive endpoint if available
            console.log('Login successful, response:', response.data);
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('role', ''); // Fetch role from /auth/me in the future
            setSuccess('Login successful! Redirecting to jobs...');
            setRedirecting(true);
            setTimeout(() => {
                console.log('Navigating to /jobs');
                router.push('/jobs');
            }, 1000);
        } catch (err: any) {
            console.error('Login error:', err);
            if (err.response) {
                console.error('Error response:', err.response.data);
                setError(`Login failed: ${err.response.data.message || err.response.statusText}`);
            } else if (err.request) {
                console.error('No response received:', err.request);
                setError('Login failed: No response from server. Please try again.');
            } else {
                console.error('Error details:', err.message);
                setError(`Login failed: ${err.message}`);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login - Job Portal</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
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
                        <Button type="submit" className="w-full" disabled={redirecting}>
                            {redirecting ? 'Redirecting...' : 'Login'}
                        </Button>
                        {success && <p className="text-green-500 text-sm">{success}</p>}
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                    <p className="mt-4 text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="/" className="text-blue-600 hover:underline">
                            Register here
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}