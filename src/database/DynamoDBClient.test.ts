import { describe, expect, test } from 'vitest'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

import { client } from './DynamoDBClient'
describe('DynamoDB client instance test', () => {
  test('client must be created', () => {
    expect(client).instanceOf(DynamoDBClient)
  })
})
