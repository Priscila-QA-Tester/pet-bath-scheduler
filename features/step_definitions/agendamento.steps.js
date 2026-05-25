const { Given, When, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { expect } = require('@playwright/test');

let browser;
let page;

// O 'Given' abre o site
Given('I navigate to the Pet Spa home page', async function () {
  // headless: false faz o Chrome abrir de verdade na sua frente para você ver o teste!
  browser = await chromium.launch({ headless: false }); 
  page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

// Os 'When' preenchem o formulário
When('I fill the Pet Owner field with {string}', async function (ownerName) {
  await page.fill('#owner-input', ownerName);
});

When('I fill the Phone field with {string}', async function (phone) {
  await page.fill('#phone-input', phone);
});

When('I fill the Pet Name field with {string}', async function (petName) {
  await page.fill('#pet-input', petName);
});

When('I fill the Breed field with {string}', async function (breed) {
  await page.fill('#breed-input', breed);
});

When('I fill the Weight field with {string}', async function (weight) {
  await page.fill('#weight-input', weight);
});

When('I set a valid business date', async function () {
  await page.fill('#date-input', '2026-10-15'); // Uma data fixa no futuro para teste
});

When('I select the time {string}', async function (time) {
  await page.selectOption('#time-input', time);
});

When('I select the service {string}', async function (service) {
  await page.selectOption('#service-input', service);
});

When('I check the aggressive pet checkbox', async function () {
  await page.check('#aggressive-input');
});

When('I click on Confirm Appointment', async function () {
  await page.click('#submit-button');
});

// Os 'Then' fazem as verificações (Asserts) para garantir que deu certo
Then('I should see the success toast message {string}', async function (message) {
  // Espera a mensagem de sucesso aparecer na tela
  const toast = page.locator('.bg-green-100');
  await expect(toast).toBeVisible();
  await expect(toast).toContainText(message);
});

Then('the appointment for pet {string} owned by {string} with phone {string} should be displayed', async function (petName, ownerName, phone) {
  // Filtramos o card que contém o Nome do Pet E o Nome do Dono E o Telefone.
  // Como você rodou o teste várias vezes, a Priscila foi criada várias vezes no site! 
  // Então usamos o .first() no final para pegar a primeira cópia exata dela.
  const petCard = page.locator('.appointment-item')
    .filter({ hasText: petName })
    .filter({ hasText: ownerName })
    .filter({ hasText: phone })
    .first();
  
  await expect(petCard).toBeVisible();
});

Then('the service {string} should be displayed on the appointment card for {string} owned by {string}', async function (service, petName, ownerName) {
  const petCard = page.locator('.appointment-item')
    .filter({ hasText: petName })
    .filter({ hasText: ownerName })
    .first();
    
  await expect(petCard).toContainText(service);
});

Then('the appointment for {string} should be displayed in the schedule list', async function (petName) {
  const petCard = page.locator('.appointment-item')
    .filter({ hasText: petName })
    .first();

  await expect(petCard).toBeVisible();
});

Then('the service {string} should be displayed on the {string} appointment card', async function (service, petName) {
  const petCard = page.locator('.appointment-item')
    .filter({ hasText: petName })
    .first();

  await expect(petCard).toContainText(service);
});

// No final do teste, fecha o navegador
After(async function () {
  if (browser) {
    // Vamos colocar uma pausinha de 2 segundos só para você conseguir ver o resultado na tela antes de fechar rápido
    await page.waitForTimeout(2000); 
    await browser.close();
  }
});