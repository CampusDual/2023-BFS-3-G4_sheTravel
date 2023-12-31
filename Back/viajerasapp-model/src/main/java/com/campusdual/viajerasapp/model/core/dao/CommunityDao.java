package com.campusdual.viajerasapp.model.core.dao;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;
import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;


@Repository(value = "CommunityDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/CommunityDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class CommunityDao extends OntimizeJdbcDaoSupport {


    public static final String ATTR_ID_COMMUNITY = "id_community";
    public static final String ATTR_COMMUNITY_NAME = "community_name";


}
