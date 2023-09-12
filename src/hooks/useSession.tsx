import { useEffect, useState } from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation'
import type { Database } from '@/lib/database.types'

const supabase = createServerComponentClient<Database>({
    cookies,
})

export function useSession() {
    const [isSessionValid, setIsSessionValid] = useState(false);

    useEffect(() => {
        async function checkSession() {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                setIsSessionValid(true);
            } else {
                setIsSessionValid(false);
                redirect('/login');
            }
        }

        checkSession();
    }, []);

    return isSessionValid;
}
