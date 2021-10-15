import { useState, useEffect, useCallback, useMemo } from "react";
import { Brand, Model, Fuel } from "../service/types";
import { unstable_batchedUpdates as batchedUpdates } from "react-dom";
import { brandsService, fuelsService, modelsService } from "../service";

type UseBrands = {
    areBrandsLoading: boolean;
    hasBrandsLoadingFailed: boolean;
    brands: Brand[];
};
export const useBrands = (): UseBrands => {
    const [areBrandsLoading, setAreBrandsLoading] = useState(true);
    const [hasBrandsLoadingFailed, setHasBrandsLoadingFailed] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);

    useEffect(() => {
        void (async () => {
            const newBrands = await brandsService();
            if (!newBrands) {
                console.error("Brands loading failed.");
                setHasBrandsLoadingFailed(true);
                return;
            }
            batchedUpdates(() => {
                setAreBrandsLoading(false);
                setBrands(newBrands);
            });
        })();
    }, []);

    return {
        areBrandsLoading,
        hasBrandsLoadingFailed,
        brands,
    };
};

type UseModels = {
    areModelsLoading: boolean;
    hasModelsLoadingFailed: boolean;
    models: Model[];
    loadModels: (brand: string) => Promise<void>;
};
export const useModels = (): UseModels => {
    const [areModelsLoading, setAreModelsLoading] = useState(false);
    const [hasModelsLoadingFailed, setHasModelsLoadingFailed] = useState(false);
    const [models, setModels] = useState<Model[]>([]);

    const loadModels = useCallback(async (brand: string) => {
        if (!brand) {
            let errorMsg = "Empty string was provided as brand name to";
            errorMsg += " loadModels function.";
            console.error(errorMsg);
            setHasModelsLoadingFailed(true);
            return;
        }
        setAreModelsLoading(true);
        const newModels = await modelsService(brand);
        if (!newModels) {
            console.error("Models loading failed.");
            setHasModelsLoadingFailed(true);
            return;
        }
        batchedUpdates(() => {
            setAreModelsLoading(false);
            setModels(newModels);
        });
    }, []);

    return {
        areModelsLoading,
        hasModelsLoadingFailed,
        models,
        loadModels,
    };
};

type UseFuels = {
    areFuelsLoading: boolean;
    hasFuelsLoadingFailed: boolean;
    fuels: Fuel[];
    loadFuels: (brand: string, model: string) => Promise<void>;
    clearFuels: () => void;
};
export const useFuels = (): UseFuels => {
    const [areFuelsLoading, setAreFuelsLoading] = useState(false);
    const [hasFuelsLoadingFailed, setHasFuelsLoadingFailed] = useState(false);
    const [fuels, setFuels] = useState<Fuel[]>([]);

    const loadFuels = useCallback(async (brand: string, model: string) => {
        if (!brand) {
            let errorMsg = "Empty string was provided as brand name to";
            errorMsg += " loadModels function.";
            console.error(errorMsg);
            setHasFuelsLoadingFailed(true);
            return;
        }
        if (!model) {
            let errorMsg = "Empty string was provided as model name to";
            errorMsg += " loadFuels function.";
            console.error(errorMsg);
            setHasFuelsLoadingFailed(true);
            return;
        }
        setAreFuelsLoading(true);
        const newFuels = await fuelsService(brand, model);
        if (!newFuels) {
            console.error("Fuels loading failed.");
            setHasFuelsLoadingFailed(true);
            return;
        }
        batchedUpdates(() => {
            setAreFuelsLoading(false);
            setFuels(newFuels);
        });
    }, []);

    const clearFuels = () => {
        if (areFuelsLoading) {
            const errorMsg = "Can't clear fuels while loading.";
            console.error(errorMsg);
            return;
        }
        setFuels([]);
    };

    return {
        areFuelsLoading,
        hasFuelsLoadingFailed,
        fuels,
        loadFuels,
        clearFuels,
    };
};

type SelectionRestored = {
    brandSelectionRestored: string;
    modelSelectionRestored: string;
    fuelSelectionRestored: string;
};
type UseSelectionLocalStorage = {
    restoreSelection: () => SelectionRestored;
    brandSelection: string;
    setBrandSelection: (value: string) => void;
    modelSelection: string;
    setModelSelection: (value: string) => void;
    fuelSelection: string;
    setFuelSelection: (value: string) => void;
};
export const useSelectionLocalStorage = (
    formId: string = ""
): UseSelectionLocalStorage => {
    const [brandSelection, setBrandSelection] = useState("");
    const [modelSelection, setModelSelection] = useState("");
    const [fuelSelection, setFuelSelection] = useState("");

    // useEffect(() => {
    //     batchedUpdates(() => {
    //         if (brandSelectionValue) setBrandSelection(brandSelectionValue);
    //         if (modelSelectionValue) setModelSelection(modelSelectionValue);
    //         if (fuelSelectionValue) setFuelSelection(fuelSelectionValue);
    //     });
    // }, [brandSelectionValue, fuelSelectionValue, modelSelectionValue]);

    const selectionKey = useMemo(
        () => ({
            brand: formId + "brandSelection",
            model: formId + "modelSelection",
            fuel: formId + "fuelSelection",
        }),
        [formId]
    );

    const restoreSelectionFromStorage = useCallback(() => {
        const brandSelectionRestored =
            localStorage.getItem(selectionKey.brand) ?? "";
        const modelSelectionRestored =
            localStorage.getItem(selectionKey.model) ?? "";
        const fuelSelectionRestored =
            localStorage.getItem(selectionKey.fuel) ?? "";

        return {
            brandSelectionRestored,
            modelSelectionRestored,
            fuelSelectionRestored,
        };
    }, [selectionKey.brand, selectionKey.fuel, selectionKey.model]);

    const setBrandSelectionLocalStorage = useCallback(
        (value: string) => {
            setBrandSelection(value);
            try {
                localStorage.setItem(selectionKey.brand, value);
            } catch (e: unknown) {
                console.error(e);
            }
        },
        [selectionKey.brand]
    );

    const setModelSelectionLocalStorage = useCallback(
        (value: string) => {
            setModelSelection(value);
            try {
                localStorage.setItem(selectionKey.model, value);
            } catch (e: unknown) {
                console.error(e);
            }
        },
        [selectionKey.model]
    );

    const setFuelSelectionLocalStorage = useCallback(
        (value: string) => {
            setFuelSelection(value);
            try {
                localStorage.setItem(selectionKey.fuel, value);
            } catch (e: unknown) {
                console.error(e);
            }
        },
        [selectionKey.fuel]
    );

    return {
        restoreSelection: restoreSelectionFromStorage,
        brandSelection,
        setBrandSelection: setBrandSelectionLocalStorage,
        modelSelection,
        setModelSelection: setModelSelectionLocalStorage,
        fuelSelection,
        setFuelSelection: setFuelSelectionLocalStorage,
    };
};
