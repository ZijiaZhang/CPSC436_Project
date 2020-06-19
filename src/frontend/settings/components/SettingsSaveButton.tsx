import * as React from "react";
import {ButtonState} from "../../shared/enums/ButtonState";
import {IButtonState} from "../../shared/interfaces/IButtonState";

export class SettingsSaveButton extends React.Component<{}, IButtonState> {
    constructor(props: {}) {
        super(props);
        this.state = {buttonState: ButtonState.ENABLED};
    }

    render() {
        return <button className={'settings-save-button'}>Save</button>;
    }
}
