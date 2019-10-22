package com.climbingzone3.web.rest;

import com.climbingzone3.Climbingzone3App;
import com.climbingzone3.domain.Climber;
import com.climbingzone3.repository.ClimberRepository;
import com.climbingzone3.service.ClimberService;
import com.climbingzone3.service.dto.ClimberDTO;
import com.climbingzone3.service.mapper.ClimberMapper;
import com.climbingzone3.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;

import static com.climbingzone3.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.climbingzone3.domain.enumeration.Language;
/**
 * Integration tests for the {@link ClimberResource} REST controller.
 */
@SpringBootTest(classes = Climbingzone3App.class)
public class ClimberResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_BIRTH = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_BIRTH = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_MODIFIED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_MODIFIED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DELETED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DELETED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Language DEFAULT_LANGUAGE = Language.FRENCH;
    private static final Language UPDATED_LANGUAGE = Language.ENGLISH;

    @Autowired
    private ClimberRepository climberRepository;

    @Mock
    private ClimberRepository climberRepositoryMock;

    @Autowired
    private ClimberMapper climberMapper;

    @Mock
    private ClimberService climberServiceMock;

    @Autowired
    private ClimberService climberService;

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

    private MockMvc restClimberMockMvc;

    private Climber climber;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClimberResource climberResource = new ClimberResource(climberService);
        this.restClimberMockMvc = MockMvcBuilders.standaloneSetup(climberResource)
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
    public static Climber createEntity(EntityManager em) {
        Climber climber = new Climber()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .birth(DEFAULT_BIRTH)
            .createdAt(DEFAULT_CREATED_AT)
            .modifiedAt(DEFAULT_MODIFIED_AT)
            .deletedAt(DEFAULT_DELETED_AT)
            .language(DEFAULT_LANGUAGE);
        return climber;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Climber createUpdatedEntity(EntityManager em) {
        Climber climber = new Climber()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .birth(UPDATED_BIRTH)
            .createdAt(UPDATED_CREATED_AT)
            .modifiedAt(UPDATED_MODIFIED_AT)
            .deletedAt(UPDATED_DELETED_AT)
            .language(UPDATED_LANGUAGE);
        return climber;
    }

    @BeforeEach
    public void initTest() {
        climber = createEntity(em);
    }

    @Test
    @Transactional
    public void createClimber() throws Exception {
        int databaseSizeBeforeCreate = climberRepository.findAll().size();

        // Create the Climber
        ClimberDTO climberDTO = climberMapper.toDto(climber);
        restClimberMockMvc.perform(post("/api/climbers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(climberDTO)))
            .andExpect(status().isCreated());

        // Validate the Climber in the database
        List<Climber> climberList = climberRepository.findAll();
        assertThat(climberList).hasSize(databaseSizeBeforeCreate + 1);
        Climber testClimber = climberList.get(climberList.size() - 1);
        assertThat(testClimber.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testClimber.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testClimber.getBirth()).isEqualTo(DEFAULT_BIRTH);
        assertThat(testClimber.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testClimber.getModifiedAt()).isEqualTo(DEFAULT_MODIFIED_AT);
        assertThat(testClimber.getDeletedAt()).isEqualTo(DEFAULT_DELETED_AT);
        assertThat(testClimber.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
    }

    @Test
    @Transactional
    public void createClimberWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = climberRepository.findAll().size();

        // Create the Climber with an existing ID
        climber.setId(1L);
        ClimberDTO climberDTO = climberMapper.toDto(climber);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClimberMockMvc.perform(post("/api/climbers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(climberDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Climber in the database
        List<Climber> climberList = climberRepository.findAll();
        assertThat(climberList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllClimbers() throws Exception {
        // Initialize the database
        climberRepository.saveAndFlush(climber);

        // Get all the climberList
        restClimberMockMvc.perform(get("/api/climbers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(climber.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].birth").value(hasItem(DEFAULT_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].modifiedAt").value(hasItem(DEFAULT_MODIFIED_AT.toString())))
            .andExpect(jsonPath("$.[*].deletedAt").value(hasItem(DEFAULT_DELETED_AT.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllClimbersWithEagerRelationshipsIsEnabled() throws Exception {
        ClimberResource climberResource = new ClimberResource(climberServiceMock);
        when(climberServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restClimberMockMvc = MockMvcBuilders.standaloneSetup(climberResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restClimberMockMvc.perform(get("/api/climbers?eagerload=true"))
        .andExpect(status().isOk());

        verify(climberServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllClimbersWithEagerRelationshipsIsNotEnabled() throws Exception {
        ClimberResource climberResource = new ClimberResource(climberServiceMock);
            when(climberServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restClimberMockMvc = MockMvcBuilders.standaloneSetup(climberResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restClimberMockMvc.perform(get("/api/climbers?eagerload=true"))
        .andExpect(status().isOk());

            verify(climberServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getClimber() throws Exception {
        // Initialize the database
        climberRepository.saveAndFlush(climber);

        // Get the climber
        restClimberMockMvc.perform(get("/api/climbers/{id}", climber.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(climber.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.birth").value(DEFAULT_BIRTH.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.modifiedAt").value(DEFAULT_MODIFIED_AT.toString()))
            .andExpect(jsonPath("$.deletedAt").value(DEFAULT_DELETED_AT.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClimber() throws Exception {
        // Get the climber
        restClimberMockMvc.perform(get("/api/climbers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClimber() throws Exception {
        // Initialize the database
        climberRepository.saveAndFlush(climber);

        int databaseSizeBeforeUpdate = climberRepository.findAll().size();

        // Update the climber
        Climber updatedClimber = climberRepository.findById(climber.getId()).get();
        // Disconnect from session so that the updates on updatedClimber are not directly saved in db
        em.detach(updatedClimber);
        updatedClimber
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .birth(UPDATED_BIRTH)
            .createdAt(UPDATED_CREATED_AT)
            .modifiedAt(UPDATED_MODIFIED_AT)
            .deletedAt(UPDATED_DELETED_AT)
            .language(UPDATED_LANGUAGE);
        ClimberDTO climberDTO = climberMapper.toDto(updatedClimber);

        restClimberMockMvc.perform(put("/api/climbers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(climberDTO)))
            .andExpect(status().isOk());

        // Validate the Climber in the database
        List<Climber> climberList = climberRepository.findAll();
        assertThat(climberList).hasSize(databaseSizeBeforeUpdate);
        Climber testClimber = climberList.get(climberList.size() - 1);
        assertThat(testClimber.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testClimber.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testClimber.getBirth()).isEqualTo(UPDATED_BIRTH);
        assertThat(testClimber.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testClimber.getModifiedAt()).isEqualTo(UPDATED_MODIFIED_AT);
        assertThat(testClimber.getDeletedAt()).isEqualTo(UPDATED_DELETED_AT);
        assertThat(testClimber.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingClimber() throws Exception {
        int databaseSizeBeforeUpdate = climberRepository.findAll().size();

        // Create the Climber
        ClimberDTO climberDTO = climberMapper.toDto(climber);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClimberMockMvc.perform(put("/api/climbers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(climberDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Climber in the database
        List<Climber> climberList = climberRepository.findAll();
        assertThat(climberList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClimber() throws Exception {
        // Initialize the database
        climberRepository.saveAndFlush(climber);

        int databaseSizeBeforeDelete = climberRepository.findAll().size();

        // Delete the climber
        restClimberMockMvc.perform(delete("/api/climbers/{id}", climber.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Climber> climberList = climberRepository.findAll();
        assertThat(climberList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Climber.class);
        Climber climber1 = new Climber();
        climber1.setId(1L);
        Climber climber2 = new Climber();
        climber2.setId(climber1.getId());
        assertThat(climber1).isEqualTo(climber2);
        climber2.setId(2L);
        assertThat(climber1).isNotEqualTo(climber2);
        climber1.setId(null);
        assertThat(climber1).isNotEqualTo(climber2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClimberDTO.class);
        ClimberDTO climberDTO1 = new ClimberDTO();
        climberDTO1.setId(1L);
        ClimberDTO climberDTO2 = new ClimberDTO();
        assertThat(climberDTO1).isNotEqualTo(climberDTO2);
        climberDTO2.setId(climberDTO1.getId());
        assertThat(climberDTO1).isEqualTo(climberDTO2);
        climberDTO2.setId(2L);
        assertThat(climberDTO1).isNotEqualTo(climberDTO2);
        climberDTO1.setId(null);
        assertThat(climberDTO1).isNotEqualTo(climberDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(climberMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(climberMapper.fromId(null)).isNull();
    }
}
