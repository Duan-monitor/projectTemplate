export default {
    ZzaiYueWenJian: {
        title: '在阅文件',
        menu: [] // 总行在阅文件
    },
    ZongZaiBan: {
        title: '在办文件',
        type: 'doinglist_zonghang',
        truethPage: true,
        menu: [] // 总行在办文件
    },
    ZongGongWen: {
        title: '公文管理',
        menu: [ // 总行公文管理
            {
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
            }
        ]
    },
    ZhiGongWen: {
        title: '公文管理',
        menu: [ // 总行公文管理
            {
                label: '收文管理',
                icon: '收文管理@3x.png',
                key: 'A101010', // 这个应用的key
                type: '2' // 1是全行，2是总行与支行，总行与支行根据用户身份判断
            },
            {
                label: '发文管理',
                icon: '发文管理@3x.png',
                key: 'A112971', 
                type: '2' 
            }
        ]
    }

}