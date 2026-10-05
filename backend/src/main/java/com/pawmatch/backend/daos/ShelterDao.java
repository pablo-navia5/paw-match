package com.pawmatch.backend.daos;

import com.pawmatch.backend.models.ShelterModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelterDao extends JpaRepository<ShelterModel,Long> {

}
