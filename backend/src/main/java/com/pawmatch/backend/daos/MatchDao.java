package com.pawmatch.backend.daos;

import com.pawmatch.backend.models.MatchModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchDao extends JpaRepository<MatchModel, Long> {
}
