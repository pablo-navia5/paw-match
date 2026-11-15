package com.pawmatch.backend.models;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "pet")
@Table(name = "pets")
public class PetModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String status;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "pet_photos", joinColumns = @JoinColumn(name = "pet_id"))
    @Column(name = "photo_url")
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shelter_id", nullable = false)
    private ShelterModel shelter;
}
