export async function timeout(ms: number) {
  return new Promise((res, rej) => setTimeout(res, ms));
}
