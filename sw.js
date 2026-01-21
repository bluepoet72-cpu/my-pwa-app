// Service Worker 버전 (캐시 업데이트 시 변경)
const CACHE_VERSION = 'v1';
const CACHE_NAME = `my-app-${CACHE_VERSION}`;

// 캐시할 파일 목록
const FILES_TO_CACHE = [
  '.',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 설치 이벤트: 필수 파일들을 캐시에 저장
self.addEventListener('install', (event) => {
  console.log('[SW] 설치 중...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] 파일 캐시 중...');
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
        console.log('[SW] 설치 완료');
        return self.skipWaiting();
      })
  );
});

// 활성화 이벤트: 이전 버전 캐시 삭제
self.addEventListener('activate', (event) => {
  console.log('[SW] 활성화 중...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] 이전 캐시 삭제:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] 활성화 완료');
        return self.clients.claim();
      })
  );
});

// Fetch 이벤트: 캐시 우선 전략
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          // 캐시에 있으면 캐시에서 반환
          return response;
        }
        // 캐시에 없으면 네트워크에서 가져오기
        return fetch(event.request)
          .then((response) => {
            // 유효한 응답인지 확인
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // 응답을 복제하여 캐시에 저장
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(() => {
            // 오프라인이고 캐시에도 없을 때
            console.log('[SW] 오프라인 상태');
          });
      })
  );
});
