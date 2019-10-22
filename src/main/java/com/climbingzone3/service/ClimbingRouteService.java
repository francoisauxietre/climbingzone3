package com.climbingzone3.service;

import com.climbingzone3.service.dto.ClimbingRouteDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.climbingzone3.domain.ClimbingRoute}.
 */
public interface ClimbingRouteService {

    /**
     * Save a climbingRoute.
     *
     * @param climbingRouteDTO the entity to save.
     * @return the persisted entity.
     */
    ClimbingRouteDTO save(ClimbingRouteDTO climbingRouteDTO);

    /**
     * Get all the climbingRoutes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ClimbingRouteDTO> findAll(Pageable pageable);


    /**
     * Get the "id" climbingRoute.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ClimbingRouteDTO> findOne(Long id);

    /**
     * Delete the "id" climbingRoute.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
