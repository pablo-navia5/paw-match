package com.pawmatch.backend.facades;

import com.pawmatch.backend.dtos.UserDto;
import com.pawmatch.backend.dtos.UserRegisterDto;
import com.pawmatch.backend.models.UserModel;

import java.util.Optional;

public interface UserFacade {

    UserDto registerUser(final UserRegisterDto userRegisterDto);

    Optional<UserModel> findByFirebaseUid(final String firebaseUid);
}
