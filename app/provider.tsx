"use client"

import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import axios from 'axios';

const MAX_CREATE_USER_ATTEMPTS = 3;
const INITIAL_RETRY_DELAY_MS = 500;

function Provider({ children }: { children: React.ReactNode }) {
    const { data } = useSession();
    const email = data?.user?.email;

    const createNewUser = async (isCancelled: () => boolean) => {
        let retryDelay = INITIAL_RETRY_DELAY_MS;

        for (let attempt = 1; attempt <= MAX_CREATE_USER_ATTEMPTS; attempt++) {
            if (isCancelled()) return;

            try {
                const response = await axios.post('/api/user', {});
                console.log('User created successfully:', response.data);
                return;
            } catch (error) {
                if (attempt === MAX_CREATE_USER_ATTEMPTS || isCancelled()) {
                    console.error('Error creating user after retries:', error);
                    return;
                }

                console.warn(
                    `User creation attempt ${attempt} failed; retrying in ${retryDelay}ms.`,
                    error,
                );
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
                retryDelay *= 2;
            }
        }
    };

    useEffect(() => {
        if (!email) return;

        let cancelled = false;
        createNewUser(() => cancelled);

        return () => {
            cancelled = true;
        }
    }, [email]);
  return (
    <div>
      {children}
    </div>
  )
}

export default Provider;
