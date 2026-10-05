package com.pawmatch.backend.services;

import com.pawmatch.backend.models.PetModel;

import java.util.List;

public interface PetService {

    PetModel save(final PetModel pet, final Long shelterId);

    List<PetModel> findByShelterId(final Long id);

    List<PetModel> findAll();

    void delete(final Long id);
}
