import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'

const supabase = createServerComponentClient<Database>({
    cookies,
})

export const useAuth = () => {
    const isLoggedIn = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return false
        return true;
    };

    return {
        isLoggedIn
    };
};

export default useAuth;