package com.campusdual.cd2023bfs3g4.model.core.dao;


import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;


@Lazy
@Repository(value = "ReservationDao")
@ConfigurationFile(
	configurationFile = "dao/ReservationDao.xml",
	configurationFilePlaceholder = "dao/placeholders.properties")
public class ReservationDao extends OntimizeJdbcDaoSupport {

    public static final String ID_RESERVATION = "id_reservation";
    public static final String ID_CLIENT_TRAVELER = "id_client_traveler";
    public static final String ID_CLIENT_HOST = "id_client_host";
    public static final String MESSAGE = "message";
    public static final String STATUS = "id_status";
    public static final String MESSAGE_ANSWER = "message_answer";
    public static final String MESSAGE_CANCELLATION = "message_cancellation";
    public static final String RESERVATION_DATE = "reservation_date";
    public static final String RESERVATION_START = "reservation_start";
    public static final String RESERVATION_END = "reservation_end";
    public static final String READ_TRAVELER = "read_traveler";
    public static final String READ_HOST = "read_host";

    public static final String QUERY_ORDER_BY_READ_HOST = "default_order_by_read_host";
    public static final String QUERY_ORDER_BY_READ_TRAVELER = "default_order_by_read_traveler";

}
