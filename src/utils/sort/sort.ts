// 路由排序
export function sortRoute(a, b) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0)
}
