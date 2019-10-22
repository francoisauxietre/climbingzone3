import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/climber">
      <Translate contentKey="global.menu.entities.climber" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/climbing-route">
      <Translate contentKey="global.menu.entities.climbingRoute" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/country">
      <Translate contentKey="global.menu.entities.country" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/place">
      <Translate contentKey="global.menu.entities.place" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/card">
      <Translate contentKey="global.menu.entities.card" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/parking">
      <Translate contentKey="global.menu.entities.parking" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
