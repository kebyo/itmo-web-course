export const isProduction = process.env.NODE_ENV === 'production';

export const appPort = process.env.APP_PORT || 5050;
export const appHost = process.env.APP_HOST || 'localhost';
export const backendUrl = process.env.BACKEND_URL;

