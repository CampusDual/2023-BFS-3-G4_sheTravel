package com.campusdual.cd2023bfs3g4.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;


@Repository(value = "ProvinceDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/ProvinceDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class ProvinceDao extends OntimizeJdbcDaoSupport {


    public static final String ATTR_ID_PROVINCE = "id_province";
    public static final String ATTR_PROVINCE_NAME = "province_name";
    public static final String ATTR_ID_COMMUNITY = "id_community";


}
