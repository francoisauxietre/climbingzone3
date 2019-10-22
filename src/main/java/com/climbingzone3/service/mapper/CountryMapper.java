package com.climbingzone3.service.mapper;

import com.climbingzone3.domain.*;
import com.climbingzone3.service.dto.CountryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Country} and its DTO {@link CountryDTO}.
 */
@Mapper(componentModel = "spring", uses = {ClimberMapper.class})
public interface CountryMapper extends EntityMapper<CountryDTO, Country> {

    @Mapping(source = "climbers.id", target = "climbersId")
    CountryDTO toDto(Country country);

    @Mapping(source = "climbersId", target = "climbers")
    Country toEntity(CountryDTO countryDTO);

    default Country fromId(Long id) {
        if (id == null) {
            return null;
        }
        Country country = new Country();
        country.setId(id);
        return country;
    }
}
