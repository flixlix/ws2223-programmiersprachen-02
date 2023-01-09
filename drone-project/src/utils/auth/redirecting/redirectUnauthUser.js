export default async function redirectUnauthUser({ router, supabase }) {
    const { data, error } = await supabase.auth.getUser();
    if (!data.user || error) {
        router.push("/login");
    }
}