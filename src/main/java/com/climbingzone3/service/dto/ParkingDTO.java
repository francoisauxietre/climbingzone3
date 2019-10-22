package com.climbingzone3.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.climbingzone3.domain.Parking} entity.
 */
public class ParkingDTO implements Serializable {

    private Long id;

    private String name;

    private String description;


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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ParkingDTO parkingDTO = (ParkingDTO) o;
        if (parkingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), parkingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ParkingDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
