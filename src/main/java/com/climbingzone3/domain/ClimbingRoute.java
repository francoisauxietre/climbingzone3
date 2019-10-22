package com.climbingzone3.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.climbingzone3.domain.enumeration.RouteType;

import com.climbingzone3.domain.enumeration.ZoneType;

/**
 * A ClimbingRoute.
 */
@Entity
@Table(name = "climbing_route")
public class ClimbingRoute implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "bonus")
    private String bonus;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "difficuty")
    private String difficuty;

    @Column(name = "star")
    private Integer star;

    @Column(name = "physical")
    private Integer physical;

    @Column(name = "technical")
    private Integer technical;

    @Column(name = "tactical")
    private Integer tactical;

    @Column(name = "mental")
    private Integer mental;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "modified_at")
    private Instant modifiedAt;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "route_type")
    private RouteType routeType;

    @Enumerated(EnumType.STRING)
    @Column(name = "zoune_type")
    private ZoneType zouneType;

    @OneToMany(mappedBy = "located")
    private Set<Place> places = new HashSet<>();

    @OneToMany(mappedBy = "openBy")
    private Set<Climber> openers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ClimbingRoute name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBonus() {
        return bonus;
    }

    public ClimbingRoute bonus(String bonus) {
        this.bonus = bonus;
        return this;
    }

    public void setBonus(String bonus) {
        this.bonus = bonus;
    }

    public Float getLatitude() {
        return latitude;
    }

    public ClimbingRoute latitude(Float latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public ClimbingRoute longitude(Float longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public String getDifficuty() {
        return difficuty;
    }

    public ClimbingRoute difficuty(String difficuty) {
        this.difficuty = difficuty;
        return this;
    }

    public void setDifficuty(String difficuty) {
        this.difficuty = difficuty;
    }

    public Integer getStar() {
        return star;
    }

    public ClimbingRoute star(Integer star) {
        this.star = star;
        return this;
    }

    public void setStar(Integer star) {
        this.star = star;
    }

    public Integer getPhysical() {
        return physical;
    }

    public ClimbingRoute physical(Integer physical) {
        this.physical = physical;
        return this;
    }

    public void setPhysical(Integer physical) {
        this.physical = physical;
    }

    public Integer getTechnical() {
        return technical;
    }

    public ClimbingRoute technical(Integer technical) {
        this.technical = technical;
        return this;
    }

    public void setTechnical(Integer technical) {
        this.technical = technical;
    }

    public Integer getTactical() {
        return tactical;
    }

    public ClimbingRoute tactical(Integer tactical) {
        this.tactical = tactical;
        return this;
    }

    public void setTactical(Integer tactical) {
        this.tactical = tactical;
    }

    public Integer getMental() {
        return mental;
    }

    public ClimbingRoute mental(Integer mental) {
        this.mental = mental;
        return this;
    }

    public void setMental(Integer mental) {
        this.mental = mental;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public ClimbingRoute createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getModifiedAt() {
        return modifiedAt;
    }

    public ClimbingRoute modifiedAt(Instant modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }

    public void setModifiedAt(Instant modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public Instant getDeletedAt() {
        return deletedAt;
    }

    public ClimbingRoute deletedAt(Instant deletedAt) {
        this.deletedAt = deletedAt;
        return this;
    }

    public void setDeletedAt(Instant deletedAt) {
        this.deletedAt = deletedAt;
    }

    public RouteType getRouteType() {
        return routeType;
    }

    public ClimbingRoute routeType(RouteType routeType) {
        this.routeType = routeType;
        return this;
    }

    public void setRouteType(RouteType routeType) {
        this.routeType = routeType;
    }

    public ZoneType getZouneType() {
        return zouneType;
    }

    public ClimbingRoute zouneType(ZoneType zouneType) {
        this.zouneType = zouneType;
        return this;
    }

    public void setZouneType(ZoneType zouneType) {
        this.zouneType = zouneType;
    }

    public Set<Place> getPlaces() {
        return places;
    }

    public ClimbingRoute places(Set<Place> places) {
        this.places = places;
        return this;
    }

    public ClimbingRoute addPlace(Place place) {
        this.places.add(place);
        place.setLocated(this);
        return this;
    }

    public ClimbingRoute removePlace(Place place) {
        this.places.remove(place);
        place.setLocated(null);
        return this;
    }

    public void setPlaces(Set<Place> places) {
        this.places = places;
    }

    public Set<Climber> getOpeners() {
        return openers;
    }

    public ClimbingRoute openers(Set<Climber> climbers) {
        this.openers = climbers;
        return this;
    }

    public ClimbingRoute addOpener(Climber climber) {
        this.openers.add(climber);
        climber.setOpenBy(this);
        return this;
    }

    public ClimbingRoute removeOpener(Climber climber) {
        this.openers.remove(climber);
        climber.setOpenBy(null);
        return this;
    }

    public void setOpeners(Set<Climber> climbers) {
        this.openers = climbers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClimbingRoute)) {
            return false;
        }
        return id != null && id.equals(((ClimbingRoute) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ClimbingRoute{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", bonus='" + getBonus() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", difficuty='" + getDifficuty() + "'" +
            ", star=" + getStar() +
            ", physical=" + getPhysical() +
            ", technical=" + getTechnical() +
            ", tactical=" + getTactical() +
            ", mental=" + getMental() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", modifiedAt='" + getModifiedAt() + "'" +
            ", deletedAt='" + getDeletedAt() + "'" +
            ", routeType='" + getRouteType() + "'" +
            ", zouneType='" + getZouneType() + "'" +
            "}";
    }
}
