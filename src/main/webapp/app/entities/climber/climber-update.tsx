import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICard } from 'app/shared/model/card.model';
import { getEntities as getCards } from 'app/entities/card/card.reducer';
import { IClimbingRoute } from 'app/shared/model/climbing-route.model';
import { getEntities as getClimbingRoutes } from 'app/entities/climbing-route/climbing-route.reducer';
import { getEntities as getClimbers } from 'app/entities/climber/climber.reducer';
import { getEntity, updateEntity, createEntity, reset } from './climber.reducer';
import { IClimber } from 'app/shared/model/climber.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClimberUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClimberUpdateState {
  isNew: boolean;
  idsfriends: any[];
  cardsId: string;
  openById: string;
  fromFriendsId: string;
}

export class ClimberUpdate extends React.Component<IClimberUpdateProps, IClimberUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsfriends: [],
      cardsId: '0',
      openById: '0',
      fromFriendsId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCards();
    this.props.getClimbingRoutes();
    this.props.getClimbers();
  }

  saveEntity = (event, errors, values) => {
    values.birth = convertDateTimeToServer(values.birth);
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.modifiedAt = convertDateTimeToServer(values.modifiedAt);
    values.deletedAt = convertDateTimeToServer(values.deletedAt);

    if (errors.length === 0) {
      const { climberEntity } = this.props;
      const entity = {
        ...climberEntity,
        ...values,
        friends: mapIdList(values.friends)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/climber');
  };

  render() {
    const { climberEntity, cards, climbingRoutes, climbers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="climbingzone3App.climber.home.createOrEditLabel">
              <Translate contentKey="climbingzone3App.climber.home.createOrEditLabel">Create or edit a Climber</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : climberEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="climber-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="climber-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="climber-firstName">
                    <Translate contentKey="climbingzone3App.climber.firstName">First Name</Translate>
                  </Label>
                  <AvField id="climber-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="climber-lastName">
                    <Translate contentKey="climbingzone3App.climber.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="climber-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="birthLabel" for="climber-birth">
                    <Translate contentKey="climbingzone3App.climber.birth">Birth</Translate>
                  </Label>
                  <AvInput
                    id="climber-birth"
                    type="datetime-local"
                    className="form-control"
                    name="birth"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.climberEntity.birth)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="climber-createdAt">
                    <Translate contentKey="climbingzone3App.climber.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="climber-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.climberEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="modifiedAtLabel" for="climber-modifiedAt">
                    <Translate contentKey="climbingzone3App.climber.modifiedAt">Modified At</Translate>
                  </Label>
                  <AvInput
                    id="climber-modifiedAt"
                    type="datetime-local"
                    className="form-control"
                    name="modifiedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.climberEntity.modifiedAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="deletedAtLabel" for="climber-deletedAt">
                    <Translate contentKey="climbingzone3App.climber.deletedAt">Deleted At</Translate>
                  </Label>
                  <AvInput
                    id="climber-deletedAt"
                    type="datetime-local"
                    className="form-control"
                    name="deletedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.climberEntity.deletedAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="languageLabel" for="climber-language">
                    <Translate contentKey="climbingzone3App.climber.language">Language</Translate>
                  </Label>
                  <AvInput
                    id="climber-language"
                    type="select"
                    className="form-control"
                    name="language"
                    value={(!isNew && climberEntity.language) || 'FRENCH'}
                  >
                    <option value="FRENCH">{translate('climbingzone3App.Language.FRENCH')}</option>
                    <option value="ENGLISH">{translate('climbingzone3App.Language.ENGLISH')}</option>
                    <option value="SPANISH">{translate('climbingzone3App.Language.SPANISH')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="climber-cards">
                    <Translate contentKey="climbingzone3App.climber.cards">Cards</Translate>
                  </Label>
                  <AvInput id="climber-cards" type="select" className="form-control" name="cardsId">
                    <option value="" key="0" />
                    {cards
                      ? cards.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="climber-openBy">
                    <Translate contentKey="climbingzone3App.climber.openBy">Open By</Translate>
                  </Label>
                  <AvInput id="climber-openBy" type="select" className="form-control" name="openById">
                    <option value="" key="0" />
                    {climbingRoutes
                      ? climbingRoutes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="climber-friends">
                    <Translate contentKey="climbingzone3App.climber.friends">Friends</Translate>
                  </Label>
                  <AvInput
                    id="climber-friends"
                    type="select"
                    multiple
                    className="form-control"
                    name="friends"
                    value={climberEntity.friends && climberEntity.friends.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {climbers
                      ? climbers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/climber" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  cards: storeState.card.entities,
  climbingRoutes: storeState.climbingRoute.entities,
  climbers: storeState.climber.entities,
  climberEntity: storeState.climber.entity,
  loading: storeState.climber.loading,
  updating: storeState.climber.updating,
  updateSuccess: storeState.climber.updateSuccess
});

const mapDispatchToProps = {
  getCards,
  getClimbingRoutes,
  getClimbers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClimberUpdate);
