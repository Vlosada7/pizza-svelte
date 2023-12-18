import { expect, test } from '@playwright/test';

test.describe('Header', () => {
  test('deve conter os links corretos e reagir ao estado de login', async ({ page }) => {
    await page.goto('/');

    // Verifica se os links estão presentes
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Menu')).toBeVisible();
    await expect(page.locator('text=About Us')).toBeVisible();

    // Adicione mais verificações aqui conforme necessário, 
    // por exemplo, para o estado de login/logout
  });
});

test.describe('Intro Section', () => {
  test('deve exibir o título e conteúdo corretos', async ({ page }) => {
    await page.goto('/');

    // Verifica o título e o conteúdo da seção de introdução
    await expect(page.locator('text=Nossa pizzaria')).toBeVisible();
    await expect(page.locator('text=Venha conhecer sua nova pizzaria favorita')).toBeVisible();
  });
});


test.describe('Footer', () => {
  test('deve exibir os elementos corretos', async ({ page }) => {
    await page.goto('/');

    // Verifica se o rodapé contém os elementos corretos
    await expect(page.locator('text=KINGDOUGH®')).toBeVisible();
    await expect(page.locator('text=WhatsApp')).toBeVisible();
    await expect(page.locator('text=E-mail')).toBeVisible();
  });
});


