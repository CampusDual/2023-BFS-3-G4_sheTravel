package com.campusdual.cd2023bfs3g4.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface IReservationService {

	public EntityResult reservationQuery(Map<String, Object> keyMap, List<String> attrList);
	public EntityResult reservationInsert(Map<String, Object> attrMap);
	public EntityResult reservationUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
	public EntityResult reservationDelete(Map<String, Object> keyMap);

}
