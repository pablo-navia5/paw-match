package com.pawmatch.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PetCreateDto {

    private String name;
    private String description;
    private String status;
    private List<String> photos;
    private String species;
    private Integer age;

    private String requiredHouseSize;
    private Boolean needsYard;
    private Integer requiredHoursPerDay;
    private Boolean requiresExperiencedOwner;
    private Boolean goodWithChildren;
    private Boolean goodWithOtherPets;
    private Integer energyLevel;

    private Long shelterId;
}
