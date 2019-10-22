package com.climbingzone3.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.climbingzone3.domain.enumeration.Language;

/**
 * A Climber.
 */
@Entity
@Table(name = "climber")
public class Climber implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "birth")
    private Instant birth;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "modified_at")
    private Instant modifiedAt;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @OneToMany(mappedBy = "climbers")
    private Set<Country> countries = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("climbers")
    private Card cards;

    @ManyToOne
    @JsonIgnoreProperties("openers")
    private ClimbingRoute openBy;

    @ManyToMany
    @JoinTable(name = "climber_friends",
               joinColumns = @JoinColumn(name = "climber_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "friends_id", referencedColumnName = "id"))
    private Set<Climber> friends = new HashSet<>();

    @ManyToMany(mappedBy = "friends")
    @JsonIgnore
    private Set<Climber> fromFriends = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Climber firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Climber lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Instant getBirth() {
        return birth;
    }

    public Climber birth(Instant birth) {
        this.birth = birth;
        return this;
    }

    public void setBirth(Instant birth) {
        this.birth = birth;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Climber createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getModifiedAt() {
        return modifiedAt;
    }

    public Climber modifiedAt(Instant modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }

    public void setModifiedAt(Instant modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public Instant getDeletedAt() {
        return deletedAt;
    }

    public Climber deletedAt(Instant deletedAt) {
        this.deletedAt = deletedAt;
        return this;
    }

    public void setDeletedAt(Instant deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Language getLanguage() {
        return language;
    }

    public Climber language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Set<Country> getCountries() {
        return countries;
    }

    public Climber countries(Set<Country> countries) {
        this.countries = countries;
        return this;
    }

    public Climber addCountry(Country country) {
        this.countries.add(country);
        country.setClimbers(this);
        return this;
    }

    public Climber removeCountry(Country country) {
        this.countries.remove(country);
        country.setClimbers(null);
        return this;
    }

    public void setCountries(Set<Country> countries) {
        this.countries = countries;
    }

    public Card getCards() {
        return cards;
    }

    public Climber cards(Card card) {
        this.cards = card;
        return this;
    }

    public void setCards(Card card) {
        this.cards = card;
    }

    public ClimbingRoute getOpenBy() {
        return openBy;
    }

    public Climber openBy(ClimbingRoute climbingRoute) {
        this.openBy = climbingRoute;
        return this;
    }

    public void setOpenBy(ClimbingRoute climbingRoute) {
        this.openBy = climbingRoute;
    }

    public Set<Climber> getFriends() {
        return friends;
    }

    public Climber friends(Set<Climber> climbers) {
        this.friends = climbers;
        return this;
    }

    public Climber addFriends(Climber climber) {
        this.friends.add(climber);
        climber.getFromFriends().add(this);
        return this;
    }

    public Climber removeFriends(Climber climber) {
        this.friends.remove(climber);
        climber.getFromFriends().remove(this);
        return this;
    }

    public void setFriends(Set<Climber> climbers) {
        this.friends = climbers;
    }

    public Set<Climber> getFromFriends() {
        return fromFriends;
    }

    public Climber fromFriends(Set<Climber> climbers) {
        this.fromFriends = climbers;
        return this;
    }

    public Climber addFromFriends(Climber climber) {
        this.fromFriends.add(climber);
        climber.getFriends().add(this);
        return this;
    }

    public Climber removeFromFriends(Climber climber) {
        this.fromFriends.remove(climber);
        climber.getFriends().remove(this);
        return this;
    }

    public void setFromFriends(Set<Climber> climbers) {
        this.fromFriends = climbers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Climber)) {
            return false;
        }
        return id != null && id.equals(((Climber) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Climber{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", birth='" + getBirth() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", modifiedAt='" + getModifiedAt() + "'" +
            ", deletedAt='" + getDeletedAt() + "'" +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
