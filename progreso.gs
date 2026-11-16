/**
 * Gen-Eco en Ruta v2.0 · Guardado y recuperación de progreso (Google Apps Script)
 * Guarda UNA fila por código anónimo en la hoja "progreso" de esta hoja de cálculo.
 * No guarda nombres ni datos personales: solo el código y el avance del juego.
 */
const HOJA = 'progreso';
function _sh() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(HOJA);
  if (!sh) { sh = ss.insertSheet(HOJA); sh.appendRow(['codigo', 'actualizado', 'json']); }
  return sh;
}
function _fila(sh, code) {
  const n = sh.getLastRow(); if (n < 2) return 0;
  const v = sh.getRange(2, 1, n - 1, 1).getValues();
  for (let i = 0; i < v.length; i++) if (String(v[i][0]) === code) return i + 2;
  return 0;
}
function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const code = String(d.code || '').toUpperCase();
    if (!/^[A-Z0-9]{3,12}$/.test(code) || !d.json || d.json.length > 49000) return ContentService.createTextOutput('bad');
    const sh = _sh(), f = _fila(sh, code), ahora = new Date();
    if (f) sh.getRange(f, 1, 1, 3).setValues([[code, ahora, d.json]]); else sh.appendRow([code, ahora, d.json]);
    return ContentService.createTextOutput('ok');
  } finally { lock.releaseLock(); }
}
function doGet(e) {
  if (e.parameter && e.parameter.resumen) {
    const sh = _sh(), n = sh.getLastRow(); let jug = 0, frag = 0;
    if (n > 1) sh.getRange(2, 3, n - 1, 1).getValues().forEach(r => {
      try { const R = JSON.parse(r[0]); if (R.fase) return; jug++; Object.values(R.misiones || {}).forEach(m => { if (m.ya || m.estado === 'completada') frag++; }); } catch (x) { }
    });
    return ContentService.createTextOutput(JSON.stringify({ ok: true, jugadores: jug, fragmentos: frag })).setMimeType(ContentService.MimeType.JSON);
  }
  const code = String((e.parameter && e.parameter.code) || '').toUpperCase();
  let out = { ok: true, json: null };
  if (/^[A-Z0-9]{3,12}$/.test(code)) {
    const sh = _sh(), f = _fila(sh, code);
    if (f) out.json = sh.getRange(f, 3).getValue();
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
