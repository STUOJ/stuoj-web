import {Colors} from "@/types/Colors";

export interface UserInfo {
    /**
     * 用户头像
     */
    avatar: string;
    create_time?: string;
    email?: string;
    id: number;
    role: Role;
    signature?: string;
    update_time?: string;
    username: string;
    [property: string]: any;
}

export enum Role {
    Visitor = 0,
    User = 1,
    Editor = 2,
    Admin = 3,
    Root = 4,
}

export const UserRoleMap = {
    [Role.Visitor]: "访客",
    [Role.User]: "用户",
    [Role.Editor]: "编辑",
    [Role.Admin]: "管理",
    [Role.Root]: "站长",
};

export const UserRoleColor = {
    [Role.Visitor]: Colors.gray9,
    [Role.User]: Colors.blue,
    [Role.Editor]: Colors.green,
    [Role.Admin]: Colors.yellow,
    [Role.Root]: Colors.red,
}

export interface LoginReq{
    email: string;
    password: string;
}

export interface RegisterReq{
    email: string;
    password: string;
    verify_code: string;
}

export interface UserParams {
    page: number,
    size: number,
    title?: string,
    difficulty?: number,
    tag?: string,
    status?: number,
    order?: string,
    order_by?: string
}
