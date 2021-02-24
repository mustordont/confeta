export interface ICoreUser {
    login: string;
    token: string;
}

interface TokenDataInterface {
    sub: string;
    exp: number;
}

export class CoreUserModel {
    public readonly login: string;
    public readonly token: string;

    constructor(data: ICoreUser) {
        this.login = data.login;
        this.token = data.token;
    }
}
