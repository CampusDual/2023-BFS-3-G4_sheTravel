package com.campusdual.cd2023bfs3g4.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;


public interface ITownService {


    public EntityResult townQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;

    public EntityResult townInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;

    public EntityResult townUpdate(Map<String, Object> attributes, Map<String, Object> keyValues) throws OntimizeJEERuntimeException;

    public EntityResult townDelete(Map<String, Object> keyValues) throws OntimizeJEERuntimeException;

    public EntityResult hostcountQuery(Map<String, Object> keyMap, List<String> attrList);
}
