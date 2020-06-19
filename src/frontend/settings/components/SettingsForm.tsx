import * as React from "react";
import {TagContainer} from "./TagContainer";
import {Tag} from "./Tag";

export interface ISettingsFormProps {
    name: string,
    gender: GenderOption,
    major: string,
    year: AcademicYear,
    chosenTags: string[],
    tags: string[]
}

export enum GenderOption {
    Female = 'Female',
    Male = 'Male',
    Other = 'Other',
    RatherNotSay = 'Rather Not Say'
}

export enum AcademicYear {
    One = 'One',
    Two = 'Two',
    Three = 'Three',
    Four = 'Four',
    Master = 'Master',
    PhD = 'PhD'
}

export class SettingsForm extends React.Component<ISettingsFormProps, {}> {
    render() {
        return <form className={'settings-form'}>
            <div className={'settings-item'}>
                <label className={'settings-item-label'}>Name</label>
                <input className={'settings-item-input'} type="text" name="name" value={this.props.name}/>
            </div>
            <div className={'settings-item'}>
                <label className={'settings-item-label'}>Gender</label>
                <select className={'settings-item-input'} name="gender" value={this.props.gender}>
                    <option value={GenderOption.Female}>{GenderOption.Female}</option>
                    <option value={GenderOption.Male}>{GenderOption.Male}</option>
                    <option value={GenderOption.Other}>{GenderOption.Other}</option>
                    <option value={GenderOption.RatherNotSay}>{GenderOption.RatherNotSay}</option>
                </select>
            </div>
            <div className={'settings-item'}>
                <label className={'settings-item-label'}>Major</label>
                <input className={'settings-item-input'} type="text" name="major" value={this.props.major}/>
            </div>
            <div className={'settings-item'}>
                <label className={'settings-item-label'}>Academic Year</label>
                <select className={'settings-item-input'} name="year" value={this.props.year}>
                    <option value={AcademicYear.One}>{AcademicYear.One}</option>
                    <option value={AcademicYear.Two}>{AcademicYear.Two}</option>
                    <option value={AcademicYear.Three}>{AcademicYear.Three}</option>
                    <option value={AcademicYear.Four}>{AcademicYear.Four}</option>
                    <option value={AcademicYear.Master}>{AcademicYear.Master}</option>
                    <option value={AcademicYear.PhD}>{AcademicYear.PhD}</option>
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
