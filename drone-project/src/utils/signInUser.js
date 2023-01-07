export default async function signInUser({ email, password, supabase, setErrorMessage }) {
    const { user, session, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
    setErrorMessage(error?.message);
    return { user, session, error };
}