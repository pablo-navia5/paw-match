package com.pawmatch.backend.facades.impl;

import com.pawmatch.backend.dtos.PetCreateDto;
import com.pawmatch.backend.dtos.PetDto;
import com.pawmatch.backend.facades.PetFacade;
import com.pawmatch.backend.models.PetModel;
import com.pawmatch.backend.services.PetService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class PetFacadeImpl implements PetFacade {

    private final PetService petService;

    private final Converter<PetCreateDto, PetModel> CreatetoModelConverter;
    private final Converter<PetModel, PetDto> toDtoConverter;
    private final Converter<PetDto, PetModel> toModelConverter;

    @Override
    public PetDto create(final PetCreateDto petCreateDto) {
        final PetModel petModel = petService.save(CreatetoModelConverter.convert(petCreateDto), petCreateDto.getShelterId());

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
    public List<PetDto> getUnseenPetsForUser(Long userId) {
        List<PetModel> unseenPets = petService.findUnseenPetsForUser(userId);

        return unseenPets.stream()
                .map(toDtoConverter::convert)
                .toList();
    }

    @Override
    public void delete(Long id) {
        petService.delete(id);
    }

    @Override
    public void update(PetDto petDto) {
        PetModel existingPet = petService.findById(petDto.getId())
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

        BeanUtils.copyProperties(petDto, existingPet, "id", "shelterId");

        petService.update(existingPet);
    }
}
