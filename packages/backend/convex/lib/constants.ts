export function parseCurrentConvexEnvironment() {
  if (process.env.NODE_ENV === "test") {
    return "test";
  }

  if (process.env.CONVEX_ENV !== "production") {
    return "development";
  }

  return "production";
}
