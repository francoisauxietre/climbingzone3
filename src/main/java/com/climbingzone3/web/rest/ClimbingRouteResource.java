package com.climbingzone3.web.rest;

import com.climbingzone3.service.ClimbingRouteService;
import com.climbingzone3.web.rest.errors.BadRequestAlertException;
import com.climbingzone3.service.dto.ClimbingRouteDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.climbingzone3.domain.ClimbingRoute}.
 */
@RestController
@RequestMapping("/api")
public class ClimbingRouteResource {

    private final Logger log = LoggerFactory.getLogger(ClimbingRouteResource.class);

    private static final String ENTITY_NAME = "climbingRoute";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClimbingRouteService climbingRouteService;

    public ClimbingRouteResource(ClimbingRouteService climbingRouteService) {
        this.climbingRouteService = climbingRouteService;
    }

    /**
     * {@code POST  /climbing-routes} : Create a new climbingRoute.
     *
     * @param climbingRouteDTO the climbingRouteDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new climbingRouteDTO, or with status {@code 400 (Bad Request)} if the climbingRoute has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/climbing-routes")
    public ResponseEntity<ClimbingRouteDTO> createClimbingRoute(@RequestBody ClimbingRouteDTO climbingRouteDTO) throws URISyntaxException {
        log.debug("REST request to save ClimbingRoute : {}", climbingRouteDTO);
        if (climbingRouteDTO.getId() != null) {
            throw new BadRequestAlertException("A new climbingRoute cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClimbingRouteDTO result = climbingRouteService.save(climbingRouteDTO);
        return ResponseEntity.created(new URI("/api/climbing-routes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /climbing-routes} : Updates an existing climbingRoute.
     *
     * @param climbingRouteDTO the climbingRouteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated climbingRouteDTO,
     * or with status {@code 400 (Bad Request)} if the climbingRouteDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the climbingRouteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/climbing-routes")
    public ResponseEntity<ClimbingRouteDTO> updateClimbingRoute(@RequestBody ClimbingRouteDTO climbingRouteDTO) throws URISyntaxException {
        log.debug("REST request to update ClimbingRoute : {}", climbingRouteDTO);
        if (climbingRouteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClimbingRouteDTO result = climbingRouteService.save(climbingRouteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, climbingRouteDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /climbing-routes} : get all the climbingRoutes.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of climbingRoutes in body.
     */
    @GetMapping("/climbing-routes")
    public ResponseEntity<List<ClimbingRouteDTO>> getAllClimbingRoutes(Pageable pageable) {
        log.debug("REST request to get a page of ClimbingRoutes");
        Page<ClimbingRouteDTO> page = climbingRouteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /climbing-routes/:id} : get the "id" climbingRoute.
     *
     * @param id the id of the climbingRouteDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the climbingRouteDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/climbing-routes/{id}")
    public ResponseEntity<ClimbingRouteDTO> getClimbingRoute(@PathVariable Long id) {
        log.debug("REST request to get ClimbingRoute : {}", id);
        Optional<ClimbingRouteDTO> climbingRouteDTO = climbingRouteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(climbingRouteDTO);
    }

    /**
     * {@code DELETE  /climbing-routes/:id} : delete the "id" climbingRoute.
     *
     * @param id the id of the climbingRouteDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/climbing-routes/{id}")
    public ResponseEntity<Void> deleteClimbingRoute(@PathVariable Long id) {
        log.debug("REST request to delete ClimbingRoute : {}", id);
        climbingRouteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
