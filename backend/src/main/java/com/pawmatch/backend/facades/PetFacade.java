package com.pawmatch.backend.facades;

import com.pawmatch.backend.dtos.PetCreateDto;
import com.pawmatch.backend.dtos.PetDto;

import java.util.List;

public interface PetFacade {

    PetDto create(final PetCreateDto petCreateDto);

    List<PetDto> findByShelterId(final Long shelterId);
}
