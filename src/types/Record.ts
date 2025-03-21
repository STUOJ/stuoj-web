import type { UserInfo } from "./User";
import type { JudgeStatus } from "./Judge";
import type { ProblemInfo } from "./Problem";
import type { OrderBy } from "./misc";

export interface Submission {
    create_time: string;
    id: number;
    language_id: number;
    length: number;
    memory?: number;
    problem: ProblemInfo;
    score?: number;
    source_code?: string;
    status: JudgeStatus;
    time?: number;
    update_time: string;
    user: UserInfo;
    [property: string]: any;
}


export interface Judgement {
    compile_output?: string;
    id?: number;
    memory?: number;
    message?: string;
    status?: JudgeStatus;
    stderr?: string;
    stdout?: string;
    submission_id?: number;
    testcase_id?: number;
    time?: number;
    [property: string]: any;
}

export interface RecordParams {
    page: number,
    size?: number,
    "end-time"?: string,
    language?: number,
    problem?: string,
    order?: string,
    order_by?: OrderBy,
    "start-time"?: string,
    status?: JudgeStatus,
    user?: string,
    exclude_history?: boolean,
}