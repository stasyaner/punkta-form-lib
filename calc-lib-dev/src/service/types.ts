export type Brand = {
    make_code: string;
    make_name: string;
};
export type BrandsResponse = Array<Partial<Brand>>;

export type Model = {
    model_name: string;
};
export type ModelsResponse = Array<Partial<Model>>;

export type Fuel = {
    fuel_code: string;
    fuel_name: string;
};
export type FuelsResponse = Array<Partial<Fuel>>;
