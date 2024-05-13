const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const newObj = Array.isArray(obj) ? [] : {};
    for (let key of Reflect.ownKeys(obj)) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                newObj[key] = deepClone(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
    }

    return newObj;
}