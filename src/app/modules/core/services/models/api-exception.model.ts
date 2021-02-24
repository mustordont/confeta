export interface IApiException {
    message: string;
    code?: string | undefined;
    status?: string;
}

export class ApiException implements IApiException {
    public readonly message: string;
    public readonly code: string | undefined;
    constructor(data: IApiException) {
        this.message = data.message;
        this.code = data.code || data.status;
    }

    toString(): string {
        return `[${this.code}] ${this.message}`;
    }
}
