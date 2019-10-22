package com.climbingzone3.service.mapper;

import com.climbingzone3.domain.*;
import com.climbingzone3.service.dto.CardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Card} and its DTO {@link CardDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CardMapper extends EntityMapper<CardDTO, Card> {


    @Mapping(target = "climbers", ignore = true)
    @Mapping(target = "removeClimber", ignore = true)
    Card toEntity(CardDTO cardDTO);

    default Card fromId(Long id) {
        if (id == null) {
            return null;
        }
        Card card = new Card();
        card.setId(id);
        return card;
    }
}
