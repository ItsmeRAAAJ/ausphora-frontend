import ProfileComponent from "@/components/pages/ProfilePage";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    return <ProfileComponent username={username} />;
}