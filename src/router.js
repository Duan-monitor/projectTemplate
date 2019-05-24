import Vue from 'vue'
import Router from 'vue-router'
import TwoLevelMenu from './views/TwoLevelMenu'
import List from './views/List';
import Detail from './views/Detail';
import Notice from './views/Notice';
import Submit from './views/detail/Submit';
import Suggestion from './views/detail/Suggestion';
import DispatchDoc from './views/detail/DispatchDoc';

// 通讯录
import Mail from './views/mailList/Mail'; // 部门列表
import Person from './views/mailList/Person'; // 人员列表
import Information from './views/mailList/Information'; // 人员详情信息

// 行程安排
import Scheduling from './views/Scheduling/Scheduling';
import Schedule from './views/Scheduling/Schedule';
import EditPage from './views/Scheduling/EditPage';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'TwoLevelMenu',
            component: TwoLevelMenu
        },
        {
            path: '/list',
            name: 'List', 
            component: List
        },
        {
            path: '/notice',
            name: 'Notice', 
            component: Notice
        },
        {
            path: '/scheduling',
            name: 'Scheduling', 
            component: Scheduling
        },
        {
            path: '/schedule',
            name: 'Schedule', 
            component: Schedule
        },
        {
            path: '/editPage',
            name: 'EditPage', 
            component: EditPage
        },
        {
            path: '/detail',
            component: Detail,
            children: [
                {
                    path: '',
                    redirect: 'dispatchDoc'
                },
                {
                    path: 'dispatchDoc',
                    name: 'DispatchDoc',
                    component: DispatchDoc
                },
                {
                    path: 'suggestion',
                    name: 'Suggestion',
                    component: Suggestion
                },
                {
                    path: 'submit',
                    name: 'Submit',
                    component: Submit
                }
            ]
        },
        {
            path: '/mail',
            name: 'Mail',
            component: Mail
        },
        {
            path: '/person',
            name: 'Person',
            component: Person
        },
        {
            path: '/information',
            name: 'Information',
            component: Information
        }
    ]
})
