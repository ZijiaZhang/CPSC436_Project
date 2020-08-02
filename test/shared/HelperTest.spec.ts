import { expect } from 'chai';
import { applyRecommendation, calculateRecommendScore, findCommonTagsNum} from '../../src/backend/shared/Helpers';
import { IUser, ITag } from '../../src/shared/ModelInterfaces';

const basketball: ITag = {_id: "1", name: "basketball"};
const music: ITag = {_id: "2", name: "music"};
const reading: ITag = {_id: "3", name: "reading"};
const math: ITag = {_id: "4", name: "math"};
const coding: ITag = {_id: "5", name: "coding"};
const game: ITag = {_id: "6", name: "game"};

const userOne: IUser = {
    _id: "1",
    blackListUserIds: [],
    friendUsernames: [],
    savedPostIds: [],
    hiddenPostIds: [],
    username: 'Will',
    fullname: 'Will',
    avatarPath: './images/dora.png',
    gender: "male",
    department: "Science",
    major: "Computer Science",
    level: "Bachelor",
    tags: [music, basketball, math],
    groups: [],
    courses: []
};

const userTwo: IUser = {
    _id: "2",
    blackListUserIds: [],
    friendUsernames: [],
    savedPostIds: [],
    hiddenPostIds: [],
    username: 'Gary',
    fullname: 'Gary',
    avatarPath: './images/test.png',
    gender: "male",
    department: "Computer Science",
    major: "Computer Science",
    level: "Bachelor",
    tags: [music, basketball, math, game],
    groups: [],
    courses: []
};

const userThree: IUser = {
    _id: "3",
    blackListUserIds: [],
    friendUsernames: [],
    savedPostIds: [],
    hiddenPostIds: [],
    username: 'Alice',
    fullname: 'Alice',
    avatarPath: './images/test.png',
    gender: "male",
    department: "Math",
    major: "Math",
    level: "Bachelor",
    tags: [music, reading],
    groups: [],
    courses: []
};

const userFour: IUser = {
    _id: "4",
    blackListUserIds: [],
    friendUsernames: [],
    savedPostIds: [],
    hiddenPostIds: [],
    username: 'Denise',
    fullname: 'Denise',
    avatarPath: './images/test.png',
    gender: "female",
    department: "Computer Science",
    major: "Computer Science",
    level: "Bachelor",
    tags: [music, reading, game, coding],
    groups: [],
    courses: []
};

const userFive: IUser = {
    _id: "5",
    blackListUserIds: [],
    friendUsernames: [],
    savedPostIds: [],
    hiddenPostIds: [],
    username: 'bad',
    fullname: 'bad',
    avatarPath: './images/test.png',
    gender: "female",
    department: "Computer Science",
    major: "Computer Science",
    level: "Bachelor",
    tags: [ ],
    groups: [],
    courses: []
};

const userSix: IUser = {
    _id: "6",
    blackListUserIds: [],
    friendUsernames: [],
    savedPostIds: [],
    hiddenPostIds: [],
    username: 'bad',
    fullname: 'bad',
    avatarPath: './images/test.png',
    gender: "female",
    department: "Science",
    major: "Math",
    level: "Bachelor",
    tags: [ ],
    groups: [],
    courses: []
};

describe('test Helper function for recommend algorithm', () => {
    it('test findCommonTagsNum', () => {
        const result1 = findCommonTagsNum(userOne, userTwo);
        const result2 = findCommonTagsNum(userOne, userThree);
        const result3 = findCommonTagsNum(userFive, userThree);
        const result4 = findCommonTagsNum(userFive, userSix);
        expect(result1).to.be.equal(3);
        expect(result2).to.be.equal(1);
        expect(result3).to.be.equal(0);
        expect(result4).to.be.equal(0);
    });
    
    it('test calculateRecommendScore', ()=> {
        const result1 = calculateRecommendScore(userOne, userTwo);
        const result2 = calculateRecommendScore(userTwo, userThree);
        const result3 = calculateRecommendScore(userOne, userSix);
        expect(result1).to.be.equal(25);
        expect(result2).to.be.equal(5);
        expect(result3).to.be.equal(5);
    })

    it('test apply recommended algorithm', ()=> {
        const result1 = applyRecommendation(userFour, [userOne,userTwo,userThree]);
        expect(result1[0].username).to.be.equal('Gary');
        expect(result1[1].username).to.be.equal('Will');
        expect(result1[2].username).to.be.equal('Alice');
        const result2 = applyRecommendation(userThree, [userOne,userTwo,userFour]);
        expect(result2[0].username).to.be.equal('Denise');
    })
});