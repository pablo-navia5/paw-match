package com.pawmatch.backend.services.impl;

import com.pawmatch.backend.daos.ShelterDao;
import com.pawmatch.backend.models.ShelterModel;
import com.pawmatch.backend.services.ShelterService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ShelterServiceImpl implements ShelterService {

    private ShelterDao shelterDao;

    @Override
    public ShelterModel save(ShelterModel shelter) {
        if (shelterDao.existsByEmail(shelter.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        return shelterDao.save(shelter);
    }
}
