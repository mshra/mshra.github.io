import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  if (pathname.includes(".") || pathname.startsWith("/_astro/")) {
    return next();
  }

  if (pathname === "/demo" || pathname === "/demo/") {
    return next();
  }

  if (pathname === "/404" || pathname === "/404/") {
    return next();
  }

  if (
    pathname === "/under-construction" ||
    pathname === "/under-construction/"
  ) {
    return next();
  }

  return context.rewrite("/under-construction");
});
