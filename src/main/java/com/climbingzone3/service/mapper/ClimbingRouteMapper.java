package com.climbingzone3.service.mapper;

import com.climbingzone3.domain.*;
import com.climbingzone3.service.dto.ClimbingRouteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ClimbingRoute} and its DTO {@link ClimbingRouteDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ClimbingRouteMapper extends EntityMapper<ClimbingRouteDTO, ClimbingRoute> {


    @Mapping(target = "places", ignore = true)
    @Mapping(target = "removePlace", ignore = true)
    @Mapping(target = "openers", ignore = true)
    @Mapping(target = "removeOpener", ignore = true)
    ClimbingRoute toEntity(ClimbingRouteDTO climbingRouteDTO);

    default ClimbingRoute fromId(Long id) {
        if (id == null) {
            return null;
        }
        ClimbingRoute climbingRoute = new ClimbingRoute();
        climbingRoute.setId(id);
        return climbingRoute;
    }
}
