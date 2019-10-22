package com.climbingzone3.repository;
import com.climbingzone3.domain.ClimbingRoute;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ClimbingRoute entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClimbingRouteRepository extends JpaRepository<ClimbingRoute, Long> {

}
