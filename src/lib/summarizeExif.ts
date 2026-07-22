export type ExifSummary = {
  camera?: string
  takenAt?: string
  gps?: string
}

type ExifData = Record<string, unknown>

function textValue(value: unknown): string | undefined {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return undefined
  }

  const text = String(value).trim()
  return text || undefined
}

function formatDate(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toLocaleString()
  }

  const text = textValue(value)
  if (!text) {
    return undefined
  }

  const date = new Date(text)
  return Number.isNaN(date.getTime()) ? text : date.toLocaleString()
}

function formatCoordinate(value: unknown, axis: 'latitude' | 'longitude'): string | undefined {
  const coordinate = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(coordinate)) {
    return undefined
  }

  const direction =
    axis === 'latitude' ? (coordinate >= 0 ? 'N' : 'S') : coordinate >= 0 ? 'E' : 'W'
  return `${Math.abs(coordinate).toFixed(5)}° ${direction}`
}

export function summarizeExif(exif: ExifData): ExifSummary {
  const make = textValue(exif.Make)
  const model = textValue(exif.Model)
  const camera = [make, model].filter(Boolean).join(' ') || undefined
  const takenAt = formatDate(
    exif.DateTimeOriginal ?? exif.CreateDate ?? exif.DateTime ?? exif.ModifyDate,
  )
  const latitude = formatCoordinate(exif.latitude ?? exif.GPSLatitude, 'latitude')
  const longitude = formatCoordinate(exif.longitude ?? exif.GPSLongitude, 'longitude')

  return {
    ...(camera ? { camera } : {}),
    ...(takenAt ? { takenAt } : {}),
    ...(latitude && longitude ? { gps: `${latitude}, ${longitude}` } : {}),
  }
}
