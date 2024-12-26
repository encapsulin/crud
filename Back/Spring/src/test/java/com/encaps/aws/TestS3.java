package com.encaps.aws;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.util.ArrayList;
import java.util.List;

//@RunWith(SpringRunner.class)
@SpringBootTest(classes = CredentialsProvider.class)
//@ContextConfiguration(classes = CredentialsProvider.class)
public class TestS3 {

    @Autowired
    CredentialsProvider provider;

    private S3Client s3 = null;

//    @Value("${testvalue}")
//    String testvalue;

    @Test
    void testS3() {
        s3 = getClient();
        ListBucketsRequest listObjects = ListBucketsRequest
                .builder()
                .build();

        ListBucketsResponse res = s3.listBuckets(listObjects);
        List<Bucket> objects = res.buckets();
        System.out.println(objects);
    }

    private S3Client getClient() {

        s3 = S3Client.builder()
                .credentialsProvider(provider.getCredentialsProvider())
                .region(provider.getRegion())
                .build();

        return s3;
    }

}
