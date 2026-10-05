package com.pawmatch.backend.converters;

import com.pawmatch.backend.dtos.PetDto;
import com.pawmatch.backend.models.PetModel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PetModelToDtoConverter implements Converter<PetModel,PetDto> {

    @Override
    public PetDto convert(final PetModel source) {
        PetDto dto = new PetDto();
        dto.setId(source.getId());
        dto.setName(source.getName());
        dto.setSpecies(source.getSpecies());
        dto.setAge(source.getAge());
        dto.setRequiredHouseSize(source.getRequiredHouseSize());
        dto.setNeedsYard(source.getNeedsYard());
        dto.setRequiredHoursPerDay(source.getRequiredHoursPerDay());

        if (source.getShelter() != null) {
            dto.setShelterId(source.getShelter().getId());
        }

        return dto;
    }
}
