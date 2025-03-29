// types/auth.d.ts or at the top of your component file
interface AuthUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface AuthSession {
    user?: AuthUser;
    expires?: string;
}