export function uniqueValidator(uniqueProperties: any, model: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
        model.findOne(uniqueProperties, (err: Error, existingModelInstance: any) => {
            if (err) return reject(err);
            const isUnique = existingModelInstance === null;
            resolve(isUnique);
        })
    });
}
