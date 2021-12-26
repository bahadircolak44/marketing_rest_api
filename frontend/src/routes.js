import {Redirect} from "react-router-dom";
import FacebookLayout from "./layouts/facebook";
import Campaign from "./pages/Facebook/Campaign";
import AdSet from "./pages/Facebook/AdSet";
import Ad from "./pages/Facebook/Ad";
import Insight from "./pages/Facebook/Insight";
import Preview from "./pages/Facebook/Preview";

export const routes = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/facebook"/>,
    },
    {
        path: "/facebook",
        component: FacebookLayout,
        routes: [
            {
                path: '/facebook/campaign/',
                component: Campaign,
                name: 'Campaign',
            },
            {
                path: '/facebook/adset/',
                component: AdSet,
                name: 'AdSet',
            },
            {
                path: '/facebook/ad/',
                component: Ad,
                name: 'Ad',
            },
            {
                path: '/facebook/insight/',
                component: Insight,
                name: 'Insight',
            },
            {
                path: '/facebook/preview/',
                component: Preview,
                name: 'Preview',
            },

        ]
    },
];
