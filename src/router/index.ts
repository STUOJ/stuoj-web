import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '@/stores/user';
import { Role } from '@/types/User';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        permission: Role.Visitor,
        title: 'JFOJ - 疾风 Online Judge',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '关于 - JFOJ',
      },
    },
    {
      path: '/user/login',
      name: 'user-login',
      component: () => import('../views/user/UserLoginView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '登录 - JFOJ',
      },
    },
    {
      path: '/user/register',
      name: 'user-register',
      component: () => import('../views/user/UserRegisterView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '注册 - JFOJ',
      },
    },
    {
      path: '/user/forgot',
      name: 'user-forgot',
      component: () => import('../views/user/UserForgotView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '找回密码 - JFOJ',
      },
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/user/UserSpaceView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '个人空间 - JFOJ',
      },
    },
    {
      path: '/problem',
      name: 'problem-list',
      component: () => import('../views/problem/ProblemListView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '题库 - JFOJ',
      },
    },
    {
      path: '/problem/edit',
      name: 'problem-edit',
      component: () => import('../views/problem/ProblemEditView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '编辑题目 - JFOJ',
      },
    },
    {
      path: '/problem/:id',
      name: 'problem',
      component: () => import('../views/problem/ProblemView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '题目 - JFOJ',
      },
    },
    {
      path: '/collection',
      name: 'collection',
      component: () => import('../views/collection/CollectionListView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '题单 - JFOJ',
      },
    },
    {
      path: '/contest',
      name: 'contest',
      component: () => import('../views/contest/ContestListView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '比赛 - JFOJ',
      },
    },
    {
      path: '/record',
      name: 'record',
      component: () => import('../views/record/RecordListView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '评测记录 - JFOJ',
      },
    },
    {
      path: '/record/:id',
      name: 'record-detail',
      component: () => import('../views/record/RecordView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '评测记录 - JFOJ',
      },
    },
    {
      path: '/blog',
      name: 'blog-list',
      component: () => import('@/views/blog/BlogListView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '博客 - JFOJ',
      }
    },
    {
      path:'/blog/edit',
      name:'blog-edit',
      component: () => import('../views/blog/BlogEditView.vue'),
      meta:{
        permission: Role.User,
        title: '编辑博客 - JFOJ',
      },
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: () => import('@/views/blog/BlogView.vue'),
      meta: {
        permission: Role.Visitor,
        title: '博客 - JFOJ',
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminView.vue'),
      meta: {
        title: '管理面板 - JFOJ',
        permission: Role.Editor,
      },
    },
    {
      path: '/admin/user',
      component: () => import('@/views/admin/AdminUserView.vue'),
      meta: {
        title: '用户管理 - JFOJ',
        permission: Role.Admin,
      }
    },
    {
      path: '/admin/problem',
      component: () => import('@/views/admin/AdminProblemView.vue'),
      meta: {
        title: '题目管理 - JFOJ',
        permission: Role.Editor,
      }
    },
    {
      path: '/admin/tag',
      component: () => import('@/views/admin/AdminTagView.vue'),
      meta: {
        title: '标签管理 - JFOJ',
        permission: Role.Editor,
      }
    },
    {
      path: '/admin/language',
      component: () => import('@/views/admin/AdminLanguageView.vue'),
      meta: {
        title: '语言管理 - JFOJ',
        permission: Role.Editor,
      }
    },
    {
      path: '/admin/collection',
      component: () => import('@/views/admin/AdminCollectionView.vue'),
      meta: {
        title: '题单管理 - JFOJ',
        permission: Role.Admin,
      }
    },
    {
      path: '/admin/contest',
      component: () => import('@/views/admin/AdminContestView.vue'),
      meta: {
        title: '比赛管理 - JFOJ',
        permission: Role.Admin,
      }
    },
    {
      path: '/admin/record',
      component: () => import('@/views/admin/AdminRecordView.vue'),
      meta: {
        title: '记录管理 - JFOJ',
        permission: Role.Admin,
      }
    },
    {
      path: '/admin/blog',
      component: () => import('@/views/admin/AdminBlogView.vue'),
      meta: {
        title: '博客管理 - JFOJ',
        permission: Role.Admin,
      }
    },
    {
      path: '/admin/comment',
      component: () => import('@/views/admin/AdminCommentView.vue'),
      meta: {
        title: '评论管理 - JFOJ',
        permission: Role.Admin,
      }
    },
    {
      path: '/admin/report',
      component: () => import('@/views/admin/AdminReportView.vue'),
      meta: {
        title: '处理举报 - JFOJ',
        permission: Role.Admin,
      }
    },
    {
      path: '/admin/statistics',
      component: () => import('@/views/admin/AdminStatisticsView.vue'),
      meta: {
        title: '统计信息 - JFOJ',
        permission: Role.Admin,
      }
    },
    {
      path: '/admin/system',
      component: () => import('@/views/admin/AdminSystemView.vue'),
      meta: {
        title: '系统设置 - JFOJ',
        permission: Role.Root,
      }
    }
  ],
})

router.beforeEach(async (to: any, from: any, next) => {
  const { info } = userStore();
  const permission = info.value?.role ?? 0;
  if (to.meta.permission > permission) {
    next("/403");
  } else {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
  }
});

export default router
