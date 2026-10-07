package com.pawmatch.backend.facades;

import com.pawmatch.backend.dtos.PetCreateDto;
import com.pawmatch.backend.dtos.PetDto;

import java.util.List;

public interface PetFacade {

    PetDto create(final PetCreateDto petCreateDto);

    List<PetDto> findByShelterId(final Long shelterId);

    List<PetDto> findAll();

    List<PetDto> getUnseenPetsForUser(Long userId);

    void delete(final Long id);

    void update(final PetDto petDto);
}
