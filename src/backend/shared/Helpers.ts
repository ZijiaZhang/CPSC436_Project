import { IUser } from "../../shared/ModelInterfaces";

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
    let retList: any = [];
    for (let i = 0; i < userList.length; i ++) {
        calculateRecommendScore(currentUser, userList[i]);
        retList = userList.sort((a,b) => (a.score > b.score ? -1:1));
    }
    // console.log(retList);
    return retList;
}

// calculate recommend score, based on major and interest tag, if current user and compared user have same major
// add 10 points, if share one same interest tag, add 5 points, score field 
export function calculateRecommendScore(currentUser: IUser, comparedUser: IUser) {
    let commonTagNum = findCommonTagsNum(currentUser, comparedUser);
    if (currentUser.major && comparedUser.major) {
        if (currentUser.major.toLowerCase() === comparedUser.major.toLowerCase()) {
            comparedUser.score = 10 + commonTagNum * 5;
        } else {
            comparedUser.score = commonTagNum * 5;
        }
   }
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