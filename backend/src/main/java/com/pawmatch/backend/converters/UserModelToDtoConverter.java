package com.pawmatch.backend.converters;

import com.pawmatch.backend.dtos.UserDto;
import com.pawmatch.backend.models.UserModel;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class UserModelToDtoConverter implements Converter<UserModel, UserDto> {

    @Override
    public UserDto convert(@NonNull final UserModel source) {
        Assert.notNull(source, "The UserModel can´t be null");

        UserDto dto = new UserDto();
        dto.setId(source.getId());
        dto.setName(source.getName());
        dto.setEmail(source.getEmail());
        dto.setHouseSize(source.getHouseSize());
        dto.setHasYard(source.getHasYard());
        dto.setHoursAvailablePerDay(source.getHoursAvailablePerDay());
        dto.setHasPreviousExperience(source.getHasPreviousExperience());
        dto.setHasSmallChildren(source.getHasSmallChildren());
        dto.setHasOtherPets(source.getHasOtherPets());
        dto.setActivityLevel(source.getActivityLevel());
        return dto;
    }
}
