package com.climbingzone3.service.mapper;

import com.climbingzone3.domain.*;
import com.climbingzone3.service.dto.PlaceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Place} and its DTO {@link PlaceDTO}.
 */
@Mapper(componentModel = "spring", uses = {ParkingMapper.class, ClimbingRouteMapper.class})
public interface PlaceMapper extends EntityMapper<PlaceDTO, Place> {

    @Mapping(source = "parkings.id", target = "parkingsId")
    @Mapping(source = "located.id", target = "locatedId")
    PlaceDTO toDto(Place place);

    @Mapping(source = "parkingsId", target = "parkings")
    @Mapping(source = "locatedId", target = "located")
    Place toEntity(PlaceDTO placeDTO);

    default Place fromId(Long id) {
        if (id == null) {
            return null;
        }
        Place place = new Place();
        place.setId(id);
        return place;
    }
}
