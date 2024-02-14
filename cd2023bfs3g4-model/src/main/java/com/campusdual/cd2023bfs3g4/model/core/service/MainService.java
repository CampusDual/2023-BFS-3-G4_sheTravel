package com.campusdual.cd2023bfs3g4.model.core.service;

import com.campusdual.cd2023bfs3g4.api.core.service.IMainService;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Map;

@Service
public class MainService implements IMainService {
    private static final String HOST = "HOST";
    private static final String TLS = "TLS";

    private String mainUrl = null;

    @Override
    public String getMainUrl() {
        if (this.mainUrl == null) {
            final Map<String, String> env = System.getenv();
            final String host = env.get(HOST);
            final String tls = env.get(TLS);

            if (host == null) {
                this.mainUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
            } else {
                this.mainUrl = ((tls == null) ? "http://" : "https://") + host;
            }
        }

        return this.mainUrl;
    }
}