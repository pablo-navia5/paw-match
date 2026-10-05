package com.pawmatch.backend.services.impl;

import com.pawmatch.backend.daos.PetDao;
import com.pawmatch.backend.daos.ShelterDao;
import com.pawmatch.backend.models.PetModel;
import com.pawmatch.backend.models.ShelterModel;
import com.pawmatch.backend.services.PetService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class PetServiceImpl implements PetService {

    private final PetDao petDao;
    private final ShelterDao shelterDao;

    @Override
    public PetModel save(final PetModel pet, final Long shelterId) {
        final ShelterModel shelter = shelterDao.findById(shelterId)
                                               .orElseThrow(() -> new IllegalArgumentException("No se encontró la protectora con ID: " + shelterId));

        pet.setShelter(shelter);

        return petDao.save(pet);
    }

    @Override
    public List<PetModel> findByShelterId(Long id) {
        return petDao.findByShelterId(id);
    }

    @Override
    public List<PetModel> findAll() {
        return petDao.findAll();
    }

    @Override
    public List<PetModel> findUnseenPetsForUser(Long userId) {
        return petDao.findUnseenPetsForUser(userId);
    }

    @Override
    public void delete(Long id) {
        petDao.deleteById(id);
    }
}
