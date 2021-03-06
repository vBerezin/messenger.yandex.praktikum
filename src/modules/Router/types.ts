export enum RouterEvents {
    start = 'router:start',
    error = 'router:error',
}

export type RouterCallback = (data: any) => void;
