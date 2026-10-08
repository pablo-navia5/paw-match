package com.pawmatch.backend.services;

import com.pawmatch.backend.models.ShelterModel;

import java.util.Optional;

public interface ShelterService {

    ShelterModel save(final ShelterModel shelter);

    Optional<ShelterModel> findByFirebaseUid(final String firebaseUid);

    Optional<ShelterModel> getShelterById(final Long shelterId);
}
