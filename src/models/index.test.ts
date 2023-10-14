import * as UserModel from './UserModel'
import * as Barrel from '.'
import { describe, expect, test } from 'vitest'

describe('Barrel Export', () => {
  test('should export all from UserModel', () => {
    expect(Object.keys(Barrel)).toEqual(
      expect.arrayContaining(Object.keys(UserModel))
    )
  })
})
