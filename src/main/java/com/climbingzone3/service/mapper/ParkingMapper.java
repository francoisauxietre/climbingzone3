package com.climbingzone3.service.mapper;

import com.climbingzone3.domain.*;
import com.climbingzone3.service.dto.ParkingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Parking} and its DTO {@link ParkingDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ParkingMapper extends EntityMapper<ParkingDTO, Parking> {


    @Mapping(target = "places", ignore = true)
    @Mapping(target = "removePlace", ignore = true)
    Parking toEntity(ParkingDTO parkingDTO);

    default Parking fromId(Long id) {
        if (id == null) {
            return null;
        }
        Parking parking = new Parking();
        parking.setId(id);
        return parking;
    }
}
