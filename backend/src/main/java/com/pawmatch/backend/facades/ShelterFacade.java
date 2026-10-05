package com.pawmatch.backend.facades;

import com.pawmatch.backend.dtos.ShelterDto;
import com.pawmatch.backend.dtos.ShelterRegisterDto;

public interface ShelterFacade {

    ShelterDto registerShelter(final ShelterRegisterDto shelterRegisterDto);
}
