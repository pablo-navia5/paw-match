package com.pawmatch.backend.converters;

import com.pawmatch.backend.dtos.ShelterDto;
import com.pawmatch.backend.models.ShelterModel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class ShelterModelToDto implements Converter<ShelterModel, ShelterDto> {

    @Override
    public ShelterDto convert(ShelterModel source) {
        Assert.notNull(source, "The ShelterModel can´t be null");

        ShelterDto dto = new ShelterDto();
        dto.setId(source.getId());
        dto.setName(source.getName());
        dto.setEmail(source.getEmail());
        dto.setContactPhone(source.getContactPhone());
        dto.setAddress(source.getAddress());
        return dto;
    }
}
