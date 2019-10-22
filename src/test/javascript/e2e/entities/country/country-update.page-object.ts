import { element, by, ElementFinder } from 'protractor';

export default class CountryUpdatePage {
  pageTitle: ElementFinder = element(by.id('climbingzone3App.country.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#country-name'));
  climbersSelect: ElementFinder = element(by.css('select#country-climbers'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async climbersSelectLastOption() {
    await this.climbersSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async climbersSelectOption(option) {
    await this.climbersSelect.sendKeys(option);
  }

  getClimbersSelect() {
    return this.climbersSelect;
  }

  async getClimbersSelectedOption() {
    return this.climbersSelect.element(by.css('option:checked')).getText();
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
