const BASE_URL = "https://api-dev.mfind.pl";
export const AUTH_TOKEN = "YXV0a2FfYXBpOmF1dGthX2FwaV8yMDE5";

export type ApiEndpointConfig = {
    getBrandsEndpoint: () => string;
    getModelsEndpoint: (brand: string) => string;
    getFuelsEndpoint: (brand: string, model: string) => string;
};

export const apiEndpointConfig: ApiEndpointConfig = {
    getBrandsEndpoint: () => `${BASE_URL}/cars`,
    getModelsEndpoint: (brand) => `${BASE_URL}/cars/${brand}/models`,
    getFuelsEndpoint: (brand, model) =>
        `${apiEndpointConfig.getModelsEndpoint(brand)}/${model}/fuels`,
};
