import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: 'html',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  use: {
    baseURL: process.env.BASE_URL,

    trace: 'on',
    testIdAttribute: 'data-test',
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'Chromium-authenticated',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/standardUser.json',
      },
      dependencies: ['setup'],
      grepInvert: /@login/,
    },

    {
      name: 'Chromium-login',
      use: { ...devices['Desktop Chrome'] },
      grep: /@login/,
    },
  ],
});
