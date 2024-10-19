'use client'
import React, { useState, useEffect } from 'react';

const UserProfile: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/get-current-user', {
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
                });
                const data = await response.json();
                console.log(data);
                setUserId(data.userId);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserId();

        // Optional: Set up polling if needed
        // const interval = setInterval(fetchUserId, 5000);
        // return () => clearInterval(interval);
    }, []);

    if (isLoading) return <div>Loading user data...</div>;

    return (
        <div>
            <h1>User Id: {userId || 'No user ID available'}</h1>
        </div>
    );
};

export default UserProfile;