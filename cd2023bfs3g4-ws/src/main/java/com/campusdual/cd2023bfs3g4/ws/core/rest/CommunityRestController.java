package com.campusdual.cd2023bfs3g4.ws.core.rest;

import com.campusdual.cd2023bfs3g4.api.core.service.ICommunityService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/communities")
public class CommunityRestController extends ORestController<ICommunityService> {


    @Autowired
    private ICommunityService communityService;


    @Override
    public ICommunityService getService() {
        return this.communityService;
    }
}
