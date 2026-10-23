package com.pawmatch.backend.daos;

import com.pawmatch.backend.models.PetModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetDao extends JpaRepository<PetModel,Long> {

    List<PetModel> findByShelterId(Long id);

    @Query("SELECT p FROM pet p WHERE p.status = 'AVAILABLE' AND p.id NOT IN (SELECT pi.petId FROM interaction pi WHERE pi.userId = :userId)")
    List<PetModel> findUnseenPetsForUser(@Param("userId") Long userId);
}
