package com.campusdual.cd2023bfs3g4.model.core.service;

import com.campusdual.cd2023bfs3g4.api.core.service.IProvinceService;
import com.campusdual.cd2023bfs3g4.model.core.dao.ProvinceDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;




@Lazy
@Service("ProvinceService")
public class ProvinceService implements IProvinceService {


    @Autowired
    private ProvinceDao provinceDao;


    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;





    //Sample to permission
    //@Secured({ PermissionsProviderSecured.SECURED })
    public EntityResult provinceQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(provinceDao, keyMap, attrList);
    }


    public EntityResult provinceInsert(Map<String, Object> attrMap) {
        return this.daoHelper.insert(provinceDao, attrMap);
    }


    public EntityResult provinceUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        return this.daoHelper.update(provinceDao, attrMap, keyMap);
    }


    @Override
    public EntityResult provinceDelete(Map<String, Object> keyValues) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.provinceDao, keyValues);
    }


}
