export const isDateOlderThanADay = (date: Date): boolean => {
  const ONE_DAY_IN_HOURS = 24;
  const today = new Date();
  return (Math.abs(today.valueOf() - date.valueOf()) / 36e5) >= ONE_DAY_IN_HOURS;
}

export const fetchOnlyAfter24Hours = async (keyToFind: string, oldDataCallback: Function, usableDataCallback: Function) => {
  const cachedData = localStorage.getItem(keyToFind);
  if (cachedData) {
    const data = JSON.parse(cachedData);
    const lastFetchDate = data.lastFetchDate;
    if (isDateOlderThanADay(lastFetchDate)) {
      await oldDataCallback();
    } else {
      usableDataCallback(data.storedData)
    }
  } else {
    await oldDataCallback();
  }
}

export const getReadableDuration = (milliseconds:number):string => {
  return new Date(milliseconds).toISOString().slice(11, 19)
}

export const getReadableDate = (date: Date):string => {
  const formattedDate = new Date(date);

  return formattedDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric'
  });
}
