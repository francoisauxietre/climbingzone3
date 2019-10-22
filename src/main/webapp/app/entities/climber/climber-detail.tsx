import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './climber.reducer';
import { IClimber } from 'app/shared/model/climber.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClimberDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClimberDetail extends React.Component<IClimberDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { climberEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="climbingzone3App.climber.detail.title">Climber</Translate> [<b>{climberEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstName">
                <Translate contentKey="climbingzone3App.climber.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{climberEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="climbingzone3App.climber.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{climberEntity.lastName}</dd>
            <dt>
              <span id="birth">
                <Translate contentKey="climbingzone3App.climber.birth">Birth</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={climberEntity.birth} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdAt">
                <Translate contentKey="climbingzone3App.climber.createdAt">Created At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={climberEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="modifiedAt">
                <Translate contentKey="climbingzone3App.climber.modifiedAt">Modified At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={climberEntity.modifiedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="deletedAt">
                <Translate contentKey="climbingzone3App.climber.deletedAt">Deleted At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={climberEntity.deletedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="language">
                <Translate contentKey="climbingzone3App.climber.language">Language</Translate>
              </span>
            </dt>
            <dd>{climberEntity.language}</dd>
            <dt>
              <Translate contentKey="climbingzone3App.climber.cards">Cards</Translate>
            </dt>
            <dd>{climberEntity.cardsId ? climberEntity.cardsId : ''}</dd>
            <dt>
              <Translate contentKey="climbingzone3App.climber.openBy">Open By</Translate>
            </dt>
            <dd>{climberEntity.openById ? climberEntity.openById : ''}</dd>
            <dt>
              <Translate contentKey="climbingzone3App.climber.friends">Friends</Translate>
            </dt>
            <dd>
              {climberEntity.friends
                ? climberEntity.friends.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === climberEntity.friends.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/climber" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/climber/${climberEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ climber }: IRootState) => ({
  climberEntity: climber.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClimberDetail);
