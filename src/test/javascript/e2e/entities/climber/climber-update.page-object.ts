import { element, by, ElementFinder } from 'protractor';

export default class ClimberUpdatePage {
  pageTitle: ElementFinder = element(by.id('climbingzone3App.climber.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#climber-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#climber-lastName'));
  birthInput: ElementFinder = element(by.css('input#climber-birth'));
  createdAtInput: ElementFinder = element(by.css('input#climber-createdAt'));
  modifiedAtInput: ElementFinder = element(by.css('input#climber-modifiedAt'));
  deletedAtInput: ElementFinder = element(by.css('input#climber-deletedAt'));
  languageSelect: ElementFinder = element(by.css('select#climber-language'));
  cardsSelect: ElementFinder = element(by.css('select#climber-cards'));
  openBySelect: ElementFinder = element(by.css('select#climber-openBy'));
  friendsSelect: ElementFinder = element(by.css('select#climber-friends'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setBirthInput(birth) {
    await this.birthInput.sendKeys(birth);
  }

  async getBirthInput() {
    return this.birthInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async setModifiedAtInput(modifiedAt) {
    await this.modifiedAtInput.sendKeys(modifiedAt);
  }

  async getModifiedAtInput() {
    return this.modifiedAtInput.getAttribute('value');
  }

  async setDeletedAtInput(deletedAt) {
    await this.deletedAtInput.sendKeys(deletedAt);
  }

  async getDeletedAtInput() {
    return this.deletedAtInput.getAttribute('value');
  }

  async setLanguageSelect(language) {
    await this.languageSelect.sendKeys(language);
  }

  async getLanguageSelect() {
    return this.languageSelect.element(by.css('option:checked')).getText();
  }

  async languageSelectLastOption() {
    await this.languageSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async cardsSelectLastOption() {
    await this.cardsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cardsSelectOption(option) {
    await this.cardsSelect.sendKeys(option);
  }

  getCardsSelect() {
    return this.cardsSelect;
  }

  async getCardsSelectedOption() {
    return this.cardsSelect.element(by.css('option:checked')).getText();
  }

  async openBySelectLastOption() {
    await this.openBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async openBySelectOption(option) {
    await this.openBySelect.sendKeys(option);
  }

  getOpenBySelect() {
    return this.openBySelect;
  }

  async getOpenBySelectedOption() {
    return this.openBySelect.element(by.css('option:checked')).getText();
  }

  async friendsSelectLastOption() {
    await this.friendsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async friendsSelectOption(option) {
    await this.friendsSelect.sendKeys(option);
  }

  getFriendsSelect() {
    return this.friendsSelect;
  }

  async getFriendsSelectedOption() {
    return this.friendsSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
