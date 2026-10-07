package com.pawmatch.backend.services;

import com.pawmatch.backend.models.InteractionModel;

public interface InteractionService {

    boolean registerInteraction(final InteractionModel request);

    boolean calculateAndSaveMatch(Long userId, Long petId);
}
