export interface PostInfo {
    id?: string;
    author: string;
    content: string;
    created_at?: string;
    deleted_at?: string;
    updated_at?: string;
}

export type ApiResponse<T = object> = {
    message: string;
    data: T;
};
