import AdminUsersPage from "@/app/(admin)/admin/user/components/ui/AdminUsersPage";

export default async function Page() {
    let userData: any = [];
    return (
        <AdminUsersPage initialUsers={userData} />
    );
}
