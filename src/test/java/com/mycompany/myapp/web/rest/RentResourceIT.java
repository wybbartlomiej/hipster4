package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.App4App;
import com.mycompany.myapp.domain.Rent;
import com.mycompany.myapp.repository.RentRepository;
import com.mycompany.myapp.service.UserService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RentResource} REST controller.
 */
@SpringBootTest(classes = App4App.class)
public class RentResourceIT {

    private static final LocalDate DEFAULT_TERM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TERM = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private RentRepository rentRepository;

    @Autowired
    private UserService userService;

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

    private MockMvc restRentMockMvc;

    private Rent rent;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RentResource rentResource = new RentResource(rentRepository, userService);
        this.restRentMockMvc = MockMvcBuilders.standaloneSetup(rentResource)
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
    public static Rent createEntity(EntityManager em) {
        Rent rent = new Rent()
            .term(DEFAULT_TERM);
        return rent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rent createUpdatedEntity(EntityManager em) {
        Rent rent = new Rent()
            .term(UPDATED_TERM);
        return rent;
    }

    @BeforeEach
    public void initTest() {
        rent = createEntity(em);
    }

    @Test
    @Transactional
    public void createRent() throws Exception {
        int databaseSizeBeforeCreate = rentRepository.findAll().size();

        // Create the Rent
        restRentMockMvc.perform(post("/api/rents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rent)))
            .andExpect(status().isCreated());

        // Validate the Rent in the database
        List<Rent> rentList = rentRepository.findAll();
        assertThat(rentList).hasSize(databaseSizeBeforeCreate + 1);
        Rent testRent = rentList.get(rentList.size() - 1);
        assertThat(testRent.getTerm()).isEqualTo(DEFAULT_TERM);
    }

    @Test
    @Transactional
    public void createRentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rentRepository.findAll().size();

        // Create the Rent with an existing ID
        rent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRentMockMvc.perform(post("/api/rents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rent)))
            .andExpect(status().isBadRequest());

        // Validate the Rent in the database
        List<Rent> rentList = rentRepository.findAll();
        assertThat(rentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRents() throws Exception {
        // Initialize the database
        rentRepository.saveAndFlush(rent);

        // Get all the rentList
        restRentMockMvc.perform(get("/api/rents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rent.getId().intValue())))
            .andExpect(jsonPath("$.[*].term").value(hasItem(DEFAULT_TERM.toString())));
    }
    
    @Test
    @Transactional
    public void getRent() throws Exception {
        // Initialize the database
        rentRepository.saveAndFlush(rent);

        // Get the rent
        restRentMockMvc.perform(get("/api/rents/{id}", rent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rent.getId().intValue()))
            .andExpect(jsonPath("$.term").value(DEFAULT_TERM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRent() throws Exception {
        // Get the rent
        restRentMockMvc.perform(get("/api/rents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRent() throws Exception {
        // Initialize the database
        rentRepository.saveAndFlush(rent);

        int databaseSizeBeforeUpdate = rentRepository.findAll().size();

        // Update the rent
        Rent updatedRent = rentRepository.findById(rent.getId()).get();
        // Disconnect from session so that the updates on updatedRent are not directly saved in db
        em.detach(updatedRent);
        updatedRent
            .term(UPDATED_TERM);

        restRentMockMvc.perform(put("/api/rents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRent)))
            .andExpect(status().isOk());

        // Validate the Rent in the database
        List<Rent> rentList = rentRepository.findAll();
        assertThat(rentList).hasSize(databaseSizeBeforeUpdate);
        Rent testRent = rentList.get(rentList.size() - 1);
        assertThat(testRent.getTerm()).isEqualTo(UPDATED_TERM);
    }

    @Test
    @Transactional
    public void updateNonExistingRent() throws Exception {
        int databaseSizeBeforeUpdate = rentRepository.findAll().size();

        // Create the Rent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRentMockMvc.perform(put("/api/rents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rent)))
            .andExpect(status().isBadRequest());

        // Validate the Rent in the database
        List<Rent> rentList = rentRepository.findAll();
        assertThat(rentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRent() throws Exception {
        // Initialize the database
        rentRepository.saveAndFlush(rent);

        int databaseSizeBeforeDelete = rentRepository.findAll().size();

        // Delete the rent
        restRentMockMvc.perform(delete("/api/rents/{id}", rent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Rent> rentList = rentRepository.findAll();
        assertThat(rentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
