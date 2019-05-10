export interface ODataResponse<T> {
    '@odata.nextLink': string;
    value: T;
}
