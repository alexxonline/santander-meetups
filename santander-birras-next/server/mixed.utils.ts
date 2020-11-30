export async function retry(count, fn: () => Promise<any>): Promise<any> {
  try {
    return await fn();
  } catch (error) {
    if(count === 0) {
      throw error;
    }
    return retry(count -1, fn);
  }
}
