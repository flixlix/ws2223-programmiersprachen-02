import React from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

async function getProfile({ supabase, setUsername}) {
    
    try {
        const user = supabase.auth.user();
        let { data, error, status } = await supabase
            .from('profiles')
            .select(`username`)
            .eq('id', user.id)
            .single();

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            setUsername(data.username);
        }
    } catch (error) {
        alert(error.message);
    }
}

async function updateProfile() {
    try {
        const user = supabase.auth.user();
        const updates = {
            id: user.id,
            username,
            updated_at: new Date(),
        };

        let { error } = await supabase.from('profiles').upsert(updates);
        if (error) {
            throw error;
        }
    } catch (error) {
        alert(error.message);
    }
}

export default function Profile() {
    const [username, setUsername] = React.useState('');
    const supabase = useSupabaseClient();

    React.useEffect(() => {
        getProfile({ supabase, setUsername });
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {username}</p>
            <input className='my-4 border-2 border-gray-500 rounded-xl p-4 w-full' type='username' placeholder='Enter a username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <button onClick={(e) => { e.preventDefault(); updateProfile(); }} className='w-full mt-4 p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300'>
                <span>Update profile</span>
            </button>
        </div>
    );
}