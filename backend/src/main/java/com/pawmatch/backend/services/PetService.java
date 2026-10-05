package com.pawmatch.backend.services;

import com.pawmatch.backend.models.PetModel;
import com.pawmatch.backend.models.ShelterModel;

import java.util.List;
import java.util.Optional;

public interface PetService {

    PetModel save(final PetModel pet, final Long shelterId);

    List<PetModel> findByShelterId(final Long id);

    Optional<PetModel> findById(final Long id);
}
