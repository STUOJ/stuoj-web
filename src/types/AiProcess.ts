
// //
// export interface ProblemInfo {
//    title:string;
//    description:string;
//    input:string;
//    output:string;
//    sample_input:string;
//    sampel_output:string;
//    hint:string;
//    tags:string[];
//    solution:string;
// }
export interface CodeSubmit {
    language_id:number;
    sourse_code:string;
    std_input:string;
}

export interface ProblemSubmit {
    title:string;
    description:string;
    input?:string;
    output?:string;
    Sample_input?:string;
    Sample_output?:string;
    Hint?:string;
    Solution?:string;
    //tagsId:number[];
    Tags?:string[];
}