import type { OrderBy } from "./misc";
import type { ProblemInfo } from "./Problem";
import type { UserInfo } from "./User";

export interface CollectionInfo {
    create_time: string;
    description: string;
    id: number;
    problem_ids: number[];
    problems: ProblemInfo[] | null;
    status: CollectionStatus;
    title: string;
    update_time: string;
    user: UserInfo;
    user_ids: number[];
    [property: string]: any;
}

export enum CollectionStatus {
    Public = 2,
    Private = 1,
}

export const CollectionStatusMap = {
    [CollectionStatus.Public]: "公开",
    [CollectionStatus.Private]: "私有",
}

export interface CollectionProblem {
    problem_id: number;
    collection_id: number;
    serial: number;
    [property: string]: any;
}

export interface CollectionUser {
    user_id: number;
    collection_id: number;
    [property: string]: any;
}

export interface CollectionParams {
    page: number,
    size: number,
    title?: string,
    user?: number,
    problem?: number[],
    status?: string,
    order?: string,
    order_by?: OrderBy,
    "start-time"?: string,
    "end-time"?: string
}