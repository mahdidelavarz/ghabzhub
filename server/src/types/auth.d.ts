export interface LoginDetails {
    lastLogin: string,
    ip: string,
    deviceInfo: string,
    isSuccessful: boolean,
    failedAttempts?: number
}

type AdminAccessLevel = 'finance' | 'content-management' | 'biling' | 'general' | 'support'

export interface AdminBody {
    name: string | undefined,
    family: string | undefined,
    email: string | undefined,
    password: string | undefined,
    role: string | undefined,
    username: string | undefined
    accessLevel: AdminAccessLevel | undefined,
}

export interface LoginBody {
    username: string | undefined,
    password: string | undefined
}