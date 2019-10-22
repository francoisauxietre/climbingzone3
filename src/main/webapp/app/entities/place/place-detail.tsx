import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './place.reducer';
import { IPlace } from 'app/shared/model/place.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlaceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PlaceDetail extends React.Component<IPlaceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { placeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="climbingzone3App.place.detail.title">Place</Translate> [<b>{placeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="climbingzone3App.place.name">Name</Translate>
              </span>
            </dt>
            <dd>{placeEntity.name}</dd>
            <dt>
              <span id="latitude">
                <Translate contentKey="climbingzone3App.place.latitude">Latitude</Translate>
              </span>
            </dt>
            <dd>{placeEntity.latitude}</dd>
            <dt>
              <span id="longitude">
                <Translate contentKey="climbingzone3App.place.longitude">Longitude</Translate>
              </span>
            </dt>
            <dd>{placeEntity.longitude}</dd>
            <dt>
              <Translate contentKey="climbingzone3App.place.parkings">Parkings</Translate>
            </dt>
            <dd>{placeEntity.parkingsId ? placeEntity.parkingsId : ''}</dd>
            <dt>
              <Translate contentKey="climbingzone3App.place.located">Located</Translate>
            </dt>
            <dd>{placeEntity.locatedId ? placeEntity.locatedId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/place" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/place/${placeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ place }: IRootState) => ({
  placeEntity: place.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceDetail);
