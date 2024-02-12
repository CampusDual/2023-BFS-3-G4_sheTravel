package com.campusdual.cd2023bfs3g4.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;







    @Lazy
    @Repository(value = "ClientActivityDao")
    @ConfigurationFile(
            configurationFile = "dao/ClientActivityDao.xml",
            configurationFilePlaceholder = "dao/placeholders.properties")
    public class ClientActivityDao extends OntimizeJdbcDaoSupport {

        public static final String ID_CLIENT = "id_client";
        public static final String ID_ACTIVITY = "id_activity";





    }
