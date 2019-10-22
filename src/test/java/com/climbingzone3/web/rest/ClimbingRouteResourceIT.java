package com.climbingzone3.web.rest;

import com.climbingzone3.Climbingzone3App;
import com.climbingzone3.domain.ClimbingRoute;
import com.climbingzone3.repository.ClimbingRouteRepository;
import com.climbingzone3.service.ClimbingRouteService;
import com.climbingzone3.service.dto.ClimbingRouteDTO;
import com.climbingzone3.service.mapper.ClimbingRouteMapper;
import com.climbingzone3.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.climbingzone3.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.climbingzone3.domain.enumeration.RouteType;
import com.climbingzone3.domain.enumeration.ZoneType;
/**
 * Integration tests for the {@link ClimbingRouteResource} REST controller.
 */
@SpringBootTest(classes = Climbingzone3App.class)
public class ClimbingRouteResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BONUS = "AAAAAAAAAA";
    private static final String UPDATED_BONUS = "BBBBBBBBBB";

    private static final Float DEFAULT_LATITUDE = 1F;
    private static final Float UPDATED_LATITUDE = 2F;

    private static final Float DEFAULT_LONGITUDE = 1F;
    private static final Float UPDATED_LONGITUDE = 2F;

    private static final String DEFAULT_DIFFICUTY = "AAAAAAAAAA";
    private static final String UPDATED_DIFFICUTY = "BBBBBBBBBB";

    private static final Integer DEFAULT_STAR = 1;
    private static final Integer UPDATED_STAR = 2;

    private static final Integer DEFAULT_PHYSICAL = 1;
    private static final Integer UPDATED_PHYSICAL = 2;

    private static final Integer DEFAULT_TECHNICAL = 1;
    private static final Integer UPDATED_TECHNICAL = 2;

    private static final Integer DEFAULT_TACTICAL = 1;
    private static final Integer UPDATED_TACTICAL = 2;

    private static final Integer DEFAULT_MENTAL = 1;
    private static final Integer UPDATED_MENTAL = 2;

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_MODIFIED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFIED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DELETED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DELETED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final RouteType DEFAULT_ROUTE_TYPE = RouteType.BOULDER;
    private static final RouteType UPDATED_ROUTE_TYPE = RouteType.ROUTE;

    private static final ZoneType DEFAULT_ZOUNE_TYPE = ZoneType.INTERIOR;
    private static final ZoneType UPDATED_ZOUNE_TYPE = ZoneType.EXTERIOR;

    @Autowired
    private ClimbingRouteRepository climbingRouteRepository;

    @Autowired
    private ClimbingRouteMapper climbingRouteMapper;

    @Autowired
    private ClimbingRouteService climbingRouteService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restClimbingRouteMockMvc;

    private ClimbingRoute climbingRoute;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClimbingRouteResource climbingRouteResource = new ClimbingRouteResource(climbingRouteService);
        this.restClimbingRouteMockMvc = MockMvcBuilders.standaloneSetup(climbingRouteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClimbingRoute createEntity(EntityManager em) {
        ClimbingRoute climbingRoute = new ClimbingRoute()
            .name(DEFAULT_NAME)
            .bonus(DEFAULT_BONUS)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE)
            .difficuty(DEFAULT_DIFFICUTY)
            .star(DEFAULT_STAR)
            .physical(DEFAULT_PHYSICAL)
            .technical(DEFAULT_TECHNICAL)
            .tactical(DEFAULT_TACTICAL)
            .mental(DEFAULT_MENTAL)
            .createdAt(DEFAULT_CREATED_AT)
            .modifiedAt(DEFAULT_MODIFIED_AT)
            .deletedAt(DEFAULT_DELETED_AT)
            .routeType(DEFAULT_ROUTE_TYPE)
            .zouneType(DEFAULT_ZOUNE_TYPE);
        return climbingRoute;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClimbingRoute createUpdatedEntity(EntityManager em) {
        ClimbingRoute climbingRoute = new ClimbingRoute()
            .name(UPDATED_NAME)
            .bonus(UPDATED_BONUS)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .difficuty(UPDATED_DIFFICUTY)
            .star(UPDATED_STAR)
            .physical(UPDATED_PHYSICAL)
            .technical(UPDATED_TECHNICAL)
            .tactical(UPDATED_TACTICAL)
            .mental(UPDATED_MENTAL)
            .createdAt(UPDATED_CREATED_AT)
            .modifiedAt(UPDATED_MODIFIED_AT)
            .deletedAt(UPDATED_DELETED_AT)
            .routeType(UPDATED_ROUTE_TYPE)
            .zouneType(UPDATED_ZOUNE_TYPE);
        return climbingRoute;
    }

    @BeforeEach
    public void initTest() {
        climbingRoute = createEntity(em);
    }

    @Test
    @Transactional
    public void createClimbingRoute() throws Exception {
        int databaseSizeBeforeCreate = climbingRouteRepository.findAll().size();

        // Create the ClimbingRoute
        ClimbingRouteDTO climbingRouteDTO = climbingRouteMapper.toDto(climbingRoute);
        restClimbingRouteMockMvc.perform(post("/api/climbing-routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(climbingRouteDTO)))
            .andExpect(status().isCreated());

        // Validate the ClimbingRoute in the database
        List<ClimbingRoute> climbingRouteList = climbingRouteRepository.findAll();
        assertThat(climbingRouteList).hasSize(databaseSizeBeforeCreate + 1);
        ClimbingRoute testClimbingRoute = climbingRouteList.get(climbingRouteList.size() - 1);
        assertThat(testClimbingRoute.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testClimbingRoute.getBonus()).isEqualTo(DEFAULT_BONUS);
        assertThat(testClimbingRoute.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testClimbingRoute.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testClimbingRoute.getDifficuty()).isEqualTo(DEFAULT_DIFFICUTY);
        assertThat(testClimbingRoute.getStar()).isEqualTo(DEFAULT_STAR);
        assertThat(testClimbingRoute.getPhysical()).isEqualTo(DEFAULT_PHYSICAL);
        assertThat(testClimbingRoute.getTechnical()).isEqualTo(DEFAULT_TECHNICAL);
        assertThat(testClimbingRoute.getTactical()).isEqualTo(DEFAULT_TACTICAL);
        assertThat(testClimbingRoute.getMental()).isEqualTo(DEFAULT_MENTAL);
        assertThat(testClimbingRoute.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testClimbingRoute.getModifiedAt()).isEqualTo(DEFAULT_MODIFIED_AT);
        assertThat(testClimbingRoute.getDeletedAt()).isEqualTo(DEFAULT_DELETED_AT);
        assertThat(testClimbingRoute.getRouteType()).isEqualTo(DEFAULT_ROUTE_TYPE);
        assertThat(testClimbingRoute.getZouneType()).isEqualTo(DEFAULT_ZOUNE_TYPE);
    }

    @Test
    @Transactional
    public void createClimbingRouteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = climbingRouteRepository.findAll().size();

        // Create the ClimbingRoute with an existing ID
        climbingRoute.setId(1L);
        ClimbingRouteDTO climbingRouteDTO = climbingRouteMapper.toDto(climbingRoute);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClimbingRouteMockMvc.perform(post("/api/climbing-routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(climbingRouteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClimbingRoute in the database
        List<ClimbingRoute> climbingRouteList = climbingRouteRepository.findAll();
        assertThat(climbingRouteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllClimbingRoutes() throws Exception {
        // Initialize the database
        climbingRouteRepository.saveAndFlush(climbingRoute);

        // Get all the climbingRouteList
        restClimbingRouteMockMvc.perform(get("/api/climbing-routes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(climbingRoute.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].bonus").value(hasItem(DEFAULT_BONUS)))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].difficuty").value(hasItem(DEFAULT_DIFFICUTY)))
            .andExpect(jsonPath("$.[*].star").value(hasItem(DEFAULT_STAR)))
            .andExpect(jsonPath("$.[*].physical").value(hasItem(DEFAULT_PHYSICAL)))
            .andExpect(jsonPath("$.[*].technical").value(hasItem(DEFAULT_TECHNICAL)))
            .andExpect(jsonPath("$.[*].tactical").value(hasItem(DEFAULT_TACTICAL)))
            .andExpect(jsonPath("$.[*].mental").value(hasItem(DEFAULT_MENTAL)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].modifiedAt").value(hasItem(DEFAULT_MODIFIED_AT.toString())))
            .andExpect(jsonPath("$.[*].deletedAt").value(hasItem(DEFAULT_DELETED_AT.toString())))
            .andExpect(jsonPath("$.[*].routeType").value(hasItem(DEFAULT_ROUTE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].zouneType").value(hasItem(DEFAULT_ZOUNE_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getClimbingRoute() throws Exception {
        // Initialize the database
        climbingRouteRepository.saveAndFlush(climbingRoute);

        // Get the climbingRoute
        restClimbingRouteMockMvc.perform(get("/api/climbing-routes/{id}", climbingRoute.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(climbingRoute.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.bonus").value(DEFAULT_BONUS))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.difficuty").value(DEFAULT_DIFFICUTY))
            .andExpect(jsonPath("$.star").value(DEFAULT_STAR))
            .andExpect(jsonPath("$.physical").value(DEFAULT_PHYSICAL))
            .andExpect(jsonPath("$.technical").value(DEFAULT_TECHNICAL))
            .andExpect(jsonPath("$.tactical").value(DEFAULT_TACTICAL))
            .andExpect(jsonPath("$.mental").value(DEFAULT_MENTAL))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.modifiedAt").value(DEFAULT_MODIFIED_AT.toString()))
            .andExpect(jsonPath("$.deletedAt").value(DEFAULT_DELETED_AT.toString()))
            .andExpect(jsonPath("$.routeType").value(DEFAULT_ROUTE_TYPE.toString()))
            .andExpect(jsonPath("$.zouneType").value(DEFAULT_ZOUNE_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClimbingRoute() throws Exception {
        // Get the climbingRoute
        restClimbingRouteMockMvc.perform(get("/api/climbing-routes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClimbingRoute() throws Exception {
        // Initialize the database
        climbingRouteRepository.saveAndFlush(climbingRoute);

        int databaseSizeBeforeUpdate = climbingRouteRepository.findAll().size();

        // Update the climbingRoute
        ClimbingRoute updatedClimbingRoute = climbingRouteRepository.findById(climbingRoute.getId()).get();
        // Disconnect from session so that the updates on updatedClimbingRoute are not directly saved in db
        em.detach(updatedClimbingRoute);
        updatedClimbingRoute
            .name(UPDATED_NAME)
            .bonus(UPDATED_BONUS)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .difficuty(UPDATED_DIFFICUTY)
            .star(UPDATED_STAR)
            .physical(UPDATED_PHYSICAL)
            .technical(UPDATED_TECHNICAL)
            .tactical(UPDATED_TACTICAL)
            .mental(UPDATED_MENTAL)
            .createdAt(UPDATED_CREATED_AT)
            .modifiedAt(UPDATED_MODIFIED_AT)
            .deletedAt(UPDATED_DELETED_AT)
            .routeType(UPDATED_ROUTE_TYPE)
            .zouneType(UPDATED_ZOUNE_TYPE);
        ClimbingRouteDTO climbingRouteDTO = climbingRouteMapper.toDto(updatedClimbingRoute);

        restClimbingRouteMockMvc.perform(put("/api/climbing-routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(climbingRouteDTO)))
            .andExpect(status().isOk());

        // Validate the ClimbingRoute in the database
        List<ClimbingRoute> climbingRouteList = climbingRouteRepository.findAll();
        assertThat(climbingRouteList).hasSize(databaseSizeBeforeUpdate);
        ClimbingRoute testClimbingRoute = climbingRouteList.get(climbingRouteList.size() - 1);
        assertThat(testClimbingRoute.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testClimbingRoute.getBonus()).isEqualTo(UPDATED_BONUS);
        assertThat(testClimbingRoute.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testClimbingRoute.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testClimbingRoute.getDifficuty()).isEqualTo(UPDATED_DIFFICUTY);
        assertThat(testClimbingRoute.getStar()).isEqualTo(UPDATED_STAR);
        assertThat(testClimbingRoute.getPhysical()).isEqualTo(UPDATED_PHYSICAL);
        assertThat(testClimbingRoute.getTechnical()).isEqualTo(UPDATED_TECHNICAL);
        assertThat(testClimbingRoute.getTactical()).isEqualTo(UPDATED_TACTICAL);
        assertThat(testClimbingRoute.getMental()).isEqualTo(UPDATED_MENTAL);
        assertThat(testClimbingRoute.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testClimbingRoute.getModifiedAt()).isEqualTo(UPDATED_MODIFIED_AT);
        assertThat(testClimbingRoute.getDeletedAt()).isEqualTo(UPDATED_DELETED_AT);
        assertThat(testClimbingRoute.getRouteType()).isEqualTo(UPDATED_ROUTE_TYPE);
        assertThat(testClimbingRoute.getZouneType()).isEqualTo(UPDATED_ZOUNE_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingClimbingRoute() throws Exception {
        int databaseSizeBeforeUpdate = climbingRouteRepository.findAll().size();

        // Create the ClimbingRoute
        ClimbingRouteDTO climbingRouteDTO = climbingRouteMapper.toDto(climbingRoute);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClimbingRouteMockMvc.perform(put("/api/climbing-routes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(climbingRouteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClimbingRoute in the database
        List<ClimbingRoute> climbingRouteList = climbingRouteRepository.findAll();
        assertThat(climbingRouteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClimbingRoute() throws Exception {
        // Initialize the database
        climbingRouteRepository.saveAndFlush(climbingRoute);

        int databaseSizeBeforeDelete = climbingRouteRepository.findAll().size();

        // Delete the climbingRoute
        restClimbingRouteMockMvc.perform(delete("/api/climbing-routes/{id}", climbingRoute.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ClimbingRoute> climbingRouteList = climbingRouteRepository.findAll();
        assertThat(climbingRouteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClimbingRoute.class);
        ClimbingRoute climbingRoute1 = new ClimbingRoute();
        climbingRoute1.setId(1L);
        ClimbingRoute climbingRoute2 = new ClimbingRoute();
        climbingRoute2.setId(climbingRoute1.getId());
        assertThat(climbingRoute1).isEqualTo(climbingRoute2);
        climbingRoute2.setId(2L);
        assertThat(climbingRoute1).isNotEqualTo(climbingRoute2);
        climbingRoute1.setId(null);
        assertThat(climbingRoute1).isNotEqualTo(climbingRoute2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClimbingRouteDTO.class);
        ClimbingRouteDTO climbingRouteDTO1 = new ClimbingRouteDTO();
        climbingRouteDTO1.setId(1L);
        ClimbingRouteDTO climbingRouteDTO2 = new ClimbingRouteDTO();
        assertThat(climbingRouteDTO1).isNotEqualTo(climbingRouteDTO2);
        climbingRouteDTO2.setId(climbingRouteDTO1.getId());
        assertThat(climbingRouteDTO1).isEqualTo(climbingRouteDTO2);
        climbingRouteDTO2.setId(2L);
        assertThat(climbingRouteDTO1).isNotEqualTo(climbingRouteDTO2);
        climbingRouteDTO1.setId(null);
        assertThat(climbingRouteDTO1).isNotEqualTo(climbingRouteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(climbingRouteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(climbingRouteMapper.fromId(null)).isNull();
    }
}
