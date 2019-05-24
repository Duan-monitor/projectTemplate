const fn1 = () => {
    console.log(1)
}
const fn2 = () => {
    console.log(2)
}
const fn3 = () => {
    console.log(3)
}
const fn4 = () => {
    console.log(4)
}

const arr = [{
    level: 'GongWen',
    fn: fn1
}, {
    level: 'ZaiBan',
    fn: fn2
}, {
    level: 'DianZi',
    fn: fn3
}, {
    level: 'BaoBiao',
    fn: fn3
}, {
    level: 'YinHang',
    fn: fn3
}, {
    level: 'notice',
    fn: fn4
}]

const oneLevel = 'ZaiBan'

const todo = arr.find(item => item.level === oneLevel).fn

todo()