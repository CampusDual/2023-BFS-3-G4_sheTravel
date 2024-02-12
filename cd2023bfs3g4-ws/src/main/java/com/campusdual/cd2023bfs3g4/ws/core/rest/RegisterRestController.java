package com.campusdual.cd2023bfs3g4.ws.core.rest;

import com.campusdual.cd2023bfs3g4.api.core.service.IRegisterService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/register")
public class RegisterRestController extends ORestController<IRegisterService> {


    @Autowired
    private IRegisterService registerService;


    @Override
    public IRegisterService getService() {
        return this.registerService;
    }
}

