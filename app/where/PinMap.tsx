'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

/**
 * КАРТА С ПЕРЕТАСКИВАЕМОЙ ТОЧКОЙ.
 *
 * Leaflet + тайлы OpenStreetMap. Почему не Google: карте Google нужен ключ
 * с биллингом, а он у проекта до сих пор не заведён. OSM работает сегодня,
 * бесплатно и без ограничений по доменам. Когда ключ Google появится, эту
 * одну компоненту можно заменить, ничего вокруг не трогая.
 *
 * ⚠️ Стандартные иконки Leaflet ломаются в сборщиках: они тянут картинки по
 * относительному пути, которого после сборки нет. Поэтому точка нарисована
 * своим DivIcon — заодно она в цветах сайта и крупнее стандартной, что важно
 * для пальца на морозе... точнее, на обочине под дождём.
 *
 * ⚠️ Компонента только клиентская: Leaflet трогает window при импорте.
 * Подключать через dynamic(..., { ssr: false }).
 */

type Props = {
  lat: number;
  lng: number;
  /** Вызывается, когда точку перетащили или ткнули в карту. */
  onMove: (lat: number, lng: number) => void;
  /** Красная точка — машина, тёмная — куда везти. */
  tone?: 'pickup' | 'dropoff';
};

export default function PinMap({ lat, lng, onMove, tone = 'pickup' }: Props) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;
  /**
   * Свежие координаты на момент, когда Leaflet наконец догрузился.
   *
   * ⚠️ Карта строится в асинхронном эффекте: сначала уходит запрос за кодом
   * Leaflet, и только потом создаётся карта. На медленном мобильном интернете
   * это секунды, и за это время клиент успевает выбрать адрес в поиске рядом.
   * Эффект синхронизации на это не поможет — он выходит сразу, пока карты нет.
   * Без этой ссылки карта построится по координатам ПЕРВОГО рендера, то есть
   * по заглушке в даунтауне, а выбор клиента молча пропадёт.
   */
  const latest = useRef({ lat, lng });
  latest.current = { lat, lng };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !boxRef.current || mapRef.current) return;

      const colour = tone === 'pickup' ? '#c8181f' : '#0b1016';
      const icon = L.divIcon({
        className: '',
        html: `<span style="display:block;width:26px;height:26px;border-radius:50%;background:${colour};border:4px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.45)"></span>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const fresh = latest.current;
      const map = L.map(boxRef.current, {
        center: [fresh.lat, fresh.lng],
        zoom: 17,
        // Прокрутка колесом выключена: на телефоне страница скроллится пальцем,
        // и карта не должна перехватывать это движение.
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const marker = L.marker([fresh.lat, fresh.lng], { icon, draggable: true }).addTo(map);

      marker.on('dragend', () => {
        const p = marker.getLatLng();
        onMoveRef.current(p.lat, p.lng);
      });

      // Ткнули в карту — точка прыгает туда. Быстрее, чем тащить.
      map.on('click', (event: any) => {
        marker.setLatLng(event.latlng);
        onMoveRef.current(event.latlng.lat, event.latlng.lng);
      });

      mapRef.current = map;
      markerRef.current = marker;

      // Карта рисуется в скрытом до этого блоке — без пересчёта размера
      // тайлы встают криво.
      setTimeout(() => map.invalidateSize(), 60);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Координаты поменялись снаружи (нажали «моё местоположение», выбрали адрес
  // из поиска) — двигаем точку и карту следом.
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;
    markerRef.current.setLatLng([lat, lng]);
    mapRef.current.setView([lat, lng], mapRef.current.getZoom() ?? 17);
  }, [lat, lng]);

  return <div ref={boxRef} className="h-[260px] w-full sm:h-[300px]" />;
}
