package com.pawmatch.backend.daos;

import com.pawmatch.backend.models.MatchModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchDao extends JpaRepository<MatchModel, Long> {

    @Query("SELECT m FROM match m JOIN pet p ON m.petId = p.id WHERE p.shelter.id = :shelterId ORDER BY m.createdAt DESC")
    List<MatchModel> findAllMatchesByShelter(@Param("shelterId") Long shelterId);

    @Query("SELECT m FROM match m WHERE m.userId = :userId ORDER BY m.createdAt DESC")
    List<MatchModel> findAllMatchesByUser(@Param("userId") Long userId);
}
