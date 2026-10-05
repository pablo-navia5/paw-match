package com.pawmatch.backend.facades;

import com.pawmatch.backend.dtos.ShelterDto;
import com.pawmatch.backend.dtos.ShelterRegisterDto;
import com.pawmatch.backend.models.ShelterModel;

import java.util.Optional;

public interface ShelterFacade {

    ShelterDto registerShelter(final ShelterRegisterDto shelterRegisterDto);

    Optional<ShelterModel> findByFirebaseUid(final String firebaseUid);
}
