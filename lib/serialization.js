/**
 * Utility to encode/decode birthday gift data directly from the URL.
 * Map keys to short versions to minimize URL length.
 */

const KEY_MAP = {
  gt: 'gift_type',
  ge: 'gift_emoji',
  tc: 'theme_color',
  rn: 'recipient_name',
  mt: 'message_type',
  msg: 'message',
  mc: 'music_choice',
};

const REV_MAP = Object.fromEntries(
  Object.entries(KEY_MAP).map(([k, v]) => [v, k])
);

export function encodeWish(data) {
  try {
    // 1. Map to short keys
    const compact = {};
    for (const [key, val] of Object.entries(data)) {
      if (REV_MAP[key]) {
        compact[REV_MAP[key]] = val;
      }
    }

    // 2. Stringify and Base64 (URL Safe)
    const json = JSON.stringify(compact);
    const b64 = Buffer.from(json).toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    return b64;
  } catch (error) {
    console.error('Encoding failed:', error);
    return null;
  }
}

export function decodeWish(str) {
  try {
    // 1. Normalize Base64
    let b64 = str
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    while (b64.length % 4 !== 0) {
      b64 += '=';
    }

    // 2. Parse JSON
    const json = Buffer.from(b64, 'base64').toString('utf8');
    const compact = JSON.parse(json);

    // 3. Map back to long keys
    const data = {};
    for (const [k, v] of Object.entries(compact)) {
      if (KEY_MAP[k]) {
        data[KEY_MAP[k]] = v;
      }
    }

    return data;
  } catch (error) {
    console.error('Decoding failed:', error);
    return null;
  }
}
