import * as React from 'react';
import {AcademicYearEnum, GenderEnum, SettingsForm} from "./SettingsForm";
import {SettingsSaveButton} from "./SettingsSaveButton";

const Settings = () => {
    return (
        <div className={'height-lg'}>
            <h1>Settings</h1>
            <SettingsForm name={'Denise'} gender={GenderEnum.RatherNotSay} major={'Computer Science'} year={AcademicYearEnum.Three} chosenTags={['music', 'basketball', 'math']} tags={['games', 'volleyball', 'reading']}/>
            <SettingsSaveButton/>
        </div>
    );
};

export default Settings;
