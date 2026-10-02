"use client"

import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import axios from 'axios';

function Provider({ children }: { children: React.ReactNode }) {
    const { data } = useSession();

    const createNewUser = async () => {
        try {
            const response = await axios.post('/api/user', {});
            console.log('User created successfully:', response.data);  
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    useEffect(() => {
        if (data?.user?.email) {
            createNewUser();
        }
    }, [data]);
  return (
    <div>
      {children}
    </div>
  )
}

export default Provider;
