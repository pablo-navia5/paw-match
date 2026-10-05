package com.pawmatch.backend.converters;

import com.pawmatch.backend.dtos.ShelterRegisterDto;
import com.pawmatch.backend.models.ShelterModel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class ShelterDtoToModelConverter implements Converter<ShelterRegisterDto, ShelterModel> {

    @Override
    public ShelterModel convert(ShelterRegisterDto source) {
        Assert.notNull(source, "The ShelterDto can´t be null");

        ShelterModel shelter = new ShelterModel();
        shelter.setName(source.getName());
        shelter.setEmail(source.getEmail());
        shelter.setFirebaseUid(source.getFirebaseUid());
        shelter.setContactPhone(source.getContactPhone());
        shelter.setAddress(source.getAddress());
        return shelter;
    }
}
