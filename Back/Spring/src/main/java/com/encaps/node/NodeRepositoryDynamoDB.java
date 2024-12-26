package com.encaps.node;

import com.encaps.aws.CredentialsProvider;
import com.encaps.aws.dynamodb.DynamoDB;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.enhanced.dynamodb.*;
import software.amazon.awssdk.enhanced.dynamodb.model.GetItemEnhancedRequest;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.ScanEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.ScanRequest;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static software.amazon.awssdk.enhanced.dynamodb.mapper.StaticAttributeTags.primaryPartitionKey;

@Service
public class NodeRepositoryDynamoDB extends DynamoDB {

    @Value("${aws.accessKeyId}")
    private String accessKeyId;
    @Value("${aws.secretAccessKey}")
    private String secretAccessKey;

    DynamoDB dynamoDB;
    DynamoDbEnhancedClient enhancedClient;
    DynamoDbTable<NodeEntity> table;
    final String TABLE_NAME = "Node";

    final Logger LOG = LoggerFactory.getLogger(NodeRepositoryDynamoDB.class);

    //TODO: delete after optimization
    public List<NodeEntity> list = new ArrayList<>();

    public NodeRepositoryDynamoDB() {
    }

    @PostConstruct
    void postConstruct() {
        dynamoDB = new DynamoDB(new CredentialsProvider(accessKeyId, secretAccessKey));
        enhancedClient = dynamoDB.getEnhancedClient();
        //ignores numbers somehow
//        TableSchema<NodeEntity> tableSchema = TableSchema.fromBean(NodeEntity.class);
        TableSchema<NodeEntity> tableSchema =
                TableSchema.builder(NodeEntity.class)
                        .newItemSupplier(NodeEntity::new)
                        .addAttribute(Long.class, a -> a.name("id")
                                .getter(NodeEntity::getId)
                                .setter(NodeEntity::setId)
                                .tags(primaryPartitionKey()))
                        .addAttribute(Long.class, a -> a.name("parentId")
                                        .getter(NodeEntity::getParentId)
                                        .setter(NodeEntity::setParentId)
//                                    .tags(primarySortKey())
                        )
                        .addAttribute(String.class, a -> a.name("title")
                                .getter(NodeEntity::getTitle)
                                .setter(NodeEntity::setTitle))
                        .addAttribute(LocalDateTime.class, a -> a.name("updatedOn")
                                .getter(NodeEntity::getUpdatedOn)
                                .setter(NodeEntity::setUpdatedOn))
                        .addAttribute(Integer.class, a -> a.name("role")
                                .getter(NodeEntity::getRole)
                                .setter(NodeEntity::setRole))
                        .build();
        table = enhancedClient.table(TABLE_NAME, tableSchema);
    }

    public NodeEntity save(NodeEntity entity) {
        LOG.info("save()");
        entity.setUpdatedOn(LocalDateTime.now());
        table.putItem(entity);
        return entity;
    }

    public Optional<NodeEntity> findById(Long id) {
        LOG.info("findById()");
        NodeEntity result = null;
        Key key = Key.builder()
                .partitionValue(id)
                //.sortValue("1")
                .build();

        // Get the item by using the key.
        result = table.getItem(
                (GetItemEnhancedRequest.Builder requestBuilder) -> requestBuilder.key(key));
        return (result == null) ? Optional.empty() : Optional.of(result);
    }

    public List<NodeEntity> findAll() {
        LOG.info("findAll()");
        var list = new ArrayList<NodeEntity>();
        Iterator<NodeEntity> results = table.scan().items().iterator();
        while (results.hasNext()) {
            NodeEntity rec = results.next();
            list.add(rec);
        }
        this.list = list;
        return list;
    }

    public List<NodeEntity> findAllByParentIdDraft(Long id) {
        LOG.info("find?");
        AttributeValue att = AttributeValue.builder()
                .n(String.valueOf(id))
                .build();

        Map<String, AttributeValue> expressionValues = new HashMap<>();
        expressionValues.put(":value", att);

        Expression expression = Expression.builder()
                .expression("parentId = :value")
                .expressionValues(expressionValues)
                .build();

        // Create a QueryConditional object to query by partitionValue.
        // Since the Customer table has a sort key attribute (email), we can use an expression
        // to filter the query results if multiple items have the same partition key value.
        QueryConditional queryConditional = QueryConditional
                .keyEqualTo(Key.builder().partitionValue("id101")
                        .build());

        var list = new ArrayList<NodeEntity>();
        // Perform the query
        for (NodeEntity node : table.query(
                r -> r
                        .queryConditional(queryConditional)
                        .filterExpression(expression)
        ).items()) {
            list.add(node);
        }
        return list;
    }

    // TODO: optimize, see example above
    public List<NodeEntity> findAllByParentId(Long id) {
        LOG.info("findAllByParentId()");
        return this.list.stream()
                .filter(e -> e.getParentId().equals(id))
                .collect(Collectors.toList());
    }

    public boolean deleteById(Long id) {
        LOG.info("deleteById()");
        dynamoDB.deleteDynamoDBItem(
                dynamoDB.getClient(),
                TABLE_NAME,
                "id", id);
        return false;
    }

    //TODO
    boolean deleteAll() {
        return false;
    }

    public List<NodeEntity> findBy(String key, Object value) {
        var list = new ArrayList<NodeEntity>();

        var expressionAttrNames = new HashMap<String, String>();
        expressionAttrNames.put("#pn", key);
        var expressionAttrValues = new HashMap<String, AttributeValue>();
        AttributeValue attrVal = null;
        if (value instanceof String)
            attrVal = AttributeValue.fromS((String) value);
        if (value instanceof Number)
            attrVal = AttributeValue.fromN(String.valueOf(value));
        expressionAttrValues.put(":pv", attrVal);

        Expression expression = Expression.builder()
                .expression("#pn = :pv")
                .expressionNames(expressionAttrNames)
                .expressionValues(expressionAttrValues)
                .build();
        ScanEnhancedRequest request = ScanEnhancedRequest.builder()
                .filterExpression(expression)
                .build();

        Iterator<NodeEntity> results = table.scan(request).items().iterator();
        while (results.hasNext()) {
            NodeEntity rec = results.next();
            list.add(rec);
        }
        return list;
    }
}
