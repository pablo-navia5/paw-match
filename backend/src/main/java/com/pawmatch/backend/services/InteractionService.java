package com.pawmatch.backend.services;

import com.pawmatch.backend.models.InteractionModel;

public interface InteractionService {

    void registerInteraction(final InteractionModel request);

    void calculateAndSaveMatch(Long userId, Long petId);
}
