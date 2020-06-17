import * as React from "react";
import {ButtonStateEnum} from "../../shared/enums/ButtonStateEnum";
import {IButtonState} from "../../shared/interfaces/IButtonState";

export class SettingsSaveButton extends React.Component<{}, IButtonState> {
    constructor(props: {}) {
        super(props);
        this.state = {buttonState: ButtonStateEnum.ENABLED};
    }

    render() {
        return <button className={'settings-save-button'}>Save</button>;
    }
}
