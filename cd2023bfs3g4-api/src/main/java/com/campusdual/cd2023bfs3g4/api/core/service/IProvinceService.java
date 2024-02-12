package com.campusdual.cd2023bfs3g4.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;


public interface IProvinceService {


    public EntityResult provinceQuery(Map<String, Object> keysValues, List<String> attributes) throws OntimizeJEERuntimeException;

    public EntityResult provinceInsert(Map<String, Object> attributes) throws OntimizeJEERuntimeException;

    public EntityResult provinceUpdate(Map<String, Object> attributes, Map<String, Object> keyValues) throws OntimizeJEERuntimeException;

    public EntityResult provinceDelete(Map<String, Object> keyValues) throws OntimizeJEERuntimeException;


}
