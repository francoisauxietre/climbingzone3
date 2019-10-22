package com.climbingzone3.service.dto;
import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.climbingzone3.domain.enumeration.Language;

/**
 * A DTO for the {@link com.climbingzone3.domain.Climber} entity.
 */
public class ClimberDTO implements Serializable {

    private Long id;

    private String firstName;

    private String lastName;

    private Instant birth;

    private Instant createdAt;

    private Instant modifiedAt;

    private Instant deletedAt;

    private Language language;


    private Long cardsId;

    private Long openById;

    private Set<ClimberDTO> friends = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Instant getBirth() {
        return birth;
    }

    public void setBirth(Instant birth) {
        this.birth = birth;
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

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Long getCardsId() {
        return cardsId;
    }

    public void setCardsId(Long cardId) {
        this.cardsId = cardId;
    }

    public Long getOpenById() {
        return openById;
    }

    public void setOpenById(Long climbingRouteId) {
        this.openById = climbingRouteId;
    }

    public Set<ClimberDTO> getFriends() {
        return friends;
    }

    public void setFriends(Set<ClimberDTO> climbers) {
        this.friends = climbers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClimberDTO climberDTO = (ClimberDTO) o;
        if (climberDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), climberDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClimberDTO{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", birth='" + getBirth() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", modifiedAt='" + getModifiedAt() + "'" +
            ", deletedAt='" + getDeletedAt() + "'" +
            ", language='" + getLanguage() + "'" +
            ", cards=" + getCardsId() +
            ", openBy=" + getOpenById() +
            "}";
    }
}
