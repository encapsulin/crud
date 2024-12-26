package com.encaps;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
//@PropertySource("classpath:application.propertiess")
@RestController
public class DemoApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	private static Logger LOG = LoggerFactory
			.getLogger(DemoApplication.class);

	@Value("${testvalue}")
	String testvalue;

	@Value("${testvalue2}")
	String testvalue2;

	@Autowired
	Environment env;

	@Override
	public void run(String... args) {
		LOG.info("EXECUTING : command line runner");

		for (int i = 0; i < args.length; ++i) {
			LOG.info("args[{}]: {}", i, args[i]);
		}

		LOG.info("testvalue: {}", testvalue);
		LOG.info("testvalue2: {}", testvalue2);
		LOG.info(env.getProperty("testvalue"));
		LOG.info(env.toString());
	}

	@GetMapping("/")
	String env() {
		return env.toString();
	}

}
