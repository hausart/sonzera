/**
 * Cole este arquivo em um projeto do Google Apps Script.
 * Aba "Posts": slug | title | excerpt | content | image | date | category | published
 */
const SHEET_ID = 'COLE_AQUI_O_ID_DA_PLANILHA';
const SHEET_NAME = 'Posts';
function doGet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const values = sheet.getDataRange().getDisplayValues();
  const [headers, ...rows] = values;
  const posts = rows.filter((row) => row.some((cell) => cell !== '')).map((row) => {
    const post = {};
    headers.forEach((header, index) => { post[header.trim()] = row[index] || ''; });
    return post;
  }).filter((post) => String(post.published).toLowerCase() !== 'false' && String(post.publicado).toLowerCase() !== 'false');
  return ContentService.createTextOutput(JSON.stringify({ posts })).setMimeType(ContentService.MimeType.JSON);
}
