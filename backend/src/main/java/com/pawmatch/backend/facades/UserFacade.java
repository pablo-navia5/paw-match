package com.pawmatch.backend.facades;

import com.pawmatch.backend.dtos.UserDto;
import com.pawmatch.backend.dtos.UserRegisterDto;

public interface UserFacade {

    UserDto registerUser(final UserRegisterDto userRegisterDto);
}
