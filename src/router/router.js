import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/rewards',
    icon: 'clipboard',
    name: 'rewards',
    title: '奖惩信息',
    access:[2],
    component: Main,
    children: [
        { path: 'rewards_student', title: '奖惩信息', name: 'reward', component: () => import('@/views/student/rewards.vue') }
      ]
  },
  {
    path: '/stu_scores',
    icon: 'clipboard',
    name: 'stu-scores',
    title: '成绩查询',
    access:[2],
    component: Main,
    children: [
      { path: 'scores_student', title: '成绩查询', name: 'scores', component: () => import('@/views/student/scores.vue') }
    ]
  },
  {
    path: '/stu_evaluate',
    icon: 'clipboard',
    name: 'stu-evaluate',
    title: '评价老师',
    access:[1,2],
    component: Main,
    children: [
      { path: 'stu_evaluate', title: '评价老师', name: 'evaluate', component: () => import('@/views/student/evaluate.vue') }
    ]
  },
  {
    path: '/stu_upload',
    icon: 'clipboard',
    name: 'stu-upload',
    title: '作品上传',
    access:[1,2],
    component: Main,
    children: [
      { path: 'stu_upload', title: '作品上传', name: 'stu_upload', component: () => import('@/views/student/work.vue') }
    ]
  },
  {
    path: '/stu_graduate',
    icon: 'clipboard',
    name: 'stu-graduate',
    title: '就业情况',
    access:[1],
    component: Main,
    children: [
      { path: 'stu_graduate', title: '就业情况', name: 'stu_graduate', component: () => import('@/views/student/graduate.vue') }
    ]
  },
  {
    path: '/stu_timetable',
    icon: 'clipboard',
    name: 'stu-timetable',
    title: '学生课程表',
    access:[2],
    component: Main,
    children: [
      { path: 'timetable', title: '课程表', name: 'timetable', component: () => import('@/views/student/timetable.vue') }
    ]
  },
  {
    path: '/manage',
    icon: 'clipboard',
    name: 'manage',
    title: '信息管理中心',
    access:[0],
    component: Main,
    children: [
      { path: 'users', title: '登录用户管理中心', name: 'users', component: () => import('@/views/admin/users.vue') },
      { path: 'teacher', title: '教职工管理中心', name: 'teacher_manage', component: () => import('@/views/admin/teacher.vue') },
      { path: 'student', title: '在校学生管理中心', name: 'student_manage', component: () => import('@/views/admin/student.vue') }
    ]
  },
//   {
//     path: '/stu_work',
//     icon: 'clipboard',
//     name: 'work',
//     title: '作品上传',
//     access:0,
//     component: Main,
//     children: [
//       { path: 'work_upload', title: '作品上传', name: 'work', component: () => import('@/views/work/work.vue') },
//     ]
//   },
  {
    path: '/reward_manage',
    icon: 'clipboard',
    name: 'manage_reward',
    title: '校园奖惩管理中心',
    access:[0],
    component: Main,
    children: [
      { path: 'rawards_manage', title: '奖惩信息管理', name: 'reward_manage', component: () => import('@/views/admin/rewardManage.vue')},
      { path: 'add_rawards', title: '添加奖惩信息', name: 'add_reward', component: () => import('@/views/admin/reward.vue') }
    ]
  },
  {
    path: '/course',
    icon: 'clipboard',
    name: 'course',
    title: '课程信息管理',
    access:[1],
    component: Main,
    children: [
      { path: 'course_manage', title: '课程信息管理', name: 'course_manage', component: () => import('@/views/admin/courseManage.vue') }
    ]
  },
  {
    path: '/class',
    icon: 'clipboard',
    name: 'classManage',
    title: '教师带班信息',
    access:[1],
    component: Main,
    children: [
      { path: 'classManage', title: '教师带班信息', name: 'class', component: () => import('@/views/teacher/class.vue') }
    ]
  },
  {
    path: '/tea_timetable',
    icon: 'clipboard',
    name: '',
    title: '教师课程表',
    access:[1],
    component: Main,
    children: [
      { path: 'timetable', title: '教师课程表', name: 'timetabletea', component: () => import('@/views/teacher/timetable.vue') }
    ]
  },
  {
    path: '/scores',
    icon: 'clipboard',
    name: '',
    title: '学生成绩',
    access:[1],
    component: Main,
    children: [
      { path: 'score', title: '学生成绩录入', name: 'scoreManage', component: () => import('@/views/teacher/scoreManage.vue') }
    ]
  },
  // {
  //   path: '/access',
  //   icon: 'key',
  //   name: 'access',
  //   title: '权限管理',
  //   component: Main,
  //   children: [
  //     { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
  //   ]
  // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
    //     ]
    // },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: () => import('@/views/international/international.vue') }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'scroll-bar',
    //             icon: 'android-upload',
    //             name: 'scroll-bar',
    //             title: '滚动条',
    //             component: () => import('@/views/my-components/scroll-bar/scroll-bar-page.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     access:0,
    //     component: Main,
    //     children: [
    //         { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
    //         { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }
    //
    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') }},
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }}
    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
    //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
    //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
    //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
    //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
