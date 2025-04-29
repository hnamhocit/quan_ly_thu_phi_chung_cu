export async function handleService<T>(
  fn: () => Promise<T>,
  errorMessage?: string,
  successMessage?: string,
) {
  try {
    const data = await fn();
    return {
      code: 1,
      msg: successMessage || 'Success',
      data,
    };
  } catch (error) {
    console.log({ error });
    return {
      code: 0,
      msg: (errorMessage || 'Operation failed: ') + error.message,
    };
  }
}
