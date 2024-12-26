export interface UserInfo {
    /**
     * 用户头像
     */
    avatar: string;
    create_time?: string;
    email?: string;
    id: number;
    role: ROLE;
    signature: string;
    update_time: string;
    username: string;
    [property: string]: any;
}

export enum ROLE {
    Visitor = -1,
    Banned = 0,
    User = 1,
    Admin = 2,
    Root = 3,
}

export const UserRoleMap = {
    [ROLE.Visitor]: "访客",
    [ROLE.Banned]: "封禁",
    [ROLE.User]: "用户",
    [ROLE.Admin]: "管理",
    [ROLE.Root]: "超管"
};

export interface LoginReq {
    email: string;
    password: string;
}

export interface RegisterReq {
    phone: string;
    username: string;
    email: string;
    password: string;
}

export interface UserParams {
    page: number
    size: number
    title?: string
    difficulty?: number
    tag?: string
    status?: number
}

export const UserRoleColor = {
    [ROLE.Visitor]: "#999999",
    [ROLE.Banned]: "#E6A23C",
    [ROLE.User]: "#409EFF",
    [ROLE.Admin]: "#F56C6C",
    [ROLE.Root]: "#9D3DCF",
}