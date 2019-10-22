import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './climbing-route.reducer';
import { IClimbingRoute } from 'app/shared/model/climbing-route.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClimbingRouteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClimbingRouteUpdateState {
  isNew: boolean;
}

export class ClimbingRouteUpdate extends React.Component<IClimbingRouteUpdateProps, IClimbingRouteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.modifiedAt = convertDateTimeToServer(values.modifiedAt);
    values.deletedAt = convertDateTimeToServer(values.deletedAt);

    if (errors.length === 0) {
      const { climbingRouteEntity } = this.props;
      const entity = {
        ...climbingRouteEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/climbing-route');
  };

  render() {
    const { climbingRouteEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="climbingzone3App.climbingRoute.home.createOrEditLabel">
              <Translate contentKey="climbingzone3App.climbingRoute.home.createOrEditLabel">Create or edit a ClimbingRoute</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : climbingRouteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="climbing-route-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="climbing-route-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="climbing-route-name">
                    <Translate contentKey="climbingzone3App.climbingRoute.name">Name</Translate>
                  </Label>
                  <AvField id="climbing-route-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="bonusLabel" for="climbing-route-bonus">
                    <Translate contentKey="climbingzone3App.climbingRoute.bonus">Bonus</Translate>
                  </Label>
                  <AvField id="climbing-route-bonus" type="text" name="bonus" />
                </AvGroup>
                <AvGroup>
                  <Label id="latitudeLabel" for="climbing-route-latitude">
                    <Translate contentKey="climbingzone3App.climbingRoute.latitude">Latitude</Translate>
                  </Label>
                  <AvField id="climbing-route-latitude" type="string" className="form-control" name="latitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="longitudeLabel" for="climbing-route-longitude">
                    <Translate contentKey="climbingzone3App.climbingRoute.longitude">Longitude</Translate>
                  </Label>
                  <AvField id="climbing-route-longitude" type="string" className="form-control" name="longitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="difficutyLabel" for="climbing-route-difficuty">
                    <Translate contentKey="climbingzone3App.climbingRoute.difficuty">Difficuty</Translate>
                  </Label>
                  <AvField id="climbing-route-difficuty" type="text" name="difficuty" />
                </AvGroup>
                <AvGroup>
                  <Label id="starLabel" for="climbing-route-star">
                    <Translate contentKey="climbingzone3App.climbingRoute.star">Star</Translate>
                  </Label>
                  <AvField id="climbing-route-star" type="string" className="form-control" name="star" />
                </AvGroup>
                <AvGroup>
                  <Label id="physicalLabel" for="climbing-route-physical">
                    <Translate contentKey="climbingzone3App.climbingRoute.physical">Physical</Translate>
                  </Label>
                  <AvField id="climbing-route-physical" type="string" className="form-control" name="physical" />
                </AvGroup>
                <AvGroup>
                  <Label id="technicalLabel" for="climbing-route-technical">
                    <Translate contentKey="climbingzone3App.climbingRoute.technical">Technical</Translate>
                  </Label>
                  <AvField id="climbing-route-technical" type="string" className="form-control" name="technical" />
                </AvGroup>
                <AvGroup>
                  <Label id="tacticalLabel" for="climbing-route-tactical">
                    <Translate contentKey="climbingzone3App.climbingRoute.tactical">Tactical</Translate>
                  </Label>
                  <AvField id="climbing-route-tactical" type="string" className="form-control" name="tactical" />
                </AvGroup>
                <AvGroup>
                  <Label id="mentalLabel" for="climbing-route-mental">
                    <Translate contentKey="climbingzone3App.climbingRoute.mental">Mental</Translate>
                  </Label>
                  <AvField id="climbing-route-mental" type="string" className="form-control" name="mental" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="climbing-route-createdAt">
                    <Translate contentKey="climbingzone3App.climbingRoute.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="climbing-route-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.climbingRouteEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="modifiedAtLabel" for="climbing-route-modifiedAt">
                    <Translate contentKey="climbingzone3App.climbingRoute.modifiedAt">Modified At</Translate>
                  </Label>
                  <AvInput
                    id="climbing-route-modifiedAt"
                    type="datetime-local"
                    className="form-control"
                    name="modifiedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.climbingRouteEntity.modifiedAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="deletedAtLabel" for="climbing-route-deletedAt">
                    <Translate contentKey="climbingzone3App.climbingRoute.deletedAt">Deleted At</Translate>
                  </Label>
                  <AvInput
                    id="climbing-route-deletedAt"
                    type="datetime-local"
                    className="form-control"
                    name="deletedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.climbingRouteEntity.deletedAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="routeTypeLabel" for="climbing-route-routeType">
                    <Translate contentKey="climbingzone3App.climbingRoute.routeType">Route Type</Translate>
                  </Label>
                  <AvInput
                    id="climbing-route-routeType"
                    type="select"
                    className="form-control"
                    name="routeType"
                    value={(!isNew && climbingRouteEntity.routeType) || 'BOULDER'}
                  >
                    <option value="BOULDER">{translate('climbingzone3App.RouteType.BOULDER')}</option>
                    <option value="ROUTE">{translate('climbingzone3App.RouteType.ROUTE')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="zouneTypeLabel" for="climbing-route-zouneType">
                    <Translate contentKey="climbingzone3App.climbingRoute.zouneType">Zoune Type</Translate>
                  </Label>
                  <AvInput
                    id="climbing-route-zouneType"
                    type="select"
                    className="form-control"
                    name="zouneType"
                    value={(!isNew && climbingRouteEntity.zouneType) || 'INTERIOR'}
                  >
                    <option value="INTERIOR">{translate('climbingzone3App.ZoneType.INTERIOR')}</option>
                    <option value="EXTERIOR">{translate('climbingzone3App.ZoneType.EXTERIOR')}</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/climbing-route" replace color="info">
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
  climbingRouteEntity: storeState.climbingRoute.entity,
  loading: storeState.climbingRoute.loading,
  updating: storeState.climbingRoute.updating,
  updateSuccess: storeState.climbingRoute.updateSuccess
});

const mapDispatchToProps = {
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
)(ClimbingRouteUpdate);
