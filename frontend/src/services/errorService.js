export function getApiErrorMessage(error, fallbackMessage) {
  const validationErrors = error?.response?.data?.validationErrors;
  if (validationErrors && typeof validationErrors === 'object') {
    const firstMessage = Object.values(validationErrors)[0];
    if (typeof firstMessage === 'string' && firstMessage.trim()) {
      return firstMessage;
    }
  }

  return error?.response?.data?.message || fallbackMessage;
}
