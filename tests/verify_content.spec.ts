import { test, expect } from '@playwright/test';
import path from 'path';

test('verify robotbridge content and capture screenshots', async ({ page }) => {
  // Load the local index.html
  const filePath = `file://${path.resolve('index.html')}`;
  await page.goto(filePath);

  // 1. Verify Title
  await expect(page).toHaveTitle(/RobotBridge | Sistema de Rescate Robótico/);

  // 2. Verify Hero Section
  const heroHeading = page.locator('h1');
  await expect(heroHeading).toContainText('RobotBridge', { ignoreCase: true });
  await page.screenshot({ path: 'screenshots/hero_section.png' });

  // 3. Verify specific user-requested string
  const userText = page.locator('text=imágenes del robot haciendo x cosas , ect...');
  await expect(userText).toBeVisible();

  // 4. Capture screenshot of the gallery section containing the text
  const gallerySection = page.locator('#demo');
  await gallerySection.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'screenshots/content_verification.png' });

  console.log('Verification complete: Content matches RobotBridge specs.');
});
