import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './climbing-route.reducer';
import { IClimbingRoute } from 'app/shared/model/climbing-route.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClimbingRouteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClimbingRouteDetail extends React.Component<IClimbingRouteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { climbingRouteEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="climbingzone3App.climbingRoute.detail.title">ClimbingRoute</Translate> [<b>{climbingRouteEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="climbingzone3App.climbingRoute.name">Name</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.name}</dd>
            <dt>
              <span id="bonus">
                <Translate contentKey="climbingzone3App.climbingRoute.bonus">Bonus</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.bonus}</dd>
            <dt>
              <span id="latitude">
                <Translate contentKey="climbingzone3App.climbingRoute.latitude">Latitude</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.latitude}</dd>
            <dt>
              <span id="longitude">
                <Translate contentKey="climbingzone3App.climbingRoute.longitude">Longitude</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.longitude}</dd>
            <dt>
              <span id="difficuty">
                <Translate contentKey="climbingzone3App.climbingRoute.difficuty">Difficuty</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.difficuty}</dd>
            <dt>
              <span id="star">
                <Translate contentKey="climbingzone3App.climbingRoute.star">Star</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.star}</dd>
            <dt>
              <span id="physical">
                <Translate contentKey="climbingzone3App.climbingRoute.physical">Physical</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.physical}</dd>
            <dt>
              <span id="technical">
                <Translate contentKey="climbingzone3App.climbingRoute.technical">Technical</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.technical}</dd>
            <dt>
              <span id="tactical">
                <Translate contentKey="climbingzone3App.climbingRoute.tactical">Tactical</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.tactical}</dd>
            <dt>
              <span id="mental">
                <Translate contentKey="climbingzone3App.climbingRoute.mental">Mental</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.mental}</dd>
            <dt>
              <span id="createdAt">
                <Translate contentKey="climbingzone3App.climbingRoute.createdAt">Created At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={climbingRouteEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="modifiedAt">
                <Translate contentKey="climbingzone3App.climbingRoute.modifiedAt">Modified At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={climbingRouteEntity.modifiedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="deletedAt">
                <Translate contentKey="climbingzone3App.climbingRoute.deletedAt">Deleted At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={climbingRouteEntity.deletedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="routeType">
                <Translate contentKey="climbingzone3App.climbingRoute.routeType">Route Type</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.routeType}</dd>
            <dt>
              <span id="zouneType">
                <Translate contentKey="climbingzone3App.climbingRoute.zouneType">Zoune Type</Translate>
              </span>
            </dt>
            <dd>{climbingRouteEntity.zouneType}</dd>
          </dl>
          <Button tag={Link} to="/entity/climbing-route" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/climbing-route/${climbingRouteEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ climbingRoute }: IRootState) => ({
  climbingRouteEntity: climbingRoute.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClimbingRouteDetail);
