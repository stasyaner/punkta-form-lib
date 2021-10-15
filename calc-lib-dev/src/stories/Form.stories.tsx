import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CalcForm } from "../CalcForm";

export default {
    title: "Form",
    component: CalcForm,
} as ComponentMeta<typeof CalcForm>;

const Template: ComponentStory<typeof CalcForm> = (args) => (
    <CalcForm {...args} />
);

export const Basic = Template.bind({});

export const WithId = Template.bind({});
WithId.args = {
    id: "formWithIdExample",
};

export const WithPredefinedSelections = Template.bind({});
WithPredefinedSelections.args = {
    id: "formPredefinedSelections",
    brandSelectionValue: "AUDI",
    modelSelectionValue: "A3",
    fuelSelectionValue: "Benzyna",
};
