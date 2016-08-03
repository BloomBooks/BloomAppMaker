import { About } from './about.component';

export  const AboutRoutes = [
    {
        path: 'about',
        component: About,
        index: true
    },
    {
        path: '**',
        redirectTo: 'about'
    }
];