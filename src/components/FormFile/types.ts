import { ButtonProps } from '~components/Button/types';

export type FormFileProps = {
    action?: string;
    input: {
        name: string;
        accept?: string[];
    };
    button: ButtonProps;
    onSubmit(event: Event, ...args): void;
};

export type FormFileState = {
    value?: null | {
        file: File;
        name: string;
    };
};
