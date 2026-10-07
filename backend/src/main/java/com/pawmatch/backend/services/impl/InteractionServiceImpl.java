package com.pawmatch.backend.services.impl;

import com.pawmatch.backend.daos.InteractionDao;
import com.pawmatch.backend.daos.MatchDao;
import com.pawmatch.backend.daos.PetDao;
import com.pawmatch.backend.daos.UserDao;
import com.pawmatch.backend.enums.InteractionType;
import com.pawmatch.backend.enums.MatchStatus;
import com.pawmatch.backend.models.InteractionModel;
import com.pawmatch.backend.models.MatchModel;
import com.pawmatch.backend.models.PetModel;
import com.pawmatch.backend.models.UserModel;
import com.pawmatch.backend.services.InteractionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class InteractionServiceImpl implements InteractionService {

    private final InteractionDao interactionDao;
    private final UserDao userDao;
    private final PetDao petDao;
    private final MatchDao matchDao;

    @Override
    public boolean registerInteraction(InteractionModel model) {
        if (interactionDao.existsByUserIdAndPetId(model.getUserId(), model.getPetId())) {
            throw new IllegalArgumentException("El usuario ya ha interactuado con esta mascota.");
        }

        interactionDao.save(model);

        if (model.getInteractionType() == InteractionType.LIKE) {
            return calculateAndSaveMatch(model.getUserId(), model.getPetId());
        }

        return false;
    }

    @Override
    public boolean calculateAndSaveMatch(Long userId, Long petId) {
        UserModel user = userDao.findById(userId).orElseThrow();
        PetModel pet = petDao.findById(petId).orElseThrow();

        int score = 0;
        int totalCriteria = 7;

        if (Boolean.TRUE.equals(user.getHasYard()) || Boolean.FALSE.equals(pet.getNeedsYard())) score++;
        if (user.getHoursAvailablePerDay() != null && pet.getRequiredHoursPerDay() != null
                && user.getHoursAvailablePerDay() >= pet.getRequiredHoursPerDay()) {
            score++;
        }
        if (user.getHouseSize() != null && pet.getRequiredHouseSize() != null
                && user.getHouseSize().equalsIgnoreCase(pet.getRequiredHouseSize())) {
            score++;
        }
        if (Boolean.TRUE.equals(user.getHasPreviousExperience()) || Boolean.FALSE.equals(pet.getRequiresExperiencedOwner())) score++;
        if (Boolean.FALSE.equals(user.getHasSmallChildren()) || Boolean.TRUE.equals(pet.getGoodWithChildren())) score++;
        if (Boolean.FALSE.equals(user.getHasOtherPets()) || Boolean.TRUE.equals(pet.getGoodWithOtherPets())) score++;
        if (user.getActivityLevel() != null && pet.getEnergyLevel() != null
                && user.getActivityLevel() >= pet.getEnergyLevel()) {
            score++;
        }

        double matchPercentage = ((double) score / totalCriteria) * 100;

        if (matchPercentage >= 80.0) {
            MatchModel match = new MatchModel();
            match.setUserId(userId);
            match.setPetId(petId);
            match.setMatchPercentage(matchPercentage);
            match.setStatus(MatchStatus.PENDING);
            matchDao.save(match);
            return true;
        }

        return false;
    }
}
