export interface PaginationResult {
    previousPage: number | null;
    currentPage: number;
    nextPage: number | null;
    total: number;
    totalPages: number;
    pageSize: number;
    offset?: number;
}

export function getLimitAndOffset(page?: number, pageSize?: number): { limit: number; offset: number; pageSize: number } {
    page = page ? page : 1;
    pageSize = pageSize ? pageSize : 10;
    const limit = parseInt(pageSize.toString());
    const offset = (parseInt(page.toString()) - 1) * pageSize;
    return { limit, offset, pageSize };
}

export async function pagination(page?: number, pageSize?: number, total?: number): Promise<PaginationResult> {
    let pagesize: number, previouspage: number | null, nextpage: number | null, totalPages: number;
    page = page ? parseInt(page.toString()) : 1;
    pageSize = pageSize ? pageSize : 10;
    pagesize = parseInt(pageSize.toString());
    previouspage = (page <= 1) ? null : page - 1;
    nextpage = ((total! / pagesize) > page) ? page + 1 : null;
    totalPages = total! < pageSize ? 1 : Math.ceil(total! / pageSize);

    return {
        previousPage: previouspage,
        currentPage: page,
        nextPage: nextpage,
        total: total!,
        totalPages: totalPages,
        pageSize: pagesize,
    };
}
