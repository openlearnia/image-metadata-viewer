import { describe, expect, it } from 'vitest'
import { summarizeExif } from './summarizeExif'

describe('summarizeExif', () => {
  it('extracts camera, date, and GPS when present', () => {
    const summary = summarizeExif({
      Make: 'Canon',
      Model: 'EOS R5',
      DateTimeOriginal: new Date('2024-01-02T03:04:05Z'),
      latitude: 37.77,
      longitude: -122.42,
    })

    expect(summary.camera).toMatch(/Canon/)
    expect(summary.takenAt).toBeTruthy()
    expect(summary.gps).toMatch(/37/)
  })
})
