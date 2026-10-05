package com.pawmatch.backend.daos;

import com.pawmatch.backend.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<UserModel,Long> {

    boolean existsByEmail(String email);

    Optional<UserModel> findByFirebaseUid(String firebaseUid);
}
