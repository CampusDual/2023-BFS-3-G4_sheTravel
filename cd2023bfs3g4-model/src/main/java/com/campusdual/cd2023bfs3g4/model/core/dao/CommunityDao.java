package com.campusdual.cd2023bfs3g4.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;


@Repository(value = "CommunityDao")
@Lazy
@ConfigurationFile(configurationFile = "dao/CommunityDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class CommunityDao extends OntimizeJdbcDaoSupport {


    public static final String ATTR_ID_COMMUNITY = "id_community";
    public static final String ATTR_COMMUNITY_NAME = "community_name";


}
