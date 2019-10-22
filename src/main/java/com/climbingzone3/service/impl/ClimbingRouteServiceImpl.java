package com.climbingzone3.service.impl;

import com.climbingzone3.service.ClimbingRouteService;
import com.climbingzone3.domain.ClimbingRoute;
import com.climbingzone3.repository.ClimbingRouteRepository;
import com.climbingzone3.service.dto.ClimbingRouteDTO;
import com.climbingzone3.service.mapper.ClimbingRouteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ClimbingRoute}.
 */
@Service
@Transactional
public class ClimbingRouteServiceImpl implements ClimbingRouteService {

    private final Logger log = LoggerFactory.getLogger(ClimbingRouteServiceImpl.class);

    private final ClimbingRouteRepository climbingRouteRepository;

    private final ClimbingRouteMapper climbingRouteMapper;

    public ClimbingRouteServiceImpl(ClimbingRouteRepository climbingRouteRepository, ClimbingRouteMapper climbingRouteMapper) {
        this.climbingRouteRepository = climbingRouteRepository;
        this.climbingRouteMapper = climbingRouteMapper;
    }

    /**
     * Save a climbingRoute.
     *
     * @param climbingRouteDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ClimbingRouteDTO save(ClimbingRouteDTO climbingRouteDTO) {
        log.debug("Request to save ClimbingRoute : {}", climbingRouteDTO);
        ClimbingRoute climbingRoute = climbingRouteMapper.toEntity(climbingRouteDTO);
        climbingRoute = climbingRouteRepository.save(climbingRoute);
        return climbingRouteMapper.toDto(climbingRoute);
    }

    /**
     * Get all the climbingRoutes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ClimbingRouteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ClimbingRoutes");
        return climbingRouteRepository.findAll(pageable)
            .map(climbingRouteMapper::toDto);
    }


    /**
     * Get one climbingRoute by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ClimbingRouteDTO> findOne(Long id) {
        log.debug("Request to get ClimbingRoute : {}", id);
        return climbingRouteRepository.findById(id)
            .map(climbingRouteMapper::toDto);
    }

    /**
     * Delete the climbingRoute by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ClimbingRoute : {}", id);
        climbingRouteRepository.deleteById(id);
    }
}
