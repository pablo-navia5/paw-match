package com.pawmatch.backend.converters;

import com.pawmatch.backend.dtos.PetCreateDto;
import com.pawmatch.backend.models.PetModel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PetCreateDtoToModelConverter implements Converter<PetCreateDto, PetModel> {

    @Override
    public PetModel convert(final PetCreateDto source) {
        PetModel pet = new PetModel();
        pet.setName(source.getName());
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
