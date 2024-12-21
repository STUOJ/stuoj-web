import { useDefineApi } from "@/stores/useDefineApi"
import type { Tag } from "src/types/Problem";
import type {  ProblemInfo } from "src/types/Problem";
export const aiProcessApi = useDefineApi<
    {
        data: {
            //算法情景
            scenario: string;
            //算法标签id
            tags: number[];
            
        };
    },
    string
>({
    url: "/problem/info",//交互的后端https
    method: "POST"
});

//用户提交代码要提交的东西 源代码 自测输入 编程语言id 
export const codeTestApi = useDefineApi<
    {
        data: {
            sorce_code:string;
            Stdin: string;
            language_id: number;
        };
    },
    string
>({
    url: "/judge/testrun",
    method: "POST"
});
//拿到后端的所有编程语言的名称和对应的id 有一个下拉框选择编程语言 然后就可以获取id了
export const codeLanguageApi = useDefineApi<
    {
    },
    string[]
>({
    url: "",
    method: "GET"
});

//从后端拿到ai生成的各种题目信息
export const problemInfoApi = useDefineApi<
    {
    },
    ProblemInfo
>({
    url: "/api/problem",
    method: "GET"
});

export const  problemTagApi= useDefineApi<
    {

    },
    Tag[]
>({
    url: "/problem/tag",
    method: "GET"
});