import { useDefineApi } from "@/stores/useDefineApi";
import type { CollectionInfo, CollectionParams } from "@/types/Collection";
import type { Page } from "@/types/misc";


export const getCollectionListApi = useDefineApi<
    {
        params: CollectionParams;
    },
    Page<"collections", CollectionInfo>
>({
    url: "/collection/",
    method: "get",
});

export const getCollectionApi = useDefineApi<
    {
        id: number;
    },
    CollectionInfo
>({
    url: "/collection",
    method: "get",
});

export const insertCollectionApi = useDefineApi<
    {
        collection: CollectionInfo;
    },
    number
>({
    url: "/collection/",
    method: "post",
});

export const updateCollectionApi = useDefineApi<
    {
        collection: CollectionInfo;
    },
    null
>({
    url: "/collection/",
    method: "put",
});

export const deleteCollectionApi = useDefineApi<
    {
        id: number;
    },
    null
>({
    url: "/collection",
    method: "delete",
});

export const insertCollectionProblemApi = useDefineApi<
    {
        collection_id: number;
        problem_id: number;
        serial: number;
    },
    null
>({
    url: "/collection/problem",
    method: "post",
});

export const updateCollectionProblemApi = useDefineApi<
    {
        collection_id: number;
        problem_id: number;
        serial: number;
    },
    null
>({
    url: "/collection/problem",
    method: "put",
});

export const deleteCollectionProblemApi = useDefineApi<
    {
        collection_id: number;
        problem_id: number;
    },
    null
>({
    url: "/collection/problem",
    method: "delete",
});

export const insertCollectionUserApi = useDefineApi<
    {
        collection_id: number;
        user_id: number;
    },
    null
>({
    url: "/collection/user",
    method: "post",
});

export const deleteCollectionUserApi = useDefineApi<
    {
        collection_id: number;
        user_id: number;
    },
    null
>({
    url: "/collection/user",
    method: "delete",
});