import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IClimber } from 'app/shared/model/climber.model';
import { getEntities as getClimbers } from 'app/entities/climber/climber.reducer';
import { getEntity, updateEntity, createEntity, reset } from './country.reducer';
import { ICountry } from 'app/shared/model/country.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICountryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICountryUpdateState {
  isNew: boolean;
  climbersId: string;
}

export class CountryUpdate extends React.Component<ICountryUpdateProps, ICountryUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      climbersId: '0',
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

    this.props.getClimbers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { countryEntity } = this.props;
      const entity = {
        ...countryEntity,
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
    this.props.history.push('/entity/country');
  };

  render() {
    const { countryEntity, climbers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="climbingzone3App.country.home.createOrEditLabel">
              <Translate contentKey="climbingzone3App.country.home.createOrEditLabel">Create or edit a Country</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : countryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="country-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="country-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="country-name">
                    <Translate contentKey="climbingzone3App.country.name">Name</Translate>
                  </Label>
                  <AvField id="country-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label for="country-climbers">
                    <Translate contentKey="climbingzone3App.country.climbers">Climbers</Translate>
                  </Label>
                  <AvInput id="country-climbers" type="select" className="form-control" name="climbersId">
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
                <Button tag={Link} id="cancel-save" to="/entity/country" replace color="info">
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
  climbers: storeState.climber.entities,
  countryEntity: storeState.country.entity,
  loading: storeState.country.loading,
  updating: storeState.country.updating,
  updateSuccess: storeState.country.updateSuccess
});

const mapDispatchToProps = {
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
)(CountryUpdate);
