package day24.day24;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Value("${spaces.endpoint}")
    private String endpoint;

    @Value("${spaces.region}")
    private String region;

    @Bean
    AmazonS3 createS3Client() {
        final String accessKey = System.getenv("AWS_S3_ACCESS_KEY");
        final String secretKey = System.getenv("AWS_S3_SECRET_KEY");

        //Credentials
        final BasicAWSCredentials basicCred = new BasicAWSCredentials(accessKey, secretKey);
        final AWSStaticCredentialsProvider credProv = new AWSStaticCredentialsProvider(basicCred);

        //Endpoint
        final EndpointConfiguration config = new EndpointConfiguration(endpoint, region);

        return AmazonS3ClientBuilder
            .standard()
            .withCredentials(credProv)
            .withEndpointConfiguration(config)
            .build();

    }
} 
