export const ApiRoutes = {
  auth: {
    signIn: '/auth',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },
  user: {
    create: '/users/create',
  },
  category: {
    findAll: '/category/findAll',
    create: '/category/create',
    update: '/category/update',
    delete: '/category/delete',
  },
  job: {
    create: '/jobs/create',
    update: '/jobs/update',
    delete: '/jobs/delete',
    switchCategory: '/jobs/switchCategory',
  },
} as const;
