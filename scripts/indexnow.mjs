/**
 * IndexNow — сообщить поисковикам, что на сайте появились или изменились страницы.
 *
 * Обычно робот заходит на сайт сам, когда посчитает нужным, — это недели.
 * IndexNow работает наоборот: сайт сам звонит в дверь, и страницу забирают за часы.
 * Один запрос уходит сразу в Bing, Yandex, Naver и Seznam. Для нас важен Bing:
 * на его индексе работает поиск ChatGPT.
 *
 * ЗАПУСК — после каждого деплоя, где появились или изменились страницы:
 *
 *     npm run indexnow
 *
 * Скрипт сам читает список страниц из живого sitemap.xml, поэтому вручную
 * перечислять адреса не надо: добавили страницу в sitemap — она попадёт в отправку.
 *
 * ⚠️ Файл `public/<ключ>.txt` удалять нельзя — это доказательство, что сайт наш.
 * Пропадёт файл — запросы начнут отклоняться.
 */

const KEY = '6328c73e635638e2ac5cf57965895c26';
const HOST = 'onetowingfl.com';
const SITEMAP = `https://${HOST}/sitemap.xml`;

async function readSitemap() {
  const res = await fetch(SITEMAP, { headers: { 'User-Agent': 'one-towing-indexnow' } });
  if (!res.ok) throw new Error(`sitemap.xml отдал ${res.status}`);

  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

  if (urls.length === 0) throw new Error('в sitemap.xml не нашлось ни одного адреса');
  return urls;
}

async function submit(urlList) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });

  // 200 — приняли, 202 — приняли, ключ ещё проверяется. Оба означают успех.
  return { status: res.status, body: await res.text() };
}

const urls = await readSitemap();
console.log(`Отправляю ${urls.length} адрес(ов):`);
urls.forEach((u) => console.log('  ' + u));

const { status, body } = await submit(urls);

if (status === 200 || status === 202) {
  console.log(`\n✅ Принято (HTTP ${status}). Страницы уйдут в индекс в ближайшие часы.`);
} else {
  console.error(`\n❌ Отклонено (HTTP ${status}) ${body}`);
  console.error('Проверь, что открывается https://' + HOST + '/' + KEY + '.txt');
  process.exit(1);
}
