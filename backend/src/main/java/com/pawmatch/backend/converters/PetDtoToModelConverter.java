package com.pawmatch.backend.converters;

import com.pawmatch.backend.dtos.PetDto;
import com.pawmatch.backend.models.PetModel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PetDtoToModelConverter implements Converter<PetDto, PetModel> {

    @Override
    public PetModel convert(PetDto source) {
        PetModel pet = new PetModel();
        pet.setId(source.getId());
        pet.setName(source.getName());
        pet.setStatus(source.getStatus());
        pet.setDescription(source.getDescription());
        pet.setImage(source.getImage());
        pet.setSpecies(source.getSpecies());
        pet.setAge(source.getAge());
        pet.setRequiredHouseSize(source.getRequiredHouseSize());
        pet.setNeedsYard(source.getNeedsYard());
        pet.setRequiredHoursPerDay(source.getRequiredHoursPerDay());
        pet.setRequiresExperiencedOwner(source.getRequiresExperiencedOwner());
        pet.setGoodWithChildren(source.getGoodWithChildren());
        pet.setGoodWithOtherPets(source.getGoodWithOtherPets());
        pet.setEnergyLevel(source.getEnergyLevel());
        return pet;
    }
}
