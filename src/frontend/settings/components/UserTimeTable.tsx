import React from "react";
import {ICourse, IUser} from "../../../shared/ModelInterfaces";
import {updateUserInfo} from "../../shared/globleFunctions";
import {connect} from "react-redux";
import {loadDisplayedUser, loadUserInfo} from "../actions";
require('datatables.net-bs4');

interface IUserTimeTableProps {
    loadUserInfo: any,
    loadDisplayedUser: any,
    displayedUser: IUser,
    userInfo: IUser
}

interface IUserTimeTableState {
    courseName: string,
    courseType: string,
    courseSection: string,
    courseTerm: string,
    addingNew: boolean,
    startNumber: number,
    showingCourses: boolean
}

class UserTimeTable extends React.Component<IUserTimeTableProps, IUserTimeTableState>{
    constructor(props: IUserTimeTableProps) {
        super(props);
        this.state = {
            courseName: "",
            courseType: "",
            courseSection: "",
            courseTerm: "",
            addingNew: false,
            startNumber: 0,
            showingCourses: true,
        }
    }

    courseInputOnChange = (event: any) => {
        switch (event.target.name) {
            case 'new-course-name':
                this.setState({courseName: event.target.value});
                break;
            case 'new-course-type':
                this.setState({courseType: event.target.value});
                break;
            case 'new-course-section':
                this.setState({courseSection: event.target.value});
                break;
            case 'new-course-term':
                this.setState({courseTerm: event.target.value});
                break;
            default:
                break;
        }
    };

    addNewCourse = async () => {
        if (this.state.courseName.trim() === "") {
            alert("Course Name Cannot be empty!")
        } else {
            let date = new Date();
            let year = date.getFullYear().toString();
            let month = date.getMonth().toString();
            let day = date.getDay().toString();
            const newCourse: ICourse = {
                name: this.state.courseName,
                activity: this.state.courseType,
                section: this.state.courseSection,
                term: this.state.courseTerm,
                lastUpdated: year + '/' + month + '/' + day
            };
            let newCourseList = this.props.displayedUser.courses.slice().concat(newCourse);
            const update = {
                courses: newCourseList
            };
            let responseData = await updateUserInfo(this.props.displayedUser.username, update);
            this.props.loadUserInfo(responseData);
            this.props.loadDisplayedUser(responseData);
            this.setState({addingNew: false, courseTerm: "", courseSection: "", courseType: "", courseName: ""});
        }
    };

    startEditNewCourse = () => {
        this.setState({addingNew: true});
    };

    cancelEdit = () => {
        this.setState({addingNew: false});
    };

    nextPage = () => {
        if (this.state.startNumber + 10 < this.props.displayedUser.courses.length) {
            this.setState({startNumber: this.state.startNumber + 10})
        }
    };

    lastPage = () => {
        if (this.state.startNumber !== 0) {
            this.setState({startNumber: this.state.startNumber - 10})
        }
    };

    showOrHideCourses = () => {
        this.setState({showingCourses: !this.state.showingCourses})
    };

    deleteCourse = async (index: number) => {
        let updatedCourseList = this.props.displayedUser.courses.slice();
        updatedCourseList.splice(index + this.state.startNumber, 1);
        const update = {
            courses: updatedCourseList
        };
        let responseData = await updateUserInfo(this.props.displayedUser.username, update);
        this.props.loadUserInfo(responseData);
        this.props.loadDisplayedUser(responseData);
        if(this.state.startNumber >= this.props.displayedUser.courses.length) {
            this.setState({startNumber: this.state.startNumber - 10})
        }
    };

    render() {
        const courseTable = this.props.displayedUser.courses.slice(this.state.startNumber, this.state.startNumber + 10).map((course, index) =>
            <tr key={'courseNo' + index}>
                <td>{course.name}</td>
                <td>{course.activity}</td>
                <td>{course.section}</td>
                <td>{course.term}</td>
                <td>
                    {course.lastUpdated}
                    {this.props.userInfo.username === this.props.displayedUser.username ?
                        <button className="edit-course-delete-button" onClick={() => this.deleteCourse(index)}>
                            <span className={"fa fa-trash"}/>
                        </button>
                        :
                        ""}
                </td>
            </tr>
        );
        return (
            <div className="user-profile-timetable-block">
                <div>
                    <span>Registered Courses</span>
                    <button onClick={this.showOrHideCourses}>{this.state.showingCourses ? "[Hide Courses]" : "[Show Courses]"}</button>
                </div>
                {this.state.showingCourses ?
                    <table style={{width: "100%"}} id="user-timetable" className="table table-striped table-bordered">
                        <tr>
                            <th>Course Name</th>
                            <th>Course Type</th>
                            <th>Course Section</th>
                            <th>Term</th>
                            <th>Last Updated</th>
                        </tr>
                        {courseTable}
                        {this.state.addingNew ?
                            <tr>
                                <td><input type="text" placeholder="Course Name" name="new-course-name" maxLength={10}
                                           value={this.state.courseName} onChange={this.courseInputOnChange}/></td>
                                <td><input type="text" placeholder="Course Type" name="new-course-type" maxLength={12}
                                           value={this.state.courseType} onChange={this.courseInputOnChange}/></td>
                                <td><input type="text" placeholder="Course Section" name="new-course-section" maxLength={5}
                                           value={this.state.courseSection} onChange={this.courseInputOnChange}/></td>
                                <td><input type="text" placeholder="Course Term" name="new-course-term" maxLength={8}
                                           value={this.state.courseTerm} onChange={this.courseInputOnChange}/></td>
                                <td>
                                    <button className="edit-course-submit-button" onClick={this.addNewCourse}><span
                                        className={"fa fa-plus"}/></button>
                                    <button className="edit-course-cancel-button" onClick={this.cancelEdit}><span
                                        className={"fa fa-minus"}/></button>
                                </td>
                            </tr>
                            :
                            ""}
                        {this.state.addingNew ?
                            <tr>
                                <td colSpan={5}><span>Example: CPSC 436I - Lecture - 901 - 2020S</span></td>
                            </tr>
                            :
                            ""}
                        {this.props.userInfo.username === this.props.displayedUser.username ?
                            <tr>
                                <td colSpan={5}>
                                    <button className="user-timetable-add-new-button" onClick={this.startEditNewCourse}>
                                        <span className={"fa fa-plus"}/> Add A Course
                                    </button>
                                </td>
                            </tr>
                            :
                            ""}
                        {this.props.displayedUser.courses.length > 10 ?
                            <tr>
                                <td colSpan={5}>
                                    <div className="user-timetable-page-stuffs">
                                        <button onClick={this.lastPage}>
                                            <span className={"glyphicon glyphicon-chevron-left"}/>
                                        </button>
                                        <span> Page {Math.floor(this.state.startNumber / 10 + 1)} / {Math.floor(this.props.displayedUser.courses.length / 10 + 1)} </span>
                                        <button onClick={this.nextPage}>
                                            <span className={"glyphicon glyphicon-chevron-right"}/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            :
                            ""}
                    </table>
                    :
                    ""}
            </div>
        );
    }
}

const mapStateToProps = (state: {displayedUser: any, userInfo: any}) => {
    return {
        displayedUser: state.displayedUser,
        userInfo: state.userInfo
    };
};

export default connect(mapStateToProps, {loadUserInfo, loadDisplayedUser})(UserTimeTable);
