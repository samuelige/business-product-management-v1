export const base64Decoded = (base64String: string): string | null => {
  try {
    return Buffer.from(base64String, 'base64').toString('utf-8');
  } catch (error) {
    return null;
  }
}

export const decodeBase64 = (base64String: string): string | null => {
  try {
    return atob(base64String);
  } catch (error) {
    return null;
  }
}
