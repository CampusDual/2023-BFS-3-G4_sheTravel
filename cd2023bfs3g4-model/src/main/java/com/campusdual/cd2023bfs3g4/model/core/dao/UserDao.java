package com.campusdual.cd2023bfs3g4.model.core.dao;


import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;


@Lazy
@Repository(value = "UserDao")
@ConfigurationFile(
	configurationFile = "dao/UserDao.xml",
	configurationFilePlaceholder = "dao/placeholders.properties")
public class UserDao extends OntimizeJdbcDaoSupport {
    public static final String ID_USER = "user_";
    public static final String PASSWORD = "password";
    public static final String USERBLOCKED = "userblocked";
    public static final String LASTPASSWORDUPDATE = "lastpasswordupdate";
    public static final String FIRSTLOGIN = "firstlogin";
}
