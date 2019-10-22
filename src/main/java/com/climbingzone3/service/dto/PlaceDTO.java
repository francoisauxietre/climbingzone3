package com.climbingzone3.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.climbingzone3.domain.Place} entity.
 */
public class PlaceDTO implements Serializable {

    private Long id;

    private String name;

    private Float latitude;

    private Float longitude;


    private Long parkingsId;

    private Long locatedId;

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

    public Long getParkingsId() {
        return parkingsId;
    }

    public void setParkingsId(Long parkingId) {
        this.parkingsId = parkingId;
    }

    public Long getLocatedId() {
        return locatedId;
    }

    public void setLocatedId(Long climbingRouteId) {
        this.locatedId = climbingRouteId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PlaceDTO placeDTO = (PlaceDTO) o;
        if (placeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), placeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlaceDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", parkings=" + getParkingsId() +
            ", located=" + getLocatedId() +
            "}";
    }
}
