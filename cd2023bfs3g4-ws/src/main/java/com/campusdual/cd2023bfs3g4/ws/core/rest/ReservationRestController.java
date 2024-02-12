package com.campusdual.cd2023bfs3g4.ws.core.rest;

import com.campusdual.cd2023bfs3g4.api.core.service.IReservationService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/reservation")
public class ReservationRestController extends ORestController<IReservationService> {


    @Autowired
    private IReservationService reservationService;


    @Override
    public IReservationService getService() {
        return this.reservationService;
    }
}
