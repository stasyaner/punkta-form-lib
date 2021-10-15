import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Page } from "./Page";

export default {
    title: "Page with form(s)",
    component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const OneForm = Template.bind({});
OneForm.args = {
    numberOfForms: 1,
};

export const TwoForms = Template.bind({});
TwoForms.args = {
    numberOfForms: 2,
};
