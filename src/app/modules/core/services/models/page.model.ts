export interface IGetPageResponse<I> {
    totalCount: number; // Общее количество кампаний, найденных по заданному фильтру
    items: I[];
}

type ParameterlessConstructor<R, M> = new(R: any) => M;

export class PageModel<I, M> {
    public readonly totalCount: number;
    public readonly items: M[] = [];
    constructor(
        private model: ParameterlessConstructor<I, M>,
        data: IGetPageResponse<I>
    ) {
        this.totalCount = data.totalCount;
        if (Array.isArray(data.items)) {
            this.items = data.items.map(i => new this.model(i));
        }
    }
}
