/**
 * Utility to encode/decode birthday gift data directly from the URL.
 * Map keys to short versions to minimize URL length.
 * Uses browser-compatible encoding (btoa/atob) for client-side safety.
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

// ⚡ Browser-safe Base64 Encoding
function safeBtoa(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    return null;
  }
}

// ⚡ Browser-safe Base64 Decoding
function safeAtob(str) {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) base64 += '=';
    return decodeURIComponent(escape(atob(base64)));
  } catch (e) {
    return null;
  }
}

export function encodeWish(data) {
  try {
    const compact = {};
    for (const [key, val] of Object.entries(data)) {
      if (REV_MAP[key]) compact[REV_MAP[key]] = val;
    }

    const json = JSON.stringify(compact);
    return safeBtoa(json);
  } catch (error) {
    console.error('Encoding failed:', error);
    return null;
  }
}

export function decodeWish(str) {
  try {
    const json = safeAtob(str);
    if (!json) return null;

    const compact = JSON.parse(json);
    const data = {};
    for (const [k, v] of Object.entries(compact)) {
      if (KEY_MAP[k]) data[KEY_MAP[k]] = v;
    }

    return data;
  } catch (error) {
    console.error('Decoding failed:', error);
    return null;
  }
}
