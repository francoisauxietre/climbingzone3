import { element, by, ElementFinder } from 'protractor';

export default class ClimbingRouteUpdatePage {
  pageTitle: ElementFinder = element(by.id('climbingzone3App.climbingRoute.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#climbing-route-name'));
  bonusInput: ElementFinder = element(by.css('input#climbing-route-bonus'));
  latitudeInput: ElementFinder = element(by.css('input#climbing-route-latitude'));
  longitudeInput: ElementFinder = element(by.css('input#climbing-route-longitude'));
  difficutyInput: ElementFinder = element(by.css('input#climbing-route-difficuty'));
  starInput: ElementFinder = element(by.css('input#climbing-route-star'));
  physicalInput: ElementFinder = element(by.css('input#climbing-route-physical'));
  technicalInput: ElementFinder = element(by.css('input#climbing-route-technical'));
  tacticalInput: ElementFinder = element(by.css('input#climbing-route-tactical'));
  mentalInput: ElementFinder = element(by.css('input#climbing-route-mental'));
  createdAtInput: ElementFinder = element(by.css('input#climbing-route-createdAt'));
  modifiedAtInput: ElementFinder = element(by.css('input#climbing-route-modifiedAt'));
  deletedAtInput: ElementFinder = element(by.css('input#climbing-route-deletedAt'));
  routeTypeSelect: ElementFinder = element(by.css('select#climbing-route-routeType'));
  zouneTypeSelect: ElementFinder = element(by.css('select#climbing-route-zouneType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setBonusInput(bonus) {
    await this.bonusInput.sendKeys(bonus);
  }

  async getBonusInput() {
    return this.bonusInput.getAttribute('value');
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

  async setDifficutyInput(difficuty) {
    await this.difficutyInput.sendKeys(difficuty);
  }

  async getDifficutyInput() {
    return this.difficutyInput.getAttribute('value');
  }

  async setStarInput(star) {
    await this.starInput.sendKeys(star);
  }

  async getStarInput() {
    return this.starInput.getAttribute('value');
  }

  async setPhysicalInput(physical) {
    await this.physicalInput.sendKeys(physical);
  }

  async getPhysicalInput() {
    return this.physicalInput.getAttribute('value');
  }

  async setTechnicalInput(technical) {
    await this.technicalInput.sendKeys(technical);
  }

  async getTechnicalInput() {
    return this.technicalInput.getAttribute('value');
  }

  async setTacticalInput(tactical) {
    await this.tacticalInput.sendKeys(tactical);
  }

  async getTacticalInput() {
    return this.tacticalInput.getAttribute('value');
  }

  async setMentalInput(mental) {
    await this.mentalInput.sendKeys(mental);
  }

  async getMentalInput() {
    return this.mentalInput.getAttribute('value');
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

  async setRouteTypeSelect(routeType) {
    await this.routeTypeSelect.sendKeys(routeType);
  }

  async getRouteTypeSelect() {
    return this.routeTypeSelect.element(by.css('option:checked')).getText();
  }

  async routeTypeSelectLastOption() {
    await this.routeTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setZouneTypeSelect(zouneType) {
    await this.zouneTypeSelect.sendKeys(zouneType);
  }

  async getZouneTypeSelect() {
    return this.zouneTypeSelect.element(by.css('option:checked')).getText();
  }

  async zouneTypeSelectLastOption() {
    await this.zouneTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
