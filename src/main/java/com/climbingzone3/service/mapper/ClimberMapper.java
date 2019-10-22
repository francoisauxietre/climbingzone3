package com.climbingzone3.service.mapper;

import com.climbingzone3.domain.*;
import com.climbingzone3.service.dto.ClimberDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Climber} and its DTO {@link ClimberDTO}.
 */
@Mapper(componentModel = "spring", uses = {CardMapper.class, ClimbingRouteMapper.class})
public interface ClimberMapper extends EntityMapper<ClimberDTO, Climber> {

    @Mapping(source = "cards.id", target = "cardsId")
    @Mapping(source = "openBy.id", target = "openById")
    ClimberDTO toDto(Climber climber);

    @Mapping(target = "countries", ignore = true)
    @Mapping(target = "removeCountry", ignore = true)
    @Mapping(source = "cardsId", target = "cards")
    @Mapping(source = "openById", target = "openBy")
    @Mapping(target = "removeFriends", ignore = true)
    @Mapping(target = "fromFriends", ignore = true)
    @Mapping(target = "removeFromFriends", ignore = true)
    Climber toEntity(ClimberDTO climberDTO);

    default Climber fromId(Long id) {
        if (id == null) {
            return null;
        }
        Climber climber = new Climber();
        climber.setId(id);
        return climber;
    }
}
