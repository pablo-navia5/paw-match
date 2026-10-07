package com.pawmatch.backend.services;

import com.pawmatch.backend.models.PetModel;

import java.util.List;
import java.util.Optional;

public interface PetService {

    PetModel save(final PetModel pet, final Long shelterId);

    List<PetModel> findByShelterId(final Long id);

    List<PetModel> findAll();

    List<PetModel> findUnseenPetsForUser(Long userId);

    Optional<PetModel> findById(Long id);

    void delete(final Long id);
}
