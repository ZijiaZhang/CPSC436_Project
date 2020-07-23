import { IUser } from "../../shared/ModelInterfaces";

interface UserDictionary {
    [userId: string]: {user: IUser, score: number};
}

export function uniqueValidator(uniqueProperties: any, model: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
        model.findOne(uniqueProperties, (err: Error, existingModelInstance: any) => {
            if (err) return reject(err);
            const isUnique = existingModelInstance === null;
            resolve(isUnique);
        })
    });
}

// given current user, and list of all users, sort all users from high to low, based on recommended score
export function applyRecommendation(currentUser: IUser, userList: IUser[]) {
    const scoresByUserId = userList.reduce(
        ((acc, comparedUser) => {
            acc[comparedUser._id] = {user: comparedUser, score: calculateRecommendScore(currentUser, comparedUser)};
            return acc;
        }), {} as UserDictionary);
    return Object.entries(scoresByUserId).sort((a, b) => a[1].score > b[1].score ? -1:1).map(val => val[1].user);
}

// calculate recommend score, based on major and interest tag, if current user and compared user have same major
// add 10 points, if share one same interest tag, add 5 points, score field 
export function calculateRecommendScore(currentUser: IUser, comparedUser: IUser): number{
    let commonTagNum = findCommonTagsNum(currentUser, comparedUser);
    let resultScore = 0;
    if (currentUser.department && currentUser.major && comparedUser.department && comparedUser.major ) {
        if (currentUser.major.toLowerCase() === comparedUser.major.toLowerCase()) {
            resultScore += 10 + commonTagNum * 5;
        } else if (currentUser.department.toLowerCase() === comparedUser.department.toLowerCase()){
            resultScore += 5 + commonTagNum * 5;
        }
        else {
            resultScore += commonTagNum * 5;
        }
   }
    return resultScore;
}
 
// find number of common tag of two users
export function findCommonTagsNum(currentUser: IUser, comparedUser: IUser) {
    if (!currentUser.tags || !comparedUser.tags) {
        return 0;
    }
    const firstArray = currentUser.tags;
    const secondArray = comparedUser.tags;
    let retVal = 0;
    for (let i =0; i< firstArray.length; i ++) {
        for (let j=0; j < secondArray.length; j++) {
            if (firstArray[i].name.toLowerCase() === secondArray[j].name.toLowerCase()) {
                retVal ++;
            }
        }
    }
    return retVal;
}