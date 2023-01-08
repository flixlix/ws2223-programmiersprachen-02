export default async function signUpUser({ email, password, supabase, setErrorMessage }) {
    const { user, session, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    setErrorMessage(error?.message);
    console.log(error);
    return { user, session, error };
}