'use server'
import AdminUsersPage from "@/app/(admin)/admin/user/components/ui/AdminUsersPage";

export default async function Page() {

    return (
        <main className={"overflow-auto scrollbar-hide"}>
            <AdminUsersPage/>
        </main>

    );
}
