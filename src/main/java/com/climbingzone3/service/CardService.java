package com.climbingzone3.service;

import com.climbingzone3.service.dto.CardDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.climbingzone3.domain.Card}.
 */
public interface CardService {

    /**
     * Save a card.
     *
     * @param cardDTO the entity to save.
     * @return the persisted entity.
     */
    CardDTO save(CardDTO cardDTO);

    /**
     * Get all the cards.
     *
     * @return the list of entities.
     */
    List<CardDTO> findAll();


    /**
     * Get the "id" card.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CardDTO> findOne(Long id);

    /**
     * Delete the "id" card.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
