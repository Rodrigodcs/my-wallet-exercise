

function verifyData(value, type){
    if (!value || !type) {
        return true;
    }

    if (!['INCOME', 'OUTCOME'].includes(type)) {
        return true;
    }

    if (value < 0) {
        return true;
    }
    return false
}

export {verifyData}