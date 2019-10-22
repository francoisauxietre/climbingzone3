package com.climbingzone3.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Card.
 */
@Entity
@Table(name = "card")
public class Card implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @OneToMany(mappedBy = "cards")
    private Set<Climber> climbers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Card title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Climber> getClimbers() {
        return climbers;
    }

    public Card climbers(Set<Climber> climbers) {
        this.climbers = climbers;
        return this;
    }

    public Card addClimber(Climber climber) {
        this.climbers.add(climber);
        climber.setCards(this);
        return this;
    }

    public Card removeClimber(Climber climber) {
        this.climbers.remove(climber);
        climber.setCards(null);
        return this;
    }

    public void setClimbers(Set<Climber> climbers) {
        this.climbers = climbers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Card)) {
            return false;
        }
        return id != null && id.equals(((Card) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Card{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
