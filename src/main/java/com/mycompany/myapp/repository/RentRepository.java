package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Rent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Rent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RentRepository extends JpaRepository<Rent, Long> {

}
