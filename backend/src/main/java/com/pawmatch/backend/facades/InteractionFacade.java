package com.pawmatch.backend.facades;

import com.pawmatch.backend.dtos.InteractionRequestDto;

public interface InteractionFacade {

    void RegisterInteraction(InteractionRequestDto requestDto);
}
