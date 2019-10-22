import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './climbing-route.reducer';
import { IClimbingRoute } from 'app/shared/model/climbing-route.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IClimbingRouteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IClimbingRouteState = IPaginationBaseState;

export class ClimbingRoute extends React.Component<IClimbingRouteProps, IClimbingRouteState> {
  state: IClimbingRouteState = {
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
    const { climbingRouteList, match } = this.props;
    return (
      <div>
        <h2 id="climbing-route-heading">
          <Translate contentKey="climbingzone3App.climbingRoute.home.title">Climbing Routes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="climbingzone3App.climbingRoute.home.createLabel">Create a new Climbing Route</Translate>
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
            {climbingRouteList && climbingRouteList.length > 0 ? (
              <Table responsive aria-describedby="climbing-route-heading">
                <thead>
                  <tr>
                    <th className="hand" onClick={this.sort('id')}>
                      <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('name')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('bonus')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.bonus">Bonus</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('latitude')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.latitude">Latitude</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('longitude')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.longitude">Longitude</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('difficuty')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.difficuty">Difficuty</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('star')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.star">Star</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('physical')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.physical">Physical</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('technical')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.technical">Technical</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('tactical')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.tactical">Tactical</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('mental')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.mental">Mental</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('createdAt')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.createdAt">Created At</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('modifiedAt')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.modifiedAt">Modified At</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('deletedAt')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.deletedAt">Deleted At</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('routeType')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.routeType">Route Type</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('zouneType')}>
                      <Translate contentKey="climbingzone3App.climbingRoute.zouneType">Zoune Type</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {climbingRouteList.map((climbingRoute, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`${match.url}/${climbingRoute.id}`} color="link" size="sm">
                          {climbingRoute.id}
                        </Button>
                      </td>
                      <td>{climbingRoute.name}</td>
                      <td>{climbingRoute.bonus}</td>
                      <td>{climbingRoute.latitude}</td>
                      <td>{climbingRoute.longitude}</td>
                      <td>{climbingRoute.difficuty}</td>
                      <td>{climbingRoute.star}</td>
                      <td>{climbingRoute.physical}</td>
                      <td>{climbingRoute.technical}</td>
                      <td>{climbingRoute.tactical}</td>
                      <td>{climbingRoute.mental}</td>
                      <td>
                        <TextFormat type="date" value={climbingRoute.createdAt} format={APP_DATE_FORMAT} />
                      </td>
                      <td>
                        <TextFormat type="date" value={climbingRoute.modifiedAt} format={APP_DATE_FORMAT} />
                      </td>
                      <td>
                        <TextFormat type="date" value={climbingRoute.deletedAt} format={APP_DATE_FORMAT} />
                      </td>
                      <td>
                        <Translate contentKey={`climbingzone3App.RouteType.${climbingRoute.routeType}`} />
                      </td>
                      <td>
                        <Translate contentKey={`climbingzone3App.ZoneType.${climbingRoute.zouneType}`} />
                      </td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${climbingRoute.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${climbingRoute.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${climbingRoute.id}/delete`} color="danger" size="sm">
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
                <Translate contentKey="climbingzone3App.climbingRoute.home.notFound">No Climbing Routes found</Translate>
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ climbingRoute }: IRootState) => ({
  climbingRouteList: climbingRoute.entities,
  totalItems: climbingRoute.totalItems,
  links: climbingRoute.links,
  entity: climbingRoute.entity,
  updateSuccess: climbingRoute.updateSuccess
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
)(ClimbingRoute);
