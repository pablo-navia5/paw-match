package com.pawmatch.backend.facades.impl;

import com.pawmatch.backend.dtos.ShelterDto;
import com.pawmatch.backend.dtos.ShelterRegisterDto;
import com.pawmatch.backend.facades.ShelterFacade;
import com.pawmatch.backend.models.ShelterModel;
import com.pawmatch.backend.services.ShelterService;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
public class ShelterFacadeImpl implements ShelterFacade {

    private final ShelterService shelterService;

    private final Converter<ShelterRegisterDto, ShelterModel> toModelConverter;
    private final Converter<ShelterModel, ShelterDto> toDtoConverter;

    @Override
    public ShelterDto registerShelter(final ShelterRegisterDto shelterRegisterDto) {
        final ShelterModel shelterModel = shelterService.save(toModelConverter.convert(shelterRegisterDto));

        return toDtoConverter.convert(shelterModel);
    }

    @Override
    public Optional<ShelterModel> findByFirebaseUid(String firebaseUid) {
        return shelterService.findByFirebaseUid(firebaseUid);
    }

    @Override
    public Optional<ShelterDto> getShelterById(Long shelterId) {
        return shelterService.getShelterById(shelterId)
                             .map(toDtoConverter::convert);
    }
}
