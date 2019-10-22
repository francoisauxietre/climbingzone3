import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './climber.reducer';
import { IClimber } from 'app/shared/model/climber.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IClimberProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IClimberState = IPaginationBaseState;

export class Climber extends React.Component<IClimberProps, IClimberState> {
  state: IClimberState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { climberList, match } = this.props;
    return (
      <div>
        <h2 id="climber-heading">
          <Translate contentKey="climbingzone3App.climber.home.title">Climbers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="climbingzone3App.climber.home.createLabel">Create a new Climber</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            {climberList && climberList.length > 0 ? (
              <Table responsive aria-describedby="climber-heading">
                <thead>
                  <tr>
                    <th className="hand" onClick={this.sort('id')}>
                      <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('firstName')}>
                      <Translate contentKey="climbingzone3App.climber.firstName">First Name</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('lastName')}>
                      <Translate contentKey="climbingzone3App.climber.lastName">Last Name</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('birth')}>
                      <Translate contentKey="climbingzone3App.climber.birth">Birth</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('createdAt')}>
                      <Translate contentKey="climbingzone3App.climber.createdAt">Created At</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('modifiedAt')}>
                      <Translate contentKey="climbingzone3App.climber.modifiedAt">Modified At</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('deletedAt')}>
                      <Translate contentKey="climbingzone3App.climber.deletedAt">Deleted At</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('language')}>
                      <Translate contentKey="climbingzone3App.climber.language">Language</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="climbingzone3App.climber.cards">Cards</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="climbingzone3App.climber.openBy">Open By</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {climberList.map((climber, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`${match.url}/${climber.id}`} color="link" size="sm">
                          {climber.id}
                        </Button>
                      </td>
                      <td>{climber.firstName}</td>
                      <td>{climber.lastName}</td>
                      <td>
                        <TextFormat type="date" value={climber.birth} format={APP_DATE_FORMAT} />
                      </td>
                      <td>
                        <TextFormat type="date" value={climber.createdAt} format={APP_DATE_FORMAT} />
                      </td>
                      <td>
                        <TextFormat type="date" value={climber.modifiedAt} format={APP_DATE_FORMAT} />
                      </td>
                      <td>
                        <TextFormat type="date" value={climber.deletedAt} format={APP_DATE_FORMAT} />
                      </td>
                      <td>
                        <Translate contentKey={`climbingzone3App.Language.${climber.language}`} />
                      </td>
                      <td>{climber.cardsId ? <Link to={`card/${climber.cardsId}`}>{climber.cardsId}</Link> : ''}</td>
                      <td>{climber.openById ? <Link to={`climbing-route/${climber.openById}`}>{climber.openById}</Link> : ''}</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${climber.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${climber.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${climber.id}/delete`} color="danger" size="sm">
                            <FontAwesomeIcon icon="trash" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete">Delete</Translate>
                            </span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="alert alert-warning">
                <Translate contentKey="climbingzone3App.climber.home.notFound">No Climbers found</Translate>
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ climber }: IRootState) => ({
  climberList: climber.entities,
  totalItems: climber.totalItems,
  links: climber.links,
  entity: climber.entity,
  updateSuccess: climber.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Climber);
