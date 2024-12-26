package com.encaps.api;
//
//import com.encaps.api.categs.CategoryEntity;
//import com.encaps.api.categs.CategoryService;
//import com.encaps.api.items.ItemEntity;
//import com.encaps.api.items.ItemService;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.node.ArrayNode;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ApiControllerTest {
//
//    @Autowired
//    ApiController ctl;
//
//    @Autowired
//    TestRestTemplate restTemplate;
//
//    @Value(value = "${local.server.port}")
//    private int port;
//
//    @Autowired
//    ItemService serviceI;
//
//    @Autowired
//    CategoryService serviceC;
//
//
//    CategoryEntity categR1;
//    CategoryEntity categR1C1;
//    CategoryEntity categR1C1C1;
//    CategoryEntity categR1C2;
//    CategoryEntity categR2;
//
//    ItemEntity item1categR1;
//    ItemEntity item1categR1C1;
//    ItemEntity item1categR1C1C1;
//    ItemEntity item1categR1C2;
//    ItemEntity item1categR2;
//
//    @BeforeEach
//    void setUp() {
//        serviceC.deleteAll();
//        categR1 = serviceC.save("Root1", null);
//        categR1C1 = serviceC.save("Root1/Child1", categR1);
//        categR1C1C1 = serviceC.save("Root1/Child1/Child1", categR1C1);
//        categR1C2 = serviceC.save("Root1/Child2", categR1);
//        categR2 = serviceC.save("Root2", null);
//
//        serviceI.deleteAll();
//        item1categR1 = serviceI.create("Item1 for categR1", categR1.getId());
//        item1categR1C1 = serviceI.create("Item1 for categR1C1", categR1C1.getId());
//        item1categR1C1C1 = serviceI.create("Item1 for categR1C1C1", categR1C1C1.getId());
//        item1categR1C2 = serviceI.create("Item1 for categR1C2", categR1C2.getId());
//        item1categR2 = serviceI.create("Item1 for categR2", categR2.getId());
//    }
//
//    @Test
//    void contextLoad() {
//        assertThat(serviceC).isNotNull();
//        assertThat(serviceI).isNotNull();
//        assertThat(ctl).isNotNull();
//    }
//
//    @Test
//    void categs() throws JsonProcessingException {
//        String url = "http://localhost:" + port + "/api/categs";
//        var json = restTemplate.getForObject(url, String.class);
//        System.out.println(json);
//        assertThat(json).contains("Root1/Child1/Child1");
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode jsonNode = objectMapper.readTree(json);
//
//        var root1 = jsonNode.get(0);
//        assertEquals("Root1",root1.get("title").asText());
//
//        var root1Child1 = root1.get("children").get(0);
//        assertEquals("Root1/Child1",root1Child1.get("title").asText());
//
//        var root1Child1Child1 = root1Child1.get("children").get(0);
//        assertEquals("Root1/Child1/Child1",root1Child1Child1.get("title").asText());
//    }
//
//    @Test
//    void items() throws JsonProcessingException {
//        String url = "http://localhost:" + port + "/api/items";
//        var json = restTemplate.getForObject(url, String.class);
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode jsonNode = objectMapper.readTree(json);
//
//        assertEquals(5,((ArrayNode) jsonNode).size());
//    }
}
