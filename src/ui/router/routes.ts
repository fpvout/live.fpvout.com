export default [
  {
    path: '/',
    name: 'view-usb',
    component: () => import('~/ui/views/ViewUSB/Index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('~/ui/views/About/Index.vue'),
  },
];
