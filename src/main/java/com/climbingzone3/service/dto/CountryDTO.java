package com.climbingzone3.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.climbingzone3.domain.Country} entity.
 */
public class CountryDTO implements Serializable {

    private Long id;

    private String name;


    private Long climbersId;

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

    public Long getClimbersId() {
        return climbersId;
    }

    public void setClimbersId(Long climberId) {
        this.climbersId = climberId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CountryDTO countryDTO = (CountryDTO) o;
        if (countryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), countryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CountryDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", climbers=" + getClimbersId() +
            "}";
    }
}
