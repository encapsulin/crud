package com.encaps;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

//	@Value("${aws.accessKeyId}")
	 String accessKeyId;
	@Test
	void contextLoads() {
		System.out.println(accessKeyId);
	}

}
