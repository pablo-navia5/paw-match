package com.pawmatch.backend.services;

import com.pawmatch.backend.models.UserModel;

public interface UserService {

    UserModel save(final UserModel user);
}
