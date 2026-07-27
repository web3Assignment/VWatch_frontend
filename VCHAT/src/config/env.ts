const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://saurabhsrivastav.dev/api/v1',
  WS_URL: import.meta.env.VITE_WS_URL || 'https://saurabhsrivastav.dev',
  YOUTUBE_API_KEY: import.meta.env.VITE_YOUTUBE_API_KEY || '',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;

export default env;
