import * as React from "react";
import {TagContainer} from "./TagContainer";
import {Tag} from "./Tag";

export interface SettingsFormProps {
    name: string,
    gender: GenderEnum,
    major: string,
    year: AcademicYearEnum,
    chosenTags: string[],
    tags: string[]
}

export enum GenderEnum {
    Female = 'Female',
    Male = 'Male',
    Other = 'Other',
    RatherNotSay = 'Rather Not Say'
}

export enum AcademicYearEnum {
    One = 'One',
    Two = 'Two',
    Three = 'Three',
    Four = 'Four',
    Master = 'Master',
    PhD = 'PhD'
}

export class SettingsForm extends React.Component<SettingsFormProps, {}> {
    render() {
        return <form className={'settings-form'}>
            <div className={'settings-item'}>
                <label className={'settings-item-label'}>Name</label>
                <input className={'settings-item-input'} type="text" name="name" value={this.props.name}/>
            </div>
            <div className={'settings-item'}>
                <label className={'settings-item-label'}>Gender</label>
                <select className={'settings-item-input'} name="gender" value={this.props.gender}>
                    <option value={GenderEnum.Female}>{GenderEnum.Female}</option>
                    <option value={GenderEnum.Male}>{GenderEnum.Male}</option>
                    <option value={GenderEnum.Other}>{GenderEnum.Other}</option>
                    <option value={GenderEnum.RatherNotSay}>{GenderEnum.RatherNotSay}</option>
                </select>
            </div>
            <div className={'settings-item'}>
                <label className={'settings-item-label'}>Major</label>
                <input className={'settings-item-input'} type="text" name="major" value={this.props.major}/>
            </div>
            <div className={'settings-item'}>
                <label className={'settings-item-label'}>Academic Year</label>
                <select className={'settings-item-input'} name="year" value={this.props.year}>
                    <option value={AcademicYearEnum.One}>{AcademicYearEnum.One}</option>
                    <option value={AcademicYearEnum.Two}>{AcademicYearEnum.Two}</option>
                    <option value={AcademicYearEnum.Three}>{AcademicYearEnum.Three}</option>
                    <option value={AcademicYearEnum.Four}>{AcademicYearEnum.Four}</option>
                    <option value={AcademicYearEnum.Master}>{AcademicYearEnum.Master}</option>
                    <option value={AcademicYearEnum.PhD}>{AcademicYearEnum.PhD}</option>
                </select>
            </div>
            <div className={'settings-item height-md'}>
                <label className={'settings-item-label'}>Interests</label>
                <TagContainer tags={this.props.chosenTags}/>
                {this.props.tags.map(tag => {
                    return <Tag key={tag} content={tag}/>
                })}
            </div>
        </form>;
    }
}
