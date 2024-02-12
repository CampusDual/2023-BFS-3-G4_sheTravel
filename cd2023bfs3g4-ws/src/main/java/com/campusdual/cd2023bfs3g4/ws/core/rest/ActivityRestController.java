package com.campusdual.cd2023bfs3g4.ws.core.rest;

import com.campusdual.cd2023bfs3g4.api.core.service.IActivityService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/activities")
public class ActivityRestController extends ORestController<IActivityService> {


    @Autowired
    private IActivityService activityService;


    @Override
    public IActivityService getService() {
        return this.activityService;
    }
}
