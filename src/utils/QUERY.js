const toObj = str => {
    return str.replace('?', '').split('&').reduce((total, curr) => {
        return {
            ...total,
            [curr.split('=')[0]]: curr.split('=')[1]
        }
    }, {})
}

export default {
    parse: toObj
}