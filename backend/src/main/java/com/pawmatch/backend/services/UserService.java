package com.pawmatch.backend.services;

import com.pawmatch.backend.models.UserModel;

import java.util.Optional;

public interface UserService {

    UserModel save(final UserModel user);

    Optional<UserModel> findByFirebaseUid(final String firebaseUid);
}
