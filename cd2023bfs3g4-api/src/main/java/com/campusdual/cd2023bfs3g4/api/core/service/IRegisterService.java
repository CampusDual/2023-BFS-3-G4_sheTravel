package com.campusdual.cd2023bfs3g4.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface IRegisterService {

	public EntityResult registerQuery(Map<String, Object> keyMap, List<String> attrList);
	public EntityResult registerInsert(Map<String, Object> attrMap);
	public EntityResult registerUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
	public EntityResult registerDelete(Map<String, Object> keyMap);
	public EntityResult clientQuery(Map<String, Object> keyMap, List<String> attrList);
	public EntityResult clientInsert(Map<String, Object> attrMap);
	public EntityResult clientUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
	public EntityResult clientDelete(Map<String, Object> keyMap);


}
