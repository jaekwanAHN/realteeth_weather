import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. 기존 플러그인 호환성을 위한 Compat 설정 (Next.js 권장)
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// 2. 설정 배열 정의
const eslintConfig = [
  // Next.js 권장 설정 확장
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 3. Prettier 설정 (항상 배열의 '맨 마지막'에 와야 충돌하는 규칙을 덮어씁니다)
  ...compat.extends("prettier"),

  // 4. 무시할 파일 설정 (Override default ignores)
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;