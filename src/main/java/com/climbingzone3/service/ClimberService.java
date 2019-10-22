package com.climbingzone3.service;

import com.climbingzone3.service.dto.ClimberDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.climbingzone3.domain.Climber}.
 */
public interface ClimberService {

    /**
     * Save a climber.
     *
     * @param climberDTO the entity to save.
     * @return the persisted entity.
     */
    ClimberDTO save(ClimberDTO climberDTO);

    /**
     * Get all the climbers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ClimberDTO> findAll(Pageable pageable);

    /**
     * Get all the climbers with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<ClimberDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" climber.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ClimberDTO> findOne(Long id);

    /**
     * Delete the "id" climber.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
