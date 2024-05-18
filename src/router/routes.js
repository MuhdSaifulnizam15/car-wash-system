// ----------------------------------------------------------------------

const path = (root, sublink) => {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_ADMIN = '/admin';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
    verify: path(ROOTS_AUTH, '/verify'),
    changePassword: path(ROOTS_AUTH, '/change-password'),
};

export const PATH_PAGE = {
    comingSoon: '/coming-soon',
    // maintenance: '/maintenance',
    page404: '/404',
    // page500: '/500',
    // about: '/about-us',
    // contact: '/contact-us',
    // faqs: '/faqs',

    settings: '/settings',
    sales: '/sales',
    transaction: '/transactions',
    onlineRegistration: '/register-now',
    history: '/history',
    profile: '/profile'
};

export const PATH_ADMIN = {
    // root: ROOTS_ADMIN,
    service: {
        root: path(ROOTS_ADMIN, '/services'),
        list: path(ROOTS_ADMIN, '/services/list'),
        newService: path(ROOTS_ADMIN, '/services/new'),
        showById: path(ROOTS_ADMIN, '/services/detail'),
        editById: path(ROOTS_ADMIN, `/services/edit`),
    },
    category: {
        root: path(ROOTS_ADMIN, '/category'),
        list: path(ROOTS_ADMIN, '/category/list'),
        newCategory: path(ROOTS_ADMIN, '/category/new'),
        showById: path(ROOTS_ADMIN, '/category/detail'),
        editById: path(ROOTS_ADMIN, `/category/edit`),
    },
    branch: {
        root: path(ROOTS_ADMIN, '/branch'),
        list: path(ROOTS_ADMIN, '/branch/list'),
        newCategory: path(ROOTS_ADMIN, '/branch/new'),
        showById: path(ROOTS_ADMIN, '/branch/detail'),
        editById: path(ROOTS_ADMIN, `/branch/edit`),
    },
    staff: {
        root: path(ROOTS_ADMIN, '/staff'),
        list: path(ROOTS_ADMIN, '/staff/list'),
        newCategory: path(ROOTS_ADMIN, '/staff/new'),
        showById: path(ROOTS_ADMIN, '/staff/detail'),
        editById: path(ROOTS_ADMIN, `/staff/edit`),
    },
    customer: {
        root: path(ROOTS_ADMIN, '/customer'),
        list: path(ROOTS_ADMIN, '/customer/list'),
        newCustomer: path(ROOTS_ADMIN, '/customer/new'),
        showById: path(ROOTS_ADMIN, '/customer/detail'),
        editById: path(ROOTS_ADMIN, `/customer/edit`)
    },
    user: {
        root: path(ROOTS_ADMIN, '/user'),
        newUser: path(ROOTS_ADMIN, '/user/new'),
        showById: path(ROOTS_ADMIN, '/user/detail'),
        editById: path(ROOTS_ADMIN, `/user/edit`)
    },
}
