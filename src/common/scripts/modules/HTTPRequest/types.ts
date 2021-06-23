import { RequestOptions } from '~common/scripts/modules/Request/types';

export type HTTPRequestProps = Omit<RequestOptions, 'method' | 'url'>;
