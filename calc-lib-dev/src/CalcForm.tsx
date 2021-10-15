import { MenuItem, SelectChangeEvent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEffect } from "react";
import { unstable_batchedUpdates as batchedUpdates } from "react-dom";
import {
    useSelectionLocalStorage,
    useBrands,
    useModels,
    useFuels,
} from "./hooks";
import {
    BoxStyled,
    ButtonStyled,
    CircularProgressStyled,
    FormControlStyled,
    InputLabelStyled,
    SelectStyled,
} from "./components/styledMui";
import {
    Container,
    Root,
    BackgroundCircle,
    Header,
    Slogan,
} from "./components/styled";
import logo from "./logo.png";
// import { ThemeProvider } from "@emotion/react";

type SelectionsDefined = {
    brandSelectionValue: string;
    modelSelectionValue: string;
    fuelSelectionValue: string;
};
type SelectionsNever = {
    brandSelectionValue?: never;
    modelSelectionValue?: never;
    fuelSelectionValue?: never;
};
type SelectionsConditional = SelectionsDefined | SelectionsNever;
type CalcFormProps = {
    /** Set unique `id` if you are adding more than one instance. */
    id?: string;
} & SelectionsConditional;

export const CalcForm = ({
    id,
    brandSelectionValue,
    modelSelectionValue,
    fuelSelectionValue,
}: CalcFormProps) => {
    const {
        brandSelection,
        setBrandSelection,
        modelSelection,
        setModelSelection,
        fuelSelection,
        setFuelSelection,
        restoreSelection,
    } = useSelectionLocalStorage(id);
    const { areBrandsLoading, hasBrandsLoadingFailed, brands } = useBrands();
    const {
        areModelsLoading,
        hasModelsLoadingFailed,
        models,
        loadModels,
    } = useModels();
    const {
        areFuelsLoading,
        hasFuelsLoadingFailed,
        fuels,
        loadFuels,
        clearFuels,
    } = useFuels();

    useEffect(() => {
        let brandSelectionIncoming = "";
        let modelSelectionIncoming = "";
        let fuelSelectionIncoming = "";
        if (brandSelectionValue && modelSelectionValue && fuelSelectionValue) {
            brandSelectionIncoming = brandSelectionValue;
            modelSelectionIncoming = modelSelectionValue;
            fuelSelectionIncoming = fuelSelectionValue;
        } else {
            const {
                brandSelectionRestored,
                modelSelectionRestored,
                fuelSelectionRestored,
            } = restoreSelection();
            brandSelectionIncoming = brandSelectionRestored;
            modelSelectionIncoming = modelSelectionRestored;
            fuelSelectionIncoming = fuelSelectionRestored;
        }
        batchedUpdates(() => {
            setBrandSelection(brandSelectionIncoming);
            setModelSelection(modelSelectionIncoming);
            setFuelSelection(fuelSelectionIncoming);
        });

        if (!brandSelectionIncoming) return;
        loadModels(brandSelectionIncoming);

        if (!modelSelectionIncoming) return;
        loadFuels(brandSelectionIncoming, modelSelectionIncoming);
    }, [
        brandSelectionValue,
        fuelSelectionValue,
        loadFuels,
        loadModels,
        modelSelectionValue,
        restoreSelection,
        setBrandSelection,
        setFuelSelection,
        setModelSelection,
    ]);

    const onBrandChange = (e: SelectChangeEvent<unknown>) => {
        const brandInput = e.target.value;
        if (typeof brandInput !== "string") {
            let errorMsg = "Brand select input onChange target value is not ";
            errorMsg += " of type string.";
            console.error(errorMsg);
            return;
        }
        batchedUpdates(() => {
            setBrandSelection(brandInput);
            setModelSelection("");
            setFuelSelection("");
        });
        loadModels(brandInput);
        clearFuels();
    };

    const onModelChange = (e: SelectChangeEvent<unknown>) => {
        const modelInput = e.target.value;
        if (typeof modelInput !== "string") {
            let errorMsg = "Model select input onChange target value is not ";
            errorMsg += " of type string.";
            console.error(errorMsg);
            return;
        }
        if (!brandSelection) {
            let errorMsg = "Model select input onChange was called when Brand ";
            errorMsg += " select value was not set.";
            console.error(errorMsg);
            return;
        }
        batchedUpdates(() => {
            setModelSelection(modelInput);
            setFuelSelection("");
        });
        loadFuels(brandSelection, modelInput);
    };

    const onFuelChange = (e: SelectChangeEvent<unknown>) => {
        const fuelInput = e.target.value;
        if (typeof fuelInput !== "string") {
            let errorMsg = "Fuel select input onChange target value is not ";
            errorMsg += " of type string.";
            console.error(errorMsg);
            return;
        }
        setFuelSelection(fuelInput);
    };

    const isBrandSelectDisabled = areBrandsLoading || hasBrandsLoadingFailed;

    const isModelSelectDisabled =
        areBrandsLoading || areModelsLoading || hasModelsLoadingFailed;

    const isFuelSelectDisabled =
        areBrandsLoading ||
        areModelsLoading ||
        areFuelsLoading ||
        hasFuelsLoadingFailed;

    let buttonHref = "";
    let isButtonDisabled =
        !brandSelection ||
        !modelSelection ||
        !fuelSelection ||
        isBrandSelectDisabled ||
        isModelSelectDisabled ||
        isFuelSelectDisabled;
    if (!isButtonDisabled) {
        buttonHref = "https://punkta.pl/ubezpieczenie-oc-ac/kalkulator-oc-ac?";
        buttonHref += `make_name=${brandSelection}&model_name=${modelSelection}`;
    }

    return (
        // <ThemeProvider theme={{ colors: { primary: "#ff0000" }}}>
        <Root>
            <BackgroundCircle />
            <Container>
                <Header>
                    <img alt="logo" src={logo} />
                    <Slogan>
                        Oszczędź nawet
                        <br />
                        580 złotych na OC
                    </Slogan>
                </Header>
                <BoxStyled component="form">
                    <FormControlStyled
                        fullWidth
                        disabled={isBrandSelectDisabled}
                    >
                        <InputLabelStyled id="brand">Marka</InputLabelStyled>
                        <SelectStyled
                            value={brandSelection}
                            labelId="brand"
                            label="Marka"
                            onChange={onBrandChange}
                        >
                            {brands.map((brand) => (
                                <MenuItem
                                    key={brand.make_code}
                                    value={brand.make_name}
                                >
                                    {brand.make_name}
                                </MenuItem>
                            ))}
                        </SelectStyled>
                        {areBrandsLoading && (
                            <CircularProgressStyled size={24} />
                        )}
                    </FormControlStyled>
                    <FormControlStyled
                        fullWidth
                        disabled={isModelSelectDisabled}
                    >
                        <InputLabelStyled id="model">Model</InputLabelStyled>
                        <SelectStyled
                            value={modelSelection}
                            labelId="model"
                            label="Model"
                            onChange={onModelChange}
                        >
                            {models.map((model) => (
                                <MenuItem
                                    key={model.model_name}
                                    value={model.model_name}
                                >
                                    {model.model_name}
                                </MenuItem>
                            ))}
                        </SelectStyled>
                        {areModelsLoading && (
                            <CircularProgressStyled size={24} />
                        )}
                    </FormControlStyled>
                    <FormControlStyled
                        fullWidth
                        disabled={isFuelSelectDisabled}
                    >
                        <InputLabelStyled id="oil">Typ paliwa</InputLabelStyled>
                        <SelectStyled
                            value={fuelSelection}
                            labelId="oil"
                            label="Typ Paliwa"
                            onChange={onFuelChange}
                        >
                            {fuels.map((fuel) => (
                                <MenuItem
                                    key={fuel.fuel_code}
                                    value={fuel.fuel_name}
                                >
                                    {fuel.fuel_name}
                                </MenuItem>
                            ))}
                        </SelectStyled>
                        {areFuelsLoading && (
                            <CircularProgressStyled size={24} />
                        )}
                    </FormControlStyled>
                    <ButtonStyled
                        href={buttonHref}
                        fullWidth
                        endIcon={<ArrowForwardIcon />}
                        disabled={isButtonDisabled}
                    >
                        Oblicz składkę
                    </ButtonStyled>
                </BoxStyled>
            </Container>
        </Root>
        // </ThemeProvider>
    );
};
