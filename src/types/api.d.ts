export type ApiResponse<T> = {
    data: T;
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
}