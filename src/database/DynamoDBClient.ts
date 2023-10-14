import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

/**
 * The `client` object provides a DynamoDB client configured for the 'ap-northeast-1' region.
 * This client object can be used to interact with Amazon DynamoDB.
 *
 * @see
 * For example usage, refer to the official AWS SDK for JavaScript DynamoDB code examples:
 * [AWS SDK for JavaScript DynamoDB Examples](https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html)
 *
 * **example:**
 * ```typescript
 * import { GetItemCommand, GetItemCommandInput } from '@aws-sdk/client-dynamodb'
 * const params: GetItemCommandInput = {
 *   TableName: process.env.TABLE_NAME,
 *   Key: {
 *     PK: { S: 'USER' },
 *     SK: { S: this.SK }
 *   }
 * }
 * const command = new GetItemCommand(params)
 * const data = await client.send(command)
 * ```
 */
export const client: DynamoDBClient = new DynamoDBClient({
  region: 'ap-northeast-1'
})
