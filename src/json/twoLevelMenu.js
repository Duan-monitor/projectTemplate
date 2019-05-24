/* 每个对象代表一个应用

title: 应用名称
isDef: 是否做总行与支行的区分
Zong: 总行的菜单（不做区分时可不写）
Zhi: 支行的菜单（不做区分时可不写）
noDef: 当不做区分时的菜单（做区分时可不写）

*/
export default {
    // 在办、待办、在阅属于没有二级菜单，直接显示列表
    ZaiYue: {
        title: '在阅文件',
        routingJump: '/detail',
        menu: [] // 总行在阅文件
    },
    ZaiBan: {
        title: '在办文件',
        routingJump: '/detail',
        isDef: true,
        type: {
            Zong: 'doinglist_zonghang',
            Zhi: 'doinglist_zhihang'
        },
        truethPage: true,
        menu: [], // 总行在办文件
        Zong: [],
        Zhi: []
    },
    DaiBan: {
        title: '待办文件',
        routingJump: '/detail',
        isDef: true,
        type: {
            Zong: 'todolist_zonghang',
            Zhi: 'todolist_zhihang'
        },
        truethPage: true,
        menu: [], // 总行在办文件
        Zong: [],
        Zhi: []
    },
    ZongDaiBan: {
        title: '总行待办文件',
        routingJump: '/detail',
        isDef: true,
        type: 'todolist_zhihangtofull',
        truethPage: true,
        menu: [], // 总行在办文件
        Zong: [],
        Zhi: []
    },
    // 公文管理中有多个文种，有二级菜单
    GongWen: {
        title: '公文管理',
        routingJump: '/detail',
        isDef: true,

        Zong: [{
            label: '收文管理',
            icon: '收文管理@3x.png',
            key: 'A690633', // 这个应用的key
            type: '2' // 1是全行，2是总行与支行，总行与支行根据用户身份判断
        },
        {
            label: '发文管理',
            icon: '发文管理@3x.png',
            key: 'A112971',
            type: '2'
        },
        {
            label: '签报管理',
            icon: '签报管理@3x.png',
            key: 'A216930',
            type: '2'
        },
        {
            label: '呈阅件管理',
            icon: '呈阅件管理@3x.png',
            key: 'A193977',
            type: '2'
        },
        {
            label: '简报管理',
            icon: '简报管理@3x.png',
            key: 'A961733',
            type: '2'
        },
        {
            label: '公告审批',
            icon: '公告审批@3x.png',
            key: 'A722837',
            type: '2'
        },
        {
            label: '会议纪要',
            icon: '会议纪要@3x.png',
            key: 'A170179-all',
            type: '2'
        },
        {
            label: '议题申请',
            icon: '议题申请@3x.png',
            key: 'A220641',
            type: '2'
        },
        {
            label: '部门便函',
            icon: '部门便函@3x.png',
            key: 'A505316',
            type: '2'
        },
        {
            label: '部门联系单',
            icon: '部门联系单@3x.png',
            key: 'A327785',
            type: '2'
        },
        {
            label: '问题咨询单',
            icon: '银行卡部@3x.png',
            key: 'A647994',
            type: '1'
        },
        {
            label: '风险提示单',
            icon: '银行卡部@3x.png',
            key: 'A436496',
            type: '1'
        },
        {
            label: '督办立项',
            icon: '银行卡部@3x.png',
            key: 'A301586',
            type: '2'
        },
        {
            label: '工作动态',
            icon: '收文管理@3x.png',
            key: 'A811980',
            type: '1'
        },
        {
            label: '投委会报审单',
            icon: '收文管理@3x.png',
            key: 'A237776',
            type: '1'
        }],

        // 支行二级菜单
        Zhi: [{
            label: '收文管理',
            icon: '收文管理@3x.png',
            key: 'A762819', // 这个应用的key
            type: '2' // 1是全行，2是总行与支行，总行与支行根据用户身份判断
        },
        {
            label: '发文管理',
            icon: '发文管理@3x.png',
            key: 'A806098',
            type: '2'
        },
        {
            label: '公告审批',
            icon: '公告审批@3x.png',
            key: 'A406690',
            type: '2'
        },
        {
            label: '会议纪要',
            icon: '公告审批@3x.png',
            key: 'A893394-all',
            type: '2'
        },
        {
            label: '简报管理',
            icon: '公告审批@3x.png',
            key: 'A345088',
            type: '2'
        },
        {
            label: '签报管理',
            icon: '公告审批@3x.png',
            key: 'A913482',
            type: '2'
        },
        {
            label: '网点发文',
            icon: '公告审批@3x.png',
            key: 'A920863',
            type: '2'
        },
        {
            label: '问题咨询单',
            icon: '银行卡部@3x.png',
            key: 'A647994',
            type: '1'
        },
        {
            label: '风险提示单',
            icon: '银行卡部@3x.png',
            key: 'A436496',
            type: '1'
        },
        // {
        //     label: '部门收文',
        //     icon: '收文管理@3x.png',
        //     key: 'A235213',
        //     type: '2'
        // },
        {
            label: '用印申请',
            icon: '收文管理@3x.png',
            key: 'A656940',
            type: '2'
        },
        {
            label: '工作动态',
            icon: '收文管理@3x.png',
            key: 'A811980',
            type: '1'
        },
        {
            label: '投委会报审单',
            icon: '收文管理@3x.png',
            key: 'A237776',
            type: '1'
        }],
        noDef: []
    },
    DuBan: {
        title: '一级督办立项',
        routingJump: '/detail',
        isDef: true,
        Zong: [
            {
                label: '督办立项',
                icon: '收文管理@3x.png',
                key: 'A301586',
                type: '2'
            },
            {
                label: '专项工作',
                icon: '银行卡部@3x.png',
                key: 'A286948',
                type: '1'
            },
            {
                label: '优化整改促提升',
                icon: '公告审批@3x.png',
                key: 'A286948',
                type: '1'
            }
        ]
    },
    YinZhang: {
        title: '印章管理',
        routingJump: '/detail',
        isDef: true,
        truethPage: true,
        key: 'A276243',
        Zhi: [{
            label: '印章申请',
            icon: '收文管理@3x.png',
            key: 'A656940', // 这个应用的key
            type: '2' // 1是全行，2是总行与支行，总行与支行根据用户身份判断
        },
        {
            label: '行政印章管理',
            icon: '收文管理@3x.png',
            key: 'A787878',
            type: '1'
        },
        {
            label: '管辖行申请总行印章',
            icon: '收文管理@3x.png',
            key: 'A867540',
            type: '1'
        }],
        noDef: []
    },
    // 报告报表属于本来有二级菜单，但是文种列表只有一个，所以省略掉，直接跳转列表
    BaoBiao: {
        title: '报告报表系统',
        routingJump: '/detail',
        isDef: false,
        truethPage: true,
        key: 'A276243',
        menu: [],
        noDef: []
    },
    DianZi: {
        title: '电子渠道',
        routingJump: '/detail',
        isDef: false,
        truethPage: true,
        key: 'A344079',
        menu: [],
        noDef: []
    },
    YinHang: {
        title: '银行卡部',
        routingJump: '/detail',
        isDef: false,
        truethPage: true,
        key: 'A783392',
        menu: [],
        noDef: []
    },
    XingCheng: {
        title: '行程安排',
        routingJump: '/scheduling',
        isDef: false,
        truethPage: true,
        key: 'A783392',
        menu: [],
        noDef: []
    },
    // 通知公告   个例
    notice: {
        title: '通知公告',
        routingJump: '/notice',
        isDef: false,
        menu: [],
        noDef: [],
        json: {
            type: 'noticeviewlist',
            query: {
                key: 'notice',
                pagenum: 1,
                pagesize: 8,
                totalcount: 0
            }
        }
    }
}