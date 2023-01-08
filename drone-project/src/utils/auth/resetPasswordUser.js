export default async function resetPasswordUser({ email, supabase, setErrorMessage }) {
    const { user, session, error } = await supabase.auth.resetPasswordForEmail(email,
        {
            redirectTo: 'http://localhost:3000/login/newPassword',
        }
    );
    setErrorMessage(error?.message);
    return { user, session, error };
}