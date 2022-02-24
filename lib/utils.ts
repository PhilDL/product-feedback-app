export const slugify = (...args: (string | number)[]): string => {
  const value = args.join(" ");

  return value
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "-"); // separator
};

export const testImage = (url: string | undefined, timeout?: number) => {
  if (!url) return;
  return new Promise((res) => {
    timeout = timeout || 5000;
    let timedOut = false;
    let timer: any;
    const img = new Image();

    img.onerror = img.onabort = function () {
      if (!timedOut) {
        clearTimeout(timer);
        res("error");
      }
    };

    img.onload = function () {
      if (!timedOut) {
        clearTimeout(timer);
        res("success");
      }
    };

    img.src = url;

    timer = setTimeout(function () {
      timedOut = true;
      // reset .src to invalid URL so it stops previous
      // loading, but doesn't trigger new load
      img.src = "//!!!!/test.jpg";
      res("timeout");
    }, timeout);
  });
};
