package com.pawmatch.backend.daos;

import com.pawmatch.backend.models.InteractionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InteractionDao extends JpaRepository<InteractionModel, Long> {

    boolean existsByUserIdAndPetId(Long userId, Long petId);
}
