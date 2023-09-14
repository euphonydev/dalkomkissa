import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Avatar {
    publicUrl: string;
}

export const useUser = () => {
    const supabase = createClientComponentClient()
    const [user, setUser] = useState<any | null>(null)
    const [avatar, setAvatar] = useState<Avatar | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data, error } = await supabase
                    .from('profile')
                    .select(`name, photo, birthdate, account_id, gender, account (username, email)`)
                    .eq('id', user.id)
                    .single()
                if (!error) {
                    setUser(data)
                    const { data: photo } = await supabase
                        .storage
                        .from('avatar')
                        .getPublicUrl(data.photo)
                    setAvatar(photo)
                }
            }
        }

        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                setIsLoggedIn(true)
                getUser()
            }
        }

        checkSession();
    }, []);

    return { user, avatar, isLoggedIn };
};