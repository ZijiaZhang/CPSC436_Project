import * as React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import {loadUserInfo} from "../actions";
import CreatableSelect from 'react-select/creatable';
import {ITag, IUser} from "../../../shared/ModelInterfaces";
import {updateUserInfo} from "../../shared/globleFunctions";

export interface ISettingsFormProps {
    opened: boolean,
    userInfo: IUser,
    loadUserInfo: any,
    name: string,
    gender: string,
    department: string,
    major: string,
    level: string,
    tags: ITag[],
    userInfoOnChange: any,
    interestsOnChange: any,
}

export interface ISettingsFormState {
    editing: boolean,
    imageFile: any,
    imagePreview: any,
}

export enum GenderOption {
    Female = 'Female',
    Male = 'Male',
    Other = 'Other',
    RatherNotSay = 'Rather Not Say'
}

export enum AcademicLevel {
    Bachelor = 'Bachelor',
    Master = 'Master',
    PhD = 'PhD'
}

class SettingsForm extends React.Component<ISettingsFormProps, ISettingsFormState> {
    constructor(props: ISettingsFormProps) {
        super(props);
        this.state = {
            editing: false,
            imageFile: null,
            imagePreview: "./not_uploaded",
        }
    }

    saveEdit = async (event: any) => {
        event.preventDefault();
        const updatedUser = {
            fullname: this.props.name,
            gender: this.props.gender,
            department: this.props.department,
            major: this.props.major,
            level: this.props.level,
            tags: this.props.tags,
        };
        let data = await updateUserInfo(this.props.userInfo.username, updatedUser);
        this.props.loadUserInfo(data);
        this.cancelEdit();
    };

    cancelEdit = () => {
        this.setState({editing: !this.state.editing});
    };


    render() {
        const options = [
            { value: 'Course Staff', label: 'Course Staff' },
            { value: 'Campus Event', label: 'Campus Event' },
            { value: 'Entertainment', label: 'Entertainment' },
        ];
        return <Modal className="user-profile-editor" isOpen={this.props.opened != this.state.editing}>
            <form className={'settings-form'}>
                <div className={'settings-item'}>
                    <label className={'settings-item-label'}>Name</label>
                    <input className={'settings-item-input'} type="text" name="name" value={this.props.name} onChange={this.props.userInfoOnChange}/>
                </div>
                <div className={'settings-item'}>
                    <label className={'settings-item-label'}>Gender</label>
                    <select className={'settings-item-input'} name="gender" value={this.props.gender} onChange={this.props.userInfoOnChange}>
                        <option value={GenderOption.Female}>{GenderOption.Female}</option>
                        <option value={GenderOption.Male}>{GenderOption.Male}</option>
                        <option value={GenderOption.Other}>{GenderOption.Other}</option>
                        <option value={GenderOption.RatherNotSay}>{GenderOption.RatherNotSay}</option>
                    </select>
                </div>
                <div className={'settings-item'}>
                    <label className={'settings-item-label'}>Department</label>
                    <input className={'settings-item-input'} type="text" name="department" value={this.props.department} onChange={this.props.userInfoOnChange}/>
                </div>
                <div className={'settings-item'}>
                    <label className={'settings-item-label'}>Major</label>
                    <input className={'settings-item-input'} type="text" name="major" value={this.props.major} onChange={this.props.userInfoOnChange}/>
                </div>
                <div className={'settings-item'}>
                    <label className={'settings-item-label'}>Academic Year</label>
                    <select className={'settings-item-input'} name="level" value={this.props.level} onChange={this.props.userInfoOnChange}>
                        <option value={AcademicLevel.Bachelor}>{AcademicLevel.Bachelor}</option>
                        <option value={AcademicLevel.Master}>{AcademicLevel.Master}</option>
                        <option value={AcademicLevel.PhD}>{AcademicLevel.PhD}</option>
                    </select>
                </div>
                <div className={'settings-item height-md'}>
                    <label className={'settings-item-label'}>Interests</label>
                    <CreatableSelect isMulti={true} options={options} onChange={this.props.interestsOnChange} className="settings-tag-container" />
                </div>
                <div className="profile-settings-buttons-block">
                    <button className="profile-settings-button" onClick={this.saveEdit}>
                        Save Edit
                    </button>
                    <button className="profile-settings-button" onClick={this.cancelEdit}>
                        Cancel Edit
                    </button>
                </div>
            </form>
        </Modal>;
    }
}
const mapStateToProps = (state: { userInfo: any }) => {
    return {
        userInfo: state.userInfo,
    };
};

export default connect(mapStateToProps, {loadUserInfo})(SettingsForm);