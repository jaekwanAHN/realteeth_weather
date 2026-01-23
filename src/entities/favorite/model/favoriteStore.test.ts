import { useFavoriteStore } from './store';

const initialState = useFavoriteStore.getState();

describe('FavoriteStore Logic', () => {
  beforeEach(() => {
    useFavoriteStore.setState(initialState);
    useFavoriteStore.getState().favorites = []; // 강제 초기화
  });
  const SEOUL_LAT = 37.5;
  const SEOUL_LON = 127.0;

  test('즐겨찾기를 추가하면 리스트에 들어와야 한다', () => {
    const result = useFavoriteStore.getState().addFavorite({
      name: '서울',
      lat: SEOUL_LAT,
      lon: SEOUL_LON,
    });

    expect(result).toBe(true); // 성공 반환
    expect(useFavoriteStore.getState().favorites).toHaveLength(1);
    expect(useFavoriteStore.getState().favorites[0].name).toBe('서울');
  });

  test('동일한 좌표의 장소는 중복 추가되지 않아야 한다 (이름이 달라도)', () => {
    const store = useFavoriteStore.getState();

    const r1 = store.addFavorite({ name: '서울', lat: SEOUL_LAT, lon: SEOUL_LON });
    const r2 = store.addFavorite({
      name: '서울의 별명',
      lat: SEOUL_LAT,
      lon: SEOUL_LON,
    });

    expect(r1).toBe(true);
    expect(r2).toBe(false);
    expect(useFavoriteStore.getState().favorites).toHaveLength(1);
    expect(useFavoriteStore.getState().favorites[0].name).toBe('서울');
  });

  test('즐겨찾기는 최대 6개까지만 저장되어야 한다', () => {
    // 6개 꽉 채우기
    for (let i = 0; i < 6; i++) {
      useFavoriteStore.getState().addFavorite({
        name: `장소 ${i}`,
        lat: SEOUL_LAT + i, // 좌표 다르게
        lon: SEOUL_LON,
      });
    }

    // 7번째 추가 시도
    const result = useFavoriteStore.getState().addFavorite({
      name: '7번째 장소',
      lat: SEOUL_LAT + 1,
      lon: SEOUL_LON + 1,
    });

    expect(result).toBe(false); // 실패 반환 확인
    expect(useFavoriteStore.getState().favorites).toHaveLength(6); // 갯수 유지
  });

  test('좌표를 기준으로 즐겨찾기 여부를 확인해야 한다', () => {
    const store = useFavoriteStore.getState();
    store.addFavorite({ name: '서울', lat: SEOUL_LAT, lon: SEOUL_LON });
    expect(store.isFavorite(SEOUL_LAT, SEOUL_LON)).toBe(true);
    expect(store.isFavorite(SEOUL_LAT + 1, SEOUL_LON)).toBe(false);
  });
});
