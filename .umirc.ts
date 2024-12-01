import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", redirect: "/calculator" },
    { path: "/calculator", component: "@/pages/calculator" },
    { path: "/404", component: "@/pages/404" },
    { path: "/*", redirect: "/404" }
  ],
  npmClient: 'npm',
  history: { type: 'hash' },
  favicons: [
    // 此时将指向 `/favicon.icp` ，确保你的项目含有 `public/favicon.ico`
    '/favicon.ico'
  ]
});
