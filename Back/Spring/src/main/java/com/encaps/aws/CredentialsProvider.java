package com.encaps.aws;

import software.amazon.awssdk.auth.credentials.*;
import software.amazon.awssdk.regions.Region;

public class CredentialsProvider {

     AwsCredentialsProvider awsCredentialsProvider;

    public CredentialsProvider(String accessKeyId, String secretAccessKey) {
        awsCredentialsProvider = getStaticCredentialsProvider(accessKeyId, secretAccessKey);
    }
//    StaticCredentialsProvider staticCredentialsProvider;
//        ProfileCredentialsProvider credentialsProvider = ProfileCredentialsProvider.create();

//  Unable to load credentials from system settings.
//  Access key must be specified either

//  via environment variable (AWS_ACCESS_KEY_ID)
    //  EnvironmentVariableCredentialsProvider      credentialsProvider = EnvironmentVariableCredentialsProvider.create()

//  or system property (aws.accessKeyId).


    public  AwsCredentialsProvider getStaticCredentialsProvider(String accessKeyId, String secretAccessKey) {
        //        System.out.println(accessKeyId);
        awsCredentialsProvider = StaticCredentialsProvider.create(
                AwsBasicCredentials.create(
                        accessKeyId,
                        secretAccessKey));
        //awsCredentialsProvider = EnvironmentVariableCredentialsProvider.create();
        return awsCredentialsProvider;
    }

    public AwsCredentialsProvider getCredentialsProvider() {
        return awsCredentialsProvider;
    }

    public static Region getRegion() {
        return Region.US_EAST_1;
    }

}
