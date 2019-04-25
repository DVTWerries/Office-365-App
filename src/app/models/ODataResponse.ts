export interface ODataResponse<T> {
    '@odata.context': string;
    '@odata.nextLink': string;
    value: T[];
}
