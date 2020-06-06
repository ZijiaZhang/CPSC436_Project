import * as React from "react";

export interface SaveSettingsButtonState {
    saveButtonState: SettingsSaveButtonStateEnum
}

export enum SettingsSaveButtonStateEnum {
    enabled,
    disabled
}

export class SettingsSaveButton extends React.Component<{}, SaveSettingsButtonState> {
    constructor(props: {}) {
        super(props);
        this.state = {saveButtonState: SettingsSaveButtonStateEnum.enabled};
    }

    render() {
        return <button className={'settings-save-button'}>Save</button>;
    }
}
