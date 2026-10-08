package com.pawmatch.backend.facades.impl;

import com.pawmatch.backend.dtos.UserDto;
import com.pawmatch.backend.dtos.UserRegisterDto;
import com.pawmatch.backend.facades.UserFacade;
import com.pawmatch.backend.models.UserModel;
import com.pawmatch.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
public class UserFacadeImpl implements UserFacade {

    private final UserService userService;

    private final Converter<UserRegisterDto, UserModel> toModelConverter;
    private final Converter<UserModel, UserDto> toDtoConverter;

    @Override
    public UserDto registerUser(final UserRegisterDto userRegisterDto) {
        final UserModel userModel = userService.save(toModelConverter.convert(userRegisterDto));

        return toDtoConverter.convert(userModel);
    }

    @Override
    public Optional<UserModel> findByFirebaseUid(String firebaseUid) {
        return userService.findByFirebaseUid(firebaseUid);
    }

    @Override
    public Optional<UserDto> getUserById(Long id) {
        return userService.findById(id)
                          .map(toDtoConverter::convert);
    }
}
