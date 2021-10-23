export type TemplatorCompiler = (data: Record<string, any>) => string;

export type TemplatorProps = {
    compiler: TemplatorCompiler;
    props?: {
        [key: string]: any;
    };
};
