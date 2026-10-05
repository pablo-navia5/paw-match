package com.pawmatch.backend.services.impl;

import com.pawmatch.backend.daos.InteractionDao;
import com.pawmatch.backend.models.InteractionModel;
import com.pawmatch.backend.services.InteractionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class InteractionServiceImpl implements InteractionService {

    private final InteractionDao interactionDao;

    @Override
    public void registerInteraction(InteractionModel model) {
        if (interactionDao.existsByUserIdAndPetId(model.getUserId(), model.getPetId())) {
            throw new IllegalArgumentException("El usuario ya ha interactuado con esta mascota.");
        }

        interactionDao.save(model);
    }
}
