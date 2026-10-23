package com.pawmatch.backend.facades.impl;

import com.pawmatch.backend.dtos.UserDto;
import com.pawmatch.backend.dtos.UserRegisterDto;
import com.pawmatch.backend.facades.UserFacade;
import com.pawmatch.backend.models.UserModel;
import com.pawmatch.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
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
    public Optional<UserModel> findByFirebaseUid(final String firebaseUid) {
        return userService.findByFirebaseUid(firebaseUid);
    }

    @Override
    public Optional<UserDto> getUserById(final Long id) {
        return userService.findById(id)
                          .map(toDtoConverter::convert);
    }

    @Override
    public void update(final UserDto userDto) {
        UserModel existingUser = userService.findById(userDto.getId())
                .orElseThrow(() -> new RuntimeException("User with id " + userDto.getId() + " not found"));

        if (userDto.getName() != null) {
            existingUser.setName(userDto.getName());
        }

        existingUser.setPreferredSpecies(userDto.getPreferredSpecies());
        existingUser.setMinAgePreference(userDto.getMinAgePreference());
        existingUser.setMaxAgePreference(userDto.getMaxAgePreference());
        existingUser.setHouseSize(userDto.getHouseSize());
        existingUser.setHoursAvailablePerDay(userDto.getHoursAvailablePerDay());
        existingUser.setActivityLevel(userDto.getActivityLevel());

        existingUser.setHasYard(userDto.getHasYard());
        existingUser.setHasPreviousExperience(userDto.getHasPreviousExperience());
        existingUser.setHasSmallChildren(userDto.getHasSmallChildren());
        existingUser.setHasOtherPets(userDto.getHasOtherPets());

        userService.update(existingUser);
    }
}
