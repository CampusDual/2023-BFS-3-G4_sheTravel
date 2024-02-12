package com.campusdual.cd2023bfs3g4.model.core.service;


import com.campusdual.cd2023bfs3g4.api.core.service.IUserService;
import com.campusdual.cd2023bfs3g4.model.core.dao.ClientActivityDao;
import com.campusdual.cd2023bfs3g4.model.core.dao.ClientDao;
import com.campusdual.cd2023bfs3g4.model.core.dao.ReservationDao;
import com.campusdual.cd2023bfs3g4.model.core.dao.UserDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.common.gui.SearchValue;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Lazy
@Service("UserService")
public class UserService implements IUserService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private ClientDao clientDao;

	@Autowired
	private ClientActivityDao clientActivityDao;



	@Autowired
	private ReservationDao reservationDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;

	public void loginQuery(Map<?, ?> key, List<?> attr) {
	}

	//Sample to permission
	//@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult userQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(userDao, keyMap, attrList);
	}

	public EntityResult userInsert(Map<String, Object> attrMap) {

		return this.daoHelper.insert(userDao, attrMap);
	}

	public EntityResult userUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(userDao, attrMap, keyMap);
	}

	public EntityResult userDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.userDao, keyMap);
	}

	@Override
	public EntityResult myUserQuery(Map<String, Object> keyMap, List<String> attrList) {
		keyMap.put(ClientDao.EMAILREGISTER, getUser());
		return this.daoHelper.query(clientDao, keyMap, attrList);
	}

	@Override
	public EntityResult myUserUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {

		EntityResult userUpdate = null;

		Object pass = attrMap.remove(UserDao.PASSWORD);

		keyMap.put(ClientDao.EMAILREGISTER, getUser());

		if (attrMap.size() > 0){ //datos que se deben gardar en client
			userUpdate = this.daoHelper.update(clientDao, attrMap, keyMap);
		}
		if (pass != null){ //datos que se deben gardar en tuser
			Map<String, Object> userAttr = new HashMap<>();
			userAttr.put(UserDao.PASSWORD, pass);
			userUpdate = this.daoHelper.update(userDao, userAttr, keyMap);
		}
		return userUpdate;
	}

	@Override
	public EntityResult hostQuery(Map<String, Object> keyMap, List<String> attrList) {
		keyMap.put("host", true);
		return this.daoHelper.query(clientDao, keyMap, attrList, ClientDao.QUERY_HOSTCLIENT );
	}
	@Override
	public EntityResult activitiesclientQuery(Map<String, Object> keyMap, List<String> attrList) {
		List<String> clientattr = Arrays.asList(ClientDao.ID);
		EntityResult activityresult = this.daoHelper.query(clientDao, keyMap, clientattr, ClientDao.QUERY_ACTIVITIESCLIENT );
		List clientsids = (List) activityresult.get(ClientDao.ID);
		Map<String, Object> clientKey = new HashMap<>();
		clientKey.put(ClientDao.ID, new SearchValue(SearchValue.IN, clientsids));
		return this.daoHelper.query(clientDao, clientKey, attrList, ClientDao.QUERY_HOSTCLIENT);

	}

	//------------CLIENT ENTITIES------------------------------
	@Override
	public EntityResult clientQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(clientDao, keyMap, attrList);
	}
	@Override
	public EntityResult clientInsert(Map<String, Object> attrMap) {
		return this.daoHelper.insert(clientDao, attrMap);
	}
	@Override
	public EntityResult clientUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(clientDao, attrMap, keyMap);
	}
	@Override
	public EntityResult clientDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.clientDao, keyMap);
	}



	//--------activities queries----------


	@Override
	public EntityResult activity_clientQuery(Map<String, Object> keyMap, List<String> attrList) {

		return this.daoHelper.query(clientDao, keyMap, attrList, ClientDao.QUERY_ACTIVITIESCLIENT);
	}

	@Override
	public EntityResult activity_clientInsert(Map<String, Object> attrMap) {

		return this.daoHelper.insert(clientActivityDao, attrMap);
	}


	@Override
	public EntityResult activity_clientDelete(Map<String, Object> keyMap) {

		return this.daoHelper.delete(clientActivityDao, keyMap);
	}



	@Override
	public EntityResult activity_clientUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		this.daoHelper.delete(clientActivityDao, keyMap);

		List<Integer> activityIds = (List<Integer>) attrMap.get("activity_ids");

		EntityResult insertId=new EntityResultMapImpl();
		for (Integer id : activityIds){
			Map<String, Object> insertMap = new HashMap();
			insertMap.put(ClientActivityDao.ID_ACTIVITY, id);
			insertMap.put(ClientActivityDao.ID_CLIENT, keyMap.get(ClientActivityDao.ID_CLIENT));
			insertId = this.daoHelper.insert(clientActivityDao, insertMap);
		}
		return insertId;
	}

	//----------- Reservation queries -------
	@Override
	public EntityResult reservationQuery(Map<String, Object> keyMap, List<String> attrList) {


		return this.daoHelper.query(reservationDao, keyMap, attrList);
	}

	@Override
	public EntityResult reservationSentQuery(Map<String, Object> keyMap, List<String> attrList) {
		String user = getUser();
		Map<String, Object> clientMap = new HashMap<>();
		//creamos un map y le metemos {"emailregister":"maildeusuario"}
		clientMap.put(ClientDao.EMAILREGISTER, user);
		//creamos una lista nueva
		List<String> clientList = new ArrayList<>();
		//a esta lista le metemos el nombre de la variable
		clientList.add(ClientDao.ID);
		//hacemos una nueva entity que nos permitirá hacer una query
		EntityResult travelerEntity = myUserQuery(clientMap, clientList);
		//
		Object id_client_traveler = travelerEntity.getRecordValues(0).get(ClientDao.ID);

		keyMap.put(ReservationDao.ID_CLIENT_TRAVELER, id_client_traveler);




		return this.daoHelper.query(reservationDao, keyMap, attrList, ReservationDao.QUERY_ORDER_BY_READ_TRAVELER);
	}

	@Override
	public EntityResult reservationReceivedQuery(Map<String, Object> keyMap, List<String> attrList) {

		String user = getUser();
		Map<String, Object> clientMap = new HashMap<>();
		//creamos un map y le metemos {"emailregister":"maildeusuario"}
		clientMap.put(ClientDao.EMAILREGISTER, user);
		//creamos una lista nueva
		List<String> clientList = new ArrayList<>();
		//a esta lista le metemos el nombre de la variable
		clientList.add(ClientDao.ID);
		//hacemos una nueva entity que nos permitirá hacer una query
		EntityResult travelerEntity = myUserQuery(clientMap, clientList);
		//
		Object id_client_host = travelerEntity.getRecordValues(0).get(ClientDao.ID);

		keyMap.put(ReservationDao.ID_CLIENT_HOST, id_client_host);

		return this.daoHelper.query(reservationDao, keyMap, attrList, ReservationDao.QUERY_ORDER_BY_READ_HOST);
	}


	@Override
	public EntityResult reservationInsert(Map<String, Object> attrMap) {

    Object dateRangeObject = attrMap.get("daterange1");
	HashMap<String, Object> dateRangeHashMap = (HashMap<String, Object>) dateRangeObject;

	Object dateStartObject = dateRangeHashMap.get("startDate");
	Object dateEndObject = dateRangeHashMap.get("endDate");

		//recogemos el valor de user (un mail)
		String user = getUser();
		Map<String, Object> clientMap = new HashMap<>();
		//creamos un map y le metemos {"emailregister":"maildeusuario"}
		clientMap.put(ClientDao.EMAILREGISTER, user);
		//creamos una lista nueva
		List<String> clientList = new ArrayList<>();
		//a esta lista le metemos el nombre de la variable
		clientList.add(ClientDao.ID);
		//hacemos una nueva entity que nos permitirá hacer una query
		EntityResult travelerEntity = myUserQuery(clientMap, clientList);
		//
		Object id_traveler = travelerEntity.getRecordValues(0).get(ClientDao.ID);
		attrMap.put(ReservationDao.ID_CLIENT_TRAVELER, id_traveler);
		attrMap.put(ReservationDao.STATUS, 3);
		attrMap.put(ReservationDao.RESERVATION_START, dateStartObject);
		attrMap.put(ReservationDao.RESERVATION_END, dateEndObject);
		return this.daoHelper.insert(reservationDao, attrMap);
	}

	@Override
	public EntityResult reservationPruebaInsert(ArrayList<Object> arrayList) {
		String user = getUser();
		Map<String, Object> clientMap = new HashMap<>();
		clientMap.put(ClientDao.EMAILREGISTER, user);
		List<String> clientList = new ArrayList<>();
		clientList.add(ClientDao.ID);
		EntityResult travelerEntity = myUserQuery(clientMap, clientList);
		Object id_traveler = travelerEntity.getRecordValues(0).get(ClientDao.ID);
		Map<String, Object> attrMap = new HashMap<>();
		attrMap.put(ReservationDao.ID_CLIENT_TRAVELER, arrayList.get(1));
		attrMap.put(ReservationDao.MESSAGE, arrayList.get(0));
		attrMap.put(ReservationDao.STATUS, 3);
		return this.daoHelper.insert(reservationDao, attrMap);
	}

	@Override
	public EntityResult reservationUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(reservationDao, attrMap, keyMap);
	}


	@Override
	public EntityResult reservationDelete(Map<String, Object> keyValues) throws OntimizeJEERuntimeException {
		return this.daoHelper.delete(this.reservationDao, keyValues);
	}




	//---------------

	public String getUser(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		return auth.getName();
	}

	public String getRole(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		return auth.getAuthorities().toArray()[0].toString();
	}


	public Object getUserId(){
		String user = getUser();
		Map<String, Object> clientMap = new HashMap<>();
		clientMap.put(ClientDao.EMAILREGISTER, user);
		List<String> clientList = new ArrayList<>();
		clientList.add(ClientDao.ID);
		EntityResult travelerEntity = myUserQuery(clientMap, clientList);
		Object id_client_host = travelerEntity.getRecordValues(0).get(ClientDao.ID);
		return id_client_host;
	}



	@Override
	public EntityResult read_host_falseQuery(Map<String, Object> keyMap, List<String> attrList) {
		keyMap.put("id_client_host", getUserId());
		keyMap.put("read_host", false);

		return this.daoHelper.query(reservationDao, keyMap, attrList);
	}

	@Override
	public EntityResult read_traveler_falseQuery(Map<String, Object> keyMap, List<String> attrList) {
		keyMap.put("id_client_traveler", getUserId());
		keyMap.put("read_traveler", false);

		return this.daoHelper.query(reservationDao, keyMap, attrList);
	}


}
