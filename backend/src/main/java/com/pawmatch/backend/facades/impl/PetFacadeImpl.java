package com.pawmatch.backend.facades.impl;

import com.pawmatch.backend.dtos.PetCreateDto;
import com.pawmatch.backend.dtos.PetDto;
import com.pawmatch.backend.facades.PetFacade;
import com.pawmatch.backend.models.PetModel;
import com.pawmatch.backend.services.PetService;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class PetFacadeImpl implements PetFacade {

    private final PetService petService;

    private final Converter<PetCreateDto, PetModel> toModelConverter;
    private final Converter<PetModel, PetDto> toDtoConverter;

    @Override
    public PetDto create(final PetCreateDto petCreateDto) {
        final PetModel petModel = petService.save(toModelConverter.convert(petCreateDto), petCreateDto.getShelterId());

        return toDtoConverter.convert(petModel);
    }

    @Override
    public List<PetDto> findByShelterId(final Long shelterId) {
        return petService.findByShelterId(shelterId)
                         .stream()
                         .map(toDtoConverter::convert)
                         .toList();
    }

    @Override
    public List<PetDto> findAll() {
        return petService.findAll()
                         .stream()
                         .map(toDtoConverter::convert)
                         .toList();
    }

    @Override
    public void delete(Long id) {
        petService.delete(id);
    }
}
