export default async function signUpUser({ email, password, supabase, setErrorMessage, setSuccessState }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) {
        console.log(error);
        setErrorMessage(error.message);
    } else {
        console.log(data, error);
        updateProfilesTable(data.user);
        setErrorMessage("");
        setSuccessState(true);
    }

    async function updateProfilesTable(user) {
        const { error } = await supabase
            .from('profiles')
            .insert({
                id: user.id,
                email: user.email,
            })
        if (error) {
            setErrorMessage(error.message);
        } else {
            console.log("User created successfully");
            setErrorMessage("");
            setSuccessState(true);
        }
    }
}