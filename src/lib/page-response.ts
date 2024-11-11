export interface PageResponse<T> {
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totatRecords: number,
    content: T[]
}