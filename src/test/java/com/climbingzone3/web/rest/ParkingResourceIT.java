package com.climbingzone3.web.rest;

import com.climbingzone3.Climbingzone3App;
import com.climbingzone3.domain.Parking;
import com.climbingzone3.repository.ParkingRepository;
import com.climbingzone3.service.ParkingService;
import com.climbingzone3.service.dto.ParkingDTO;
import com.climbingzone3.service.mapper.ParkingMapper;
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
import java.util.List;

import static com.climbingzone3.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ParkingResource} REST controller.
 */
@SpringBootTest(classes = Climbingzone3App.class)
public class ParkingResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ParkingRepository parkingRepository;

    @Autowired
    private ParkingMapper parkingMapper;

    @Autowired
    private ParkingService parkingService;

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

    private MockMvc restParkingMockMvc;

    private Parking parking;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParkingResource parkingResource = new ParkingResource(parkingService);
        this.restParkingMockMvc = MockMvcBuilders.standaloneSetup(parkingResource)
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
    public static Parking createEntity(EntityManager em) {
        Parking parking = new Parking()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return parking;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Parking createUpdatedEntity(EntityManager em) {
        Parking parking = new Parking()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return parking;
    }

    @BeforeEach
    public void initTest() {
        parking = createEntity(em);
    }

    @Test
    @Transactional
    public void createParking() throws Exception {
        int databaseSizeBeforeCreate = parkingRepository.findAll().size();

        // Create the Parking
        ParkingDTO parkingDTO = parkingMapper.toDto(parking);
        restParkingMockMvc.perform(post("/api/parkings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parkingDTO)))
            .andExpect(status().isCreated());

        // Validate the Parking in the database
        List<Parking> parkingList = parkingRepository.findAll();
        assertThat(parkingList).hasSize(databaseSizeBeforeCreate + 1);
        Parking testParking = parkingList.get(parkingList.size() - 1);
        assertThat(testParking.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testParking.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createParkingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = parkingRepository.findAll().size();

        // Create the Parking with an existing ID
        parking.setId(1L);
        ParkingDTO parkingDTO = parkingMapper.toDto(parking);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParkingMockMvc.perform(post("/api/parkings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parkingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Parking in the database
        List<Parking> parkingList = parkingRepository.findAll();
        assertThat(parkingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllParkings() throws Exception {
        // Initialize the database
        parkingRepository.saveAndFlush(parking);

        // Get all the parkingList
        restParkingMockMvc.perform(get("/api/parkings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(parking.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getParking() throws Exception {
        // Initialize the database
        parkingRepository.saveAndFlush(parking);

        // Get the parking
        restParkingMockMvc.perform(get("/api/parkings/{id}", parking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(parking.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingParking() throws Exception {
        // Get the parking
        restParkingMockMvc.perform(get("/api/parkings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParking() throws Exception {
        // Initialize the database
        parkingRepository.saveAndFlush(parking);

        int databaseSizeBeforeUpdate = parkingRepository.findAll().size();

        // Update the parking
        Parking updatedParking = parkingRepository.findById(parking.getId()).get();
        // Disconnect from session so that the updates on updatedParking are not directly saved in db
        em.detach(updatedParking);
        updatedParking
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        ParkingDTO parkingDTO = parkingMapper.toDto(updatedParking);

        restParkingMockMvc.perform(put("/api/parkings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parkingDTO)))
            .andExpect(status().isOk());

        // Validate the Parking in the database
        List<Parking> parkingList = parkingRepository.findAll();
        assertThat(parkingList).hasSize(databaseSizeBeforeUpdate);
        Parking testParking = parkingList.get(parkingList.size() - 1);
        assertThat(testParking.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testParking.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingParking() throws Exception {
        int databaseSizeBeforeUpdate = parkingRepository.findAll().size();

        // Create the Parking
        ParkingDTO parkingDTO = parkingMapper.toDto(parking);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restParkingMockMvc.perform(put("/api/parkings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(parkingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Parking in the database
        List<Parking> parkingList = parkingRepository.findAll();
        assertThat(parkingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteParking() throws Exception {
        // Initialize the database
        parkingRepository.saveAndFlush(parking);

        int databaseSizeBeforeDelete = parkingRepository.findAll().size();

        // Delete the parking
        restParkingMockMvc.perform(delete("/api/parkings/{id}", parking.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Parking> parkingList = parkingRepository.findAll();
        assertThat(parkingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parking.class);
        Parking parking1 = new Parking();
        parking1.setId(1L);
        Parking parking2 = new Parking();
        parking2.setId(parking1.getId());
        assertThat(parking1).isEqualTo(parking2);
        parking2.setId(2L);
        assertThat(parking1).isNotEqualTo(parking2);
        parking1.setId(null);
        assertThat(parking1).isNotEqualTo(parking2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParkingDTO.class);
        ParkingDTO parkingDTO1 = new ParkingDTO();
        parkingDTO1.setId(1L);
        ParkingDTO parkingDTO2 = new ParkingDTO();
        assertThat(parkingDTO1).isNotEqualTo(parkingDTO2);
        parkingDTO2.setId(parkingDTO1.getId());
        assertThat(parkingDTO1).isEqualTo(parkingDTO2);
        parkingDTO2.setId(2L);
        assertThat(parkingDTO1).isNotEqualTo(parkingDTO2);
        parkingDTO1.setId(null);
        assertThat(parkingDTO1).isNotEqualTo(parkingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(parkingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(parkingMapper.fromId(null)).isNull();
    }
}
