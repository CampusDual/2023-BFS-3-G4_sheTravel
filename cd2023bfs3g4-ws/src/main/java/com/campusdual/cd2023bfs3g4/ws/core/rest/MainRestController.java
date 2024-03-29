package com.campusdual.cd2023bfs3g4.ws.core.rest;

import com.campusdual.cd2023bfs3g4.api.core.service.IMainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainRestController {
	private static final String ENV_JS = "(function (window) {\n" +
			"  window.__env = window.__env || {};\n" +
			"  // API url\n" +
			"  window.__env.apiUrl = '%API_URL%';\n" +
			"}(this));";

	@Autowired
	private IMainService mainService;

	@GetMapping(value = "/main", produces = MediaType.APPLICATION_JSON_VALUE)
	public String main() {
		return "index";
	}

	@GetMapping(value = "/app/env/env.js", produces = "application/javascript")
	public @ResponseBody String env() {
		return ENV_JS.replace("%API_URL%", this.mainService.getMainUrl() != null ? this.mainService.getMainUrl() : "");
	}
	
}
