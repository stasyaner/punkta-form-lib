import { apiEndpointConfig } from "../config/api";
import {
    Brand,
    BrandsResponse,
    Fuel,
    FuelsResponse,
    Model,
    ModelsResponse,
} from "./types";
import { fetchApi } from "./utils";

const INSUFFICIENT_RETURN_ERROR = "Insufficient API call return.";
const UNEXPECTED_ERROR = "Unexpected error occured during API call.";

export async function brandsService(): Promise<Brand[] | null> {
    const url = apiEndpointConfig.getBrandsEndpoint();
    const result = await fetchApi<BrandsResponse>(url);

    if (!result) {
        console.error(UNEXPECTED_ERROR);
        return null;
    }

    if (
        !Array.isArray(result) ||
        result.some((item) => !item.make_code || !item.make_name)
    ) {
        console.error(INSUFFICIENT_RETURN_ERROR);
        return null;
    }

    return result as Brand[];
}

export async function modelsService(brand: string): Promise<Model[] | null> {
    const url = apiEndpointConfig.getModelsEndpoint(brand);
    const result = await fetchApi<ModelsResponse>(url);

    if (!result) {
        console.error(UNEXPECTED_ERROR);
        return null;
    }

    if (!Array.isArray(result) || result.some((item) => !item.model_name)) {
        console.error(INSUFFICIENT_RETURN_ERROR);
        return null;
    }

    return result as Model[];
}

export async function fuelsService(
    brand: string,
    model: string
): Promise<Fuel[] | null> {
    const url = apiEndpointConfig.getFuelsEndpoint(brand, model);
    const result = await fetchApi<FuelsResponse>(url);

    if (!result) {
        console.error(UNEXPECTED_ERROR);
        return null;
    }

    if (
        !Array.isArray(result) ||
        result.some((item) => !item.fuel_code || !item.fuel_name)
    ) {
        console.error(INSUFFICIENT_RETURN_ERROR);
        return null;
    }

    return result as Fuel[];
}
