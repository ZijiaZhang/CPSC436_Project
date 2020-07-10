import * as React from "react";
import {IUser} from "../../posts_page/components/UserBlock";
import Modal from "react-modal";
import {connect} from "react-redux";
import {loadUserInfo} from "../actions";
import CreatableSelect from 'react-select/creatable';

export interface ISettingsFormProps {
    opened: boolean,
    userInfo: IUser,
    loadUserInfo: any,
}

export interface ISettingsFormState {
    editing: boolean,
    name: string,
    gender: string,
    department: string,
    avatarPath: string,
    major: string,
    level: string,
    interests: string[],
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

const tags=['games', 'volleyball', 'reading'];

class SettingsForm extends React.Component<ISettingsFormProps, ISettingsFormState> {
    constructor(props: ISettingsFormProps) {
        super(props);
        this.state = {
            editing: false,
            name: this.props.userInfo.name,
            gender: this.props.userInfo.gender,
            department: this.props.userInfo.department,
            avatarPath: this.props.userInfo.avatarPath,
            major: this.props.userInfo.major,
            level: this.props.userInfo.level,
            interests: this.props.userInfo.interests,
        }
    }

    userInfoOnChange = (event: any) => {
        switch (event.target.name) {
            case "name":
                this.setState({name: event.target.value});
                break;
            case "gender":
                this.setState({gender: event.target.value});
                break;
            case "department":
                this.setState({department: event.target.value});
                break;
            case "avatarPath":
                this.setState({avatarPath: event.target.value});
                break;
            case "major":
                this.setState({major: event.target.value});
                break;
            case "level":
                this.setState({level: event.target.value});
                break;
            default:
                break;
        }
    };

    interestsOnChange = (newValue: any) => {
        let tagList = [];
        for (let tag of newValue) {
            tagList.push(tag.value);
        }
        this.setState({interests: tagList});
    };

    saveEdit = () => {
        const updatedUser: IUser = {
            name: this.state.name,
            gender: this.state.gender,
            avatarPath: this.state.avatarPath,
            department: this.state.department,
            major: this.state.major,
            level: this.state.level,
            interests: this.state.interests,
            friends: this.props.userInfo.friends
        };
        this.props.loadUserInfo(updatedUser);
        this.setState({editing: !this.state.editing});
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
                    <input className={'settings-item-input'} type="text" name="name" value={this.state.name} onChange={this.userInfoOnChange}/>
                </div>
                <div className={'settings-item'}>
                    <label className={'settings-item-label'}>Gender</label>
                    <select className={'settings-item-input'} name="gender" value={this.state.gender} onChange={this.userInfoOnChange}>
                        <option value={GenderOption.Female}>{GenderOption.Female}</option>
                        <option value={GenderOption.Male}>{GenderOption.Male}</option>
                        <option value={GenderOption.Other}>{GenderOption.Other}</option>
                        <option value={GenderOption.RatherNotSay}>{GenderOption.RatherNotSay}</option>
                    </select>
                </div>
                <div className={'settings-item'}>
                    <label className={'settings-item-label'}>Department</label>
                    <input className={'settings-item-input'} type="text" name="department" value={this.state.department} onChange={this.userInfoOnChange}/>
                </div>
                <div className={'settings-item'}>
                    <label className={'settings-item-label'}>Major</label>
                    <input className={'settings-item-input'} type="text" name="major" value={this.state.major} onChange={this.userInfoOnChange}/>
                </div>
                <div className={'settings-item'}>
                    <label className={'settings-item-label'}>Academic Year</label>
                    <select className={'settings-item-input'} name="level" value={this.state.level} onChange={this.userInfoOnChange}>
                        <option value={AcademicLevel.Bachelor}>{AcademicLevel.Bachelor}</option>
                        <option value={AcademicLevel.Master}>{AcademicLevel.Master}</option>
                        <option value={AcademicLevel.PhD}>{AcademicLevel.PhD}</option>
                    </select>
                </div>
                <div className={'settings-item height-md'}>
                    <label className={'settings-item-label'}>Interests</label>
                    <CreatableSelect isMulti={true} options={options} onChange={this.interestsOnChange} className="settings-tag-container" />
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