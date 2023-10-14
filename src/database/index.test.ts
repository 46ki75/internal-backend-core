import * as DynamoDBClient from './DynamoDBClient'
import * as Barrel from '.'
import { describe, expect, test } from 'vitest'

describe('Barrel Export', () => {
  test('should export all from DynamoDBClient', () => {
    expect(Object.keys(Barrel)).toEqual(
      expect.arrayContaining(Object.keys(DynamoDBClient))
    )
  })
})
