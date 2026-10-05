package com.pawmatch.backend.converters;

import com.pawmatch.backend.dtos.UserDto;
import com.pawmatch.backend.dtos.UserRegisterDto;
import com.pawmatch.backend.models.UserModel;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class UserDtoToModelConverter implements Converter<UserRegisterDto, UserModel> {

    @Override
    public UserModel convert(@NonNull final UserRegisterDto source) {
        Assert.notNull(source, "The UserDto can´t be null");

        UserModel user = new UserModel();
        user.setName(source.getName());
        user.setEmail(source.getEmail());
        user.setFirebaseUid(source.getFirebaseUid());
        return user;
    }
}
