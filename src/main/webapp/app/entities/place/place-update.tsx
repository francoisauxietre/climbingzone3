import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IParking } from 'app/shared/model/parking.model';
import { getEntities as getParkings } from 'app/entities/parking/parking.reducer';
import { IClimbingRoute } from 'app/shared/model/climbing-route.model';
import { getEntities as getClimbingRoutes } from 'app/entities/climbing-route/climbing-route.reducer';
import { getEntity, updateEntity, createEntity, reset } from './place.reducer';
import { IPlace } from 'app/shared/model/place.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlaceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPlaceUpdateState {
  isNew: boolean;
  parkingsId: string;
  locatedId: string;
}

export class PlaceUpdate extends React.Component<IPlaceUpdateProps, IPlaceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      parkingsId: '0',
      locatedId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getParkings();
    this.props.getClimbingRoutes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { placeEntity } = this.props;
      const entity = {
        ...placeEntity,
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
    this.props.history.push('/entity/place');
  };

  render() {
    const { placeEntity, parkings, climbingRoutes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="climbingzone3App.place.home.createOrEditLabel">
              <Translate contentKey="climbingzone3App.place.home.createOrEditLabel">Create or edit a Place</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : placeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="place-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="place-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="place-name">
                    <Translate contentKey="climbingzone3App.place.name">Name</Translate>
                  </Label>
                  <AvField id="place-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="latitudeLabel" for="place-latitude">
                    <Translate contentKey="climbingzone3App.place.latitude">Latitude</Translate>
                  </Label>
                  <AvField id="place-latitude" type="string" className="form-control" name="latitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="longitudeLabel" for="place-longitude">
                    <Translate contentKey="climbingzone3App.place.longitude">Longitude</Translate>
                  </Label>
                  <AvField id="place-longitude" type="string" className="form-control" name="longitude" />
                </AvGroup>
                <AvGroup>
                  <Label for="place-parkings">
                    <Translate contentKey="climbingzone3App.place.parkings">Parkings</Translate>
                  </Label>
                  <AvInput id="place-parkings" type="select" className="form-control" name="parkingsId">
                    <option value="" key="0" />
                    {parkings
                      ? parkings.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="place-located">
                    <Translate contentKey="climbingzone3App.place.located">Located</Translate>
                  </Label>
                  <AvInput id="place-located" type="select" className="form-control" name="locatedId">
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
                <Button tag={Link} id="cancel-save" to="/entity/place" replace color="info">
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
  parkings: storeState.parking.entities,
  climbingRoutes: storeState.climbingRoute.entities,
  placeEntity: storeState.place.entity,
  loading: storeState.place.loading,
  updating: storeState.place.updating,
  updateSuccess: storeState.place.updateSuccess
});

const mapDispatchToProps = {
  getParkings,
  getClimbingRoutes,
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
)(PlaceUpdate);
