import { MCField } from "./mc-field";

export class MCFormWizardStep {
    title?: string;
    fields: MCField[] = [];
}

export class MCConfigFormWizard {
    steps: MCFormWizardStep[] = [];
    item: any;
}
