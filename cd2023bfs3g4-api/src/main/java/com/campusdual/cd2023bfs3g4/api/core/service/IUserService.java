package com.campusdual.cd2023bfs3g4.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public interface IUserService {

	public EntityResult userQuery(Map<String, Object> keyMap, List<String> attrList);

	public EntityResult userInsert(Map<String, Object> attrMap);

	public EntityResult userUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);

	public EntityResult userDelete(Map<String, Object> keyMap);

	public EntityResult myUserQuery(Map<String, Object> keyMap, List<String> attrList);

	public EntityResult myUserUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);

	public EntityResult hostQuery(Map<String, Object> keyMap, List<String> attrList);
	public EntityResult activitiesclientQuery(Map<String, Object> keyMap, List<String> attrList);

	public EntityResult clientQuery(Map<String, Object> keyMap, List<String> attrList);

	public EntityResult clientInsert(Map<String, Object> attrMap);

	public EntityResult clientUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);

	public EntityResult clientDelete(Map<String, Object> keyMap);

	public EntityResult activity_clientQuery(Map<String, Object> keyMap, List<String> attrList);

	public EntityResult activity_clientInsert(Map<String, Object> attrMap);

	public EntityResult activity_clientDelete(Map<String, Object> keyMap);


	public EntityResult activity_clientUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);

	public EntityResult reservationQuery(Map<String, Object> keyMap, List<String> attrList);

	public EntityResult reservationInsert(Map<String, Object> attrMap);

	public EntityResult reservationUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);

	public EntityResult reservationDelete(Map<String, Object> keyMap);

	public EntityResult reservationPruebaInsert(ArrayList<Object> arrayList);


	public EntityResult reservationSentQuery(Map<String, Object> keyMap, List<String> attrList);


	public EntityResult reservationReceivedQuery(Map<String, Object> keyMap, List<String> attrList);


	public EntityResult read_host_falseQuery(Map<String, Object> keyMap, List<String> attrList);

	public EntityResult read_traveler_falseQuery(Map<String, Object> keyMap, List<String> attrList);


}