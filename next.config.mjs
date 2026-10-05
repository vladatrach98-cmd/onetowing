/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Страница «трезвый водитель» переехала.
   *
   * Причина не косметическая: для регистрации SMS (10DLC) действует правило —
   * если на сайте есть упоминания алкоголя, сайт обязан спрашивать дату
   * рождения на входе. Возрастной шлагбаум на сайте эвакуатора — это потерянные
   * клиенты, поэтому убрали упоминания, а не поставили шлагбаум. Услуга
   * осталась ровно та же: машина едет на эвакуаторе, человек — в кабине.
   *
   * Старый адрес был в карте сайта и мог разойтись по ссылкам, поэтому 308,
   * а не 404: постоянное перенаправление переносит вес страницы на новую.
   */
  async redirects() {
    return [
      {
        source: '/services/sober-driver',
        destination: '/services/car-home-service',
        permanent: true,
      },
      /**
       * Перестройка услуг под рекламу (сентябрь 2026):
       *  — light-duty-towing слилась с главной страницей буксировки /services/towing;
       *  — accident-recovery переименована в accident-towing (так ищут и так в рекламе);
       *  — motorcycle-towing убрана: мотоциклы пока не продвигаем.
       * Постоянные перенаправления переносят накопленный вес старых адресов.
       */
      { source: '/services/light-duty-towing', destination: '/services/towing', permanent: true },
      { source: '/services/accident-recovery', destination: '/services/accident-towing', permanent: true },
      { source: '/services/motorcycle-towing', destination: '/services/towing', permanent: true },
    ];
  },
};

export default nextConfig;
