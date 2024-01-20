export interface User {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'user' | 'admin' | 'superadmin';
    accountStatus: 'active' | 'inactive' | 'pending';
}