import { useFavoriteStore } from './store';

const initialState = useFavoriteStore.getState();

describe('FavoriteStore Logic', () => {
  beforeEach(() => {
    useFavoriteStore.setState(initialState);
    useFavoriteStore.getState().favorites = []; // 강제 초기화
  });

  test('즐겨찾기를 추가하면 리스트에 들어와야 한다', () => {
    const result = useFavoriteStore.getState().addFavorite({
      name: '서울',
      lat: 37.5,
      lon: 127.0,
    });

    expect(result).toBe(true); // 성공 반환
    expect(useFavoriteStore.getState().favorites).toHaveLength(1);
    expect(useFavoriteStore.getState().favorites[0].name).toBe('서울');
  });

  test('동일한 좌표의 장소는 중복 추가되지 않아야 한다 (이름이 달라도)', () => {
    const store = useFavoriteStore.getState();

    const r1 = store.addFavorite({ name: '서울', lat: 37.5, lon: 127.0 });
    const r2 = store.addFavorite({
      name: '서울의 별명',
      lat: 37.5,
      lon: 127.0,
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
        lat: 37.0 + i, // 좌표 다르게
        lon: 127.0,
      });
    }

    // 7번째 추가 시도
    const result = useFavoriteStore.getState().addFavorite({
      name: '7번째 장소',
      lat: 38.0,
      lon: 128.0,
    });

    expect(result).toBe(false); // 실패 반환 확인
    expect(useFavoriteStore.getState().favorites).toHaveLength(6); // 갯수 유지
  });

  test('좌표를 기준으로 즐겨찾기 여부를 확인해야 한다', () => {
    const store = useFavoriteStore.getState();
    store.addFavorite({ name: '강남구', lat: 37.5, lon: 127.0 });
    expect(store.isFavorite(37.5, 127.0)).toBe(true);
    expect(store.isFavorite(37.6, 127.0)).toBe(false);
  });
});
