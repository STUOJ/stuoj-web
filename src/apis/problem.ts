import { useDefineApi } from "@/stores/useDefineApi";
import type { FpsProblemInfo, FpsSolution, FpsTestcase, Global, ProblemHistory, ProblemInfo, ProblemParams, Solution, Tag, Testcase } from "@/types/Problem";
import type { Page } from "@/types/misc";

export const getProblemListApi = useDefineApi<
    {
        params: ProblemParams;
    },
    Page<"problems", ProblemInfo>
>({
    url: "/problem/",
    method: "get"
});

export const getProblemApi = useDefineApi<
    {
        id: number
    },
    {
        problem: ProblemInfo
        tags?: Tag[]
        solutions?: Solution[]
        testcases?: Testcase[]
    }
>({
    url: "/problem",
    method: "get"
});

export const getProblemTagsApi = useDefineApi<
    {},
    Tag[]
>({
    url: "/problem/tag",
    method: "get"
});

export const uploadProblemApi = useDefineApi<
    {
        data: ProblemInfo
    },
    number
>({
    url: "/admin/problem",
    method: "post"
})

export const updateProblemApi = useDefineApi<
    {
        data: ProblemInfo
    },
    null
>({
    url: "/admin/problem",
    method: "put"
})

export const deleteProblemApi = useDefineApi<
    {
        id: number
    },
    null
>({
    url: "/admin/problem",
    method: "delete"
})

export const problemAddTagApi = useDefineApi<
    {
        data: {
            problem_id: number,
            tag_id: number
        }
    },
    null
>({
    url: "/admin/problem/tag",
    method: "post"
})

export const problemRemoveTagApi = useDefineApi<
    {
        data: {
            problem_id: number,
            tag_id: number
        }
    },
    null
>({
    url: "/admin/problem/tag",
    method: "delete"
})

export const getTestcaseApi = useDefineApi<
    {
        id: number
    },
    Testcase
>({
    url: "/admin/testcase",
    method: "get"
})

export const uploadTestcaseApi = useDefineApi<
    {
        data: Testcase
    },
    number
>({
    url: "/admin/testcase",
    method: "post"
})

export const updateTestcaseApi = useDefineApi<
    {
        data: Testcase
    },
    null
>({
    url: "/admin/testcase",
    method: "put"
})

export const deleteTestcaseApi = useDefineApi<
    {
        id: number
    },
    null
>({
    url: "/admin/testcase",
    method: "delete"
})

export const datamakeApi = useDefineApi<
    { data: Global },
    string
>({
    url: "/admin/testcase/datamake",
    method: "post"
})

export const getSolutionApi = useDefineApi<
    {
        id: number
    },
    Solution
>({
    url: "/admin/solution",
    method: "get"
})

export const uploadSolutionApi = useDefineApi<
    {
        data: Solution
    },
    number
>({
    url: "/admin/solution",
    method: "post"
})

export const updateSolutionApi = useDefineApi<
    {
        data: Solution
    },
    null
>({
    url: "/admin/solution",
    method: "put"
})

export const deleteSolutionApi = useDefineApi<
    {
        id: number
    },
    null
>({
    url: "/admin/solution",
    method: "delete"
})

export const getProblemHistoryApi = useDefineApi<
    {
        id: number
    },
    ProblemHistory
>({
    url: "/problem/history",
    method: "get"
})

export const uploadFPSApi = useDefineApi<
    {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: FormData
    },
    {
        problem: FpsProblemInfo
        solutions: FpsSolution[]
        testcases: FpsTestcase[]
    }[]
>({
    url: "/admin/problem/fps",
    method: "post"
})