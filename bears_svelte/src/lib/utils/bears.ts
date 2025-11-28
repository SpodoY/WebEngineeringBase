import type { Bear } from '../../../../src/types/Bear';

const BASE_URL = 'https://en.wikipedia.org/w/api.php';
const TITLE = 'List_of_ursids';

export const queryBears = async (): Promise<Bear[] | null> => {
  const query_params = {
    action: 'parse',
    page: TITLE,
    prop: 'wikitext',
    section: '3',
    format: 'json',
    origin: '*',
  };

  const query_url = `${BASE_URL}?${new URLSearchParams(query_params)}`;

  try {
    const response = await fetch(query_url);

    if (!response.ok) {
      throw new Error(
        `Wikipedia API returned status ${response.status}: ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(
        `Wikipedia API returned status ${response.status}: ${response.statusText}`,
      );
    }

    const bears = await extractBears(data.parse.wikitext['*']);

    return bears;
  } catch (error) {
    throw new Error(`Failed to fetch bear data: ${error.message}`);
  }
};

export const fallbackImage = (event: Event, fallback = '/media/oops.webp') => {
  const img = event.target as HTMLImageElement;
  img.src = fallback;
}

const extractBears = async (wikitext: string) => {
  if (!wikitext) {
    throw new Error('Wikipedia API returned invalid wikitext');
  }

  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  for (const tables of speciesTables) {
    const rows = tables.split('{{Species table/row}}');

    for (const row of rows) {
      const bear = await extractBear(row);

      if (bear) bears.push(bear);
    }
  }

  return bears;
};

const extractBear = async (row: string): Promise<Bear | undefined> => {
  const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
  const binomialMatch = row.match(/\|binomial=(.*?)\n/);
  const imageMatch = row.match(/\|image=(.*?)\n/);
  const imageAltMatch = row.match(/\|image-alt=(.*?)\n/);
  const rangeMatch = row.match(/\|range=([^|\n]*)/);
  const rangeImgMatch = row.match(/\|range-image=([^|\n]*)/);

  if (
    nameMatch &&
    binomialMatch &&
    imageMatch &&
    rangeMatch &&
    rangeImgMatch &&
    imageAltMatch &&
    rangeImgMatch &&
    rangeImgMatch
  ) {
    try {
      const fileName = imageMatch[1]?.trim().replace('File:', '');
      const rangeFileName = rangeImgMatch[1]?.trim().replace('File:', '');

      const imgAltDesc = imageAltMatch[1]?.trim();

      let imgUrl = null;
      let rangeImgUrl = null;

      // If you want to see a raccoon... just replace the assignment to null here ;)
      if (fileName) imgUrl = await fetchImageFromUrl(fileName);
      if (rangeFileName) rangeImgUrl = await fetchImageFromUrl(rangeFileName);

      return {
        name: nameMatch[1] ?? '',
        binomial: binomialMatch[1] ?? '',
        image: { url: imgUrl, alt: imgAltDesc ?? '' },
        range: { url: rangeImgUrl, desc: rangeMatch[1] ?? '' },
      };
    } catch (error: unknown) {
      console.warn(`Failed to process bear data for ${row}: ${error.message}`);
    }
  }
  return undefined;
};

const fetchImageFromUrl = async (fileName: string) => {
  const imageParams = {
    action: 'query',
    titles: 'File:' + fileName,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  const queryUrl = `${BASE_URL}?${new URLSearchParams(imageParams)}`;

  const response = await fetch(queryUrl);

  if (!response.ok) {
    throw new Error(
      `Wikipedia API returned status ${response.status}: ${response.statusText}`,
    );
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(
      `Wikipedia API returned status ${response.status}: ${response.statusText}`,
    );
  }

  const pages = data.query.pages;
  if (!pages && pages.length) return null;

  // I really didn't want to add a type here - sry not sry
  const page: any = Object.values(pages)[0];

  return page.imageinfo[0].url;
};