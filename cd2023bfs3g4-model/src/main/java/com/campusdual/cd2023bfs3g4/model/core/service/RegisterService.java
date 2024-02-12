package com.campusdual.cd2023bfs3g4.model.core.service;


import com.campusdual.cd2023bfs3g4.api.core.service.IRegisterService;
import com.campusdual.cd2023bfs3g4.model.core.dao.ClientDao;
import com.campusdual.cd2023bfs3g4.model.core.dao.UserDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Lazy
@Service("RegisterService")
public class RegisterService implements IRegisterService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private ClientDao clientDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;



	//Sample to permission
	//@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult registerQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(userDao, keyMap, attrList);
	}

	public EntityResult registerInsert(Map<String, Object> attrMap) {

		EntityResult userInsert; //creamos la entidad que devolveremos despues

		Object user_ = attrMap.get(UserDao.ID_USER);
		Object password = attrMap.get(UserDao.PASSWORD);
		Map<String, Object> userAttr = new HashMap<>();
		userAttr.put(UserDao.ID_USER, user_);
		userAttr.put(UserDao.PASSWORD, password);

		try {
			userInsert = this.daoHelper.insert(userDao, userAttr);

			if(userInsert.isWrong()){

				return userInsert;
			}
		}catch(Exception e){
			userInsert = new EntityResultMapImpl();
			userInsert.setCode(EntityResult.OPERATION_WRONG);
			userInsert.setMessage("User already exists");
			return userInsert;
		}

		Object name = attrMap.get(ClientDao.NAME);
		Object surname = attrMap.get(ClientDao.SURNAME);

		Map<String, Object> clientAttr = new HashMap<>();
		clientAttr.put(ClientDao.EMAILREGISTER, user_);

		if (user_ != null) {
			clientAttr.put(ClientDao.EMAILCONTACT, user_);
		}
		if (name != null) {
			clientAttr.put(ClientDao.NAME, name);
		}
		if (surname != null) {
			clientAttr.put(ClientDao.SURNAME, surname);
		}


//añadir mais campos se necesario
		return this.daoHelper.insert(clientDao, clientAttr);
	}
	public EntityResult registerUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(userDao, attrMap, keyMap);
	}
	public EntityResult registerDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.userDao, keyMap);
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






}
