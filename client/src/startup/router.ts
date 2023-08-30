import ROUTES from '../constants/core/routes';

import routes from '../routes';

import setThemeMeta from '../helpers/set-theme-meta';

import Router, {
    router
} from '@ocula/router';

import type {
    App
} from 'vue';

import {
    theme
} from '../store';

declare global {
    interface Window {
        gtag?(key: string, trackingId: string, meta: any): void
    }
}

export default function initialiseRouter(application: App) {
    application.use(Router, routes);

    router.beforeEach((to, from, next) => {
        if (!theme.value) {
            return next();
        }

        const isForecast = to.matched.some(({ name }) => name === ROUTES.forecast.index);

        let {
            colour
        } = theme.value.core;

        if (isForecast) {
            colour = theme.value.weather.colour || colour;
        }

        setThemeMeta(colour);

        next();
    });

    return router;
}