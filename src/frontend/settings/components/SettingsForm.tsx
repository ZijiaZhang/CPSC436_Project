import * as React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import {loadDisplayedUser, loadUserInfo, addTag} from "../actions";
import CreatableSelect from 'react-select/creatable';
import {ITag, IUser} from "../../../shared/ModelInterfaces";
import {addNewTag, updateUserInfo} from "../../shared/globleFunctions";
import {requestAPIJson} from "../../shared/Networks";

export interface ISettingsFormProps {
    opened: boolean,
    userInfo: IUser,
    loadUserInfo: any,
    name: string,
    gender: string,
    department: string,
    major: string,
    level: string,
    tags: any[],
    userInfoOnChange: any,
    interestsOnChange: any,
    loadDisplayedUser: any,
    tagList: ITag[],
    addTag: any
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
        let tagList = [];
        if (this.props.tags !== null) {
            for (let nextTag of this.props.tags) {
                let matchTag = this.props.tagList.find(tag => tag.name === nextTag.value);
                if (matchTag === undefined) {
                    let newTag = await addNewTag(nextTag.value);
                    this.props.addTag(newTag);
                    tagList.push(newTag);
                } else {
                    tagList.push(matchTag);
                }
            }
        }
        const updatedUser = {
            fullname: this.props.name,
            gender: this.props.gender,
            department: this.props.department,
            major: this.props.major,
            level: this.props.level,
            tags: tagList,
        };
        let data = await updateUserInfo(this.props.userInfo.username, updatedUser);
        this.props.loadUserInfo(data);
        this.props.loadDisplayedUser(data);
        this.cancelEdit();
    };

    cancelEdit = () => {
        this.setState({editing: !this.state.editing});
    };

    convertTagsToOptions = () => {
        let options = [];
        for (let tag of this.props.tagList) {
            options.push({value: tag.name, label: tag.name})
        }
        return options;
    };

    render() {
        const options = this.convertTagsToOptions();
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
                    <CreatableSelect isMulti={true} options={options} onChange={this.props.interestsOnChange}
                                     className="settings-tag-container" value={this.props.tags} />
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
const mapStateToProps = (state: { userInfo: any, tagList: any }) => {
    return {
        userInfo: state.userInfo,
        tagList: state.tagList
    };
};

export default connect(mapStateToProps, {loadUserInfo, loadDisplayedUser, addTag})(SettingsForm);