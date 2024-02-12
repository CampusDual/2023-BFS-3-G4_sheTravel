package com.campusdual.cd2023bfs3g4.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;


public interface ICommunityService {


    public EntityResult communityQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;

    public EntityResult communityInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;

    public EntityResult communityUpdate(Map<String, Object> attributes, Map<String, Object> keyValues) throws OntimizeJEERuntimeException;

    public EntityResult communityDelete(Map<String, Object> keyValues) throws OntimizeJEERuntimeException;


}
