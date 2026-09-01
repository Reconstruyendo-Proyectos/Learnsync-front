export const environment = {
  apiUrl: `${import.meta.env.NG_APP_URL_BACKEND ?? 'http://localhost:8080'}/api/v1`,
  googleClientId: import.meta.env.NG_APP_GOOGLE_CLIENT_ID ?? '',
  authKey: import.meta.env.NG_APP_AUTH_KEY ?? 'auth_token',
};