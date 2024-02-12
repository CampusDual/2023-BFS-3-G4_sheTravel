package com.campusdual.cd2023bfs3g4.ws.core.rest;

import com.campusdual.cd2023bfs3g4.api.core.service.ITownService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/towns")
public class TownRestController extends ORestController<ITownService> {


    @Autowired
    private ITownService townService;


    @Override
    public ITownService getService() {
        return this.townService;
    }
}
