package com.pawmatch.backend.services.impl;

import com.pawmatch.backend.daos.UserDao;
import com.pawmatch.backend.models.UserModel;
import com.pawmatch.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    @Override
    public UserModel save(UserModel user) {
        if (userDao.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        return userDao.save(user);
    }

    @Override
    public Optional<UserModel> findByFirebaseUid(String firebaseUid) {
        return userDao.findByFirebaseUid(firebaseUid);
    }
}
