package com.campusdual.cd2023bfs3g4.model.core.service;

import com.campusdual.cd2023bfs3g4.api.core.service.ICommunityService;
import com.campusdual.cd2023bfs3g4.model.core.dao.CommunityDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;




@Lazy
@Service("CommunityService")
public class CommunityService implements ICommunityService {


    @Autowired
    private CommunityDao communityDao;


    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;





    //Sample to permission
    //@Secured({ PermissionsProviderSecured.SECURED })
    public EntityResult communityQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(communityDao, keyMap, attrList);
    }


    public EntityResult communityInsert(Map<String, Object> attrMap) {
        return this.daoHelper.insert(communityDao, attrMap);
    }


    public EntityResult communityUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        return this.daoHelper.update(communityDao, attrMap, keyMap);
    }


    @Override
    public EntityResult communityDelete(Map<String, Object> keyValues) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.communityDao, keyValues);
    }
    

}
