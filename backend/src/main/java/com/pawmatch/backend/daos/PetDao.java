package com.pawmatch.backend.daos;

import com.pawmatch.backend.models.PetModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetDao extends JpaRepository<PetModel,Long> {

}
