export type Role = {
    id: number;
    name: string;
    permission: Permissions[];
}

export type Permissions = {
    id: number;
    module: string;
    function: string;
    action: string;
}
