package com.pawmatch.backend.daos;

import com.pawmatch.backend.models.ShelterModel;
import com.pawmatch.backend.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShelterDao extends JpaRepository<ShelterModel,Long> {

    boolean existsByEmail(String email);

    Optional<ShelterModel> findByFirebaseUid(String firebaseUid);
}
