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
    password: "xxx",
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
    score: 0
};

const userTwo: IUser = {
    _id: "2",
    password: "xxx",
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
    score: 0
};

const userThree: IUser = {
    _id: "3",
    password: "xxx",
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
    score: 0
};

const userFour: IUser = {
    _id: "4",
    password: "xxx",
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
    score: 0
};

const userFive: IUser = {
    _id: "5",
    password: "xxx",
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
    score: 0
};

describe('test Helper function for recommend algorithm', () => {
    it('test findCommonTagsNum', () => {
        const result1 = findCommonTagsNum(userOne, userTwo);
        const result2 = findCommonTagsNum(userOne, userThree);
        const result3 = findCommonTagsNum(userFive, userThree);
        expect(result1).to.be.equal(3);
        expect(result2).to.be.equal(1);
        expect(result3).to.be.equal(0);
    });
    
    it('test calculateRecommendScore', ()=> {
        calculateRecommendScore(userOne, userTwo);
        calculateRecommendScore(userTwo, userThree);
        expect(userTwo.score).to.be.equal(25);
        expect(userThree.score).to.be.equal(5);
    })

    it('test apply recommended algorithm', ()=> {
        const result = applyRecommendation(userFour, [userOne,userTwo,userThree]);
        console.log(result);
        expect(result[0].username).to.be.equal('Gary');
        expect(result[1].username).to.be.equal('Will');
        expect(result[2].username).to.be.equal('Alice');
    })
});