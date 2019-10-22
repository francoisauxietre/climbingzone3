package com.climbingzone3.service.dto;
import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.climbingzone3.domain.enumeration.RouteType;
import com.climbingzone3.domain.enumeration.ZoneType;

/**
 * A DTO for the {@link com.climbingzone3.domain.ClimbingRoute} entity.
 */
public class ClimbingRouteDTO implements Serializable {

    private Long id;

    private String name;

    private String bonus;

    private Float latitude;

    private Float longitude;

    private String difficuty;

    private Integer star;

    private Integer physical;

    private Integer technical;

    private Integer tactical;

    private Integer mental;

    private Instant createdAt;

    private Instant modifiedAt;

    private Instant deletedAt;

    private RouteType routeType;

    private ZoneType zouneType;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBonus() {
        return bonus;
    }

    public void setBonus(String bonus) {
        this.bonus = bonus;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public String getDifficuty() {
        return difficuty;
    }

    public void setDifficuty(String difficuty) {
        this.difficuty = difficuty;
    }

    public Integer getStar() {
        return star;
    }

    public void setStar(Integer star) {
        this.star = star;
    }

    public Integer getPhysical() {
        return physical;
    }

    public void setPhysical(Integer physical) {
        this.physical = physical;
    }

    public Integer getTechnical() {
        return technical;
    }

    public void setTechnical(Integer technical) {
        this.technical = technical;
    }

    public Integer getTactical() {
        return tactical;
    }

    public void setTactical(Integer tactical) {
        this.tactical = tactical;
    }

    public Integer getMental() {
        return mental;
    }

    public void setMental(Integer mental) {
        this.mental = mental;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Instant modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public Instant getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Instant deletedAt) {
        this.deletedAt = deletedAt;
    }

    public RouteType getRouteType() {
        return routeType;
    }

    public void setRouteType(RouteType routeType) {
        this.routeType = routeType;
    }

    public ZoneType getZouneType() {
        return zouneType;
    }

    public void setZouneType(ZoneType zouneType) {
        this.zouneType = zouneType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClimbingRouteDTO climbingRouteDTO = (ClimbingRouteDTO) o;
        if (climbingRouteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), climbingRouteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClimbingRouteDTO{" +
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
