import { element, by, ElementFinder } from 'protractor';

export default class PlaceUpdatePage {
  pageTitle: ElementFinder = element(by.id('climbingzone3App.place.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#place-name'));
  latitudeInput: ElementFinder = element(by.css('input#place-latitude'));
  longitudeInput: ElementFinder = element(by.css('input#place-longitude'));
  parkingsSelect: ElementFinder = element(by.css('select#place-parkings'));
  locatedSelect: ElementFinder = element(by.css('select#place-located'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setLatitudeInput(latitude) {
    await this.latitudeInput.sendKeys(latitude);
  }

  async getLatitudeInput() {
    return this.latitudeInput.getAttribute('value');
  }

  async setLongitudeInput(longitude) {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput() {
    return this.longitudeInput.getAttribute('value');
  }

  async parkingsSelectLastOption() {
    await this.parkingsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async parkingsSelectOption(option) {
    await this.parkingsSelect.sendKeys(option);
  }

  getParkingsSelect() {
    return this.parkingsSelect;
  }

  async getParkingsSelectedOption() {
    return this.parkingsSelect.element(by.css('option:checked')).getText();
  }

  async locatedSelectLastOption() {
    await this.locatedSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async locatedSelectOption(option) {
    await this.locatedSelect.sendKeys(option);
  }

  getLocatedSelect() {
    return this.locatedSelect;
  }

  async getLocatedSelectedOption() {
    return this.locatedSelect.element(by.css('option:checked')).getText();
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
