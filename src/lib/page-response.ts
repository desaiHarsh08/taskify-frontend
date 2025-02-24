export interface PageResponse<T> {
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalRecords: number,
    content: T[]
}