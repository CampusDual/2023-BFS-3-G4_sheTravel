package com.campusdual.cd2023bfs3g4.model.core.dao;


import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;


@Lazy
@Repository(value = "ClientDao")
@ConfigurationFile(
	configurationFile = "dao/ClientDao.xml",
	configurationFilePlaceholder = "dao/placeholders.properties")
public class ClientDao extends OntimizeJdbcDaoSupport {

    public static final String ID = "id_client";
    public static final String EMAILREGISTER = "user_";
    public static final String EMAILCONTACT = "email";
    public static final String PASSWORD = "password";
    public static final String NAME = "name";
    public static final String SURNAME = "surname";
    public static final String NIF = "nif";
    public static final String USERBLOCKED = "userblocked";
    public static final String LASTPASSWORDUPDATE = "lastpasswordupdate";
    public static final String FIRSTLOGIN = "firstlogin";
    public static final String PHONENUMBER = "phonenumber";
    public static final String DESCRIPTION = "description";
    public static final String SHORT_DESC = "shortdesc";

    public static final String ID_TOWN = "id_town";
    public static final String HOST = "host";
    public static final String AVATAR = "avatar";

    public static final String QUERY_HOSTCLIENT = "hostclient";
    public static final String QUERY_ACTIVITIESCLIENT = "activitiesclient";



}
