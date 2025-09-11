const BASE_URL = "https://en.wikipedia.org/w/api.php";
const TITLE = "List_of_ursids";

export const queryBears = async () => {

    const query_params = {
        action: "parse",
        page: TITLE,
        prop: "wikitext",
        section: 3,
        format: "json",
        origin: "*"
    }

    const query_url = `${BASE_URL}?${new URLSearchParams(query_params)}`;
    const loadingMessage = document.querySelector('#more-bears-loading');

    try {
        const response = await fetch(query_url)

        if (!response.ok) {
            throw new Error(`Wikipedia API returned status ${response.status}: ${response.statusText}`)
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(`Wikipedia API returned status ${response.status}: ${response.statusText}`)
        }

        const bears = await extractBears(data.parse.wikitext['*']);

        renderBears(bears);

        if (loadingMessage) loadingMessage.remove();

    } catch (error) {
        throw new Error(`Failed to fetch bear data: ${error.message}`);
    }
}

const extractBears = async (wikitext) => {
    if (!wikitext || typeof wikitext !== "string") {
        throw new Error('Wikipedia API returned invalid wikitext');
    }

    const speciesTables = wikitext.split('{{Species table/end}}');
    let bears = [];

    for (const tables of speciesTables) {
        const rows = tables.split('{{Species table/row}}')

        for (const row of rows) {
            const bear = await extractBear(row)

            if (bear) bears.push(bear)
        }
    }

    return bears;
}

const extractBear = async (row) => {
    const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
    const binomialMatch = row.match(/\|binomial=(.*?)\n/);
    const imageMatch = row.match(/\|image=(.*?)\n/);
    const imageAltMatch = row.match(/\|image-alt=(.*?)\n/);
    const rangeMatch = row.match(/\|range=([^|\n]*)/);
    const rangeImgMatch = row.match(/\|range-image=([^|\n]*)/);

    if ((nameMatch && binomialMatch && imageMatch)) {
        try {

            const fileName = imageMatch[1].trim().replace('File:', '');
            const rangeFileName = rangeImgMatch[1].trim().replace('File:', '');

            const imgAltDesc = imageAltMatch[1].trim();

            let imgUrl = null
            let rangeImgUrl = null

            // If you want to see a raccoon... just replace the assignment to null here ;)
            if (fileName) imgUrl = await fetchImageFromUrl(fileName);
            if (rangeFileName) rangeImgUrl = await fetchImageFromUrl(rangeFileName);

            return {
                name: nameMatch[1],
                binomial: binomialMatch[1],
                image: { url: imgUrl, alt: imgAltDesc},
                range: { url: rangeImgUrl, desc: rangeMatch[1] }
            };

        } catch (error) {
            console.warn(`Failed to process bear data for ${row}: ${error.message}`);
        }
    }
}

const fetchImageFromUrl = async (fileName) => {
    const imageParams = {
        action: "query",
        titles: "File:" + fileName,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*"
    }

    const queryUrl = `${BASE_URL}?${new URLSearchParams(imageParams)}`;

    const response = await fetch(queryUrl)

    if  (!response.ok) {
        throw new Error(`Wikipedia API returned status ${response.status}: ${response.statusText}`)
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(`Wikipedia API returned status ${response.status}: ${response.statusText}`)
    }

    const pages = data.query.pages
    if (!pages && pages.length) return null;

    const page = Object.values(pages)[0]

    return page.imageinfo[0].url
}

const renderBears = (bears) => {
    const moreBears = document.querySelector('.more-bears');

    if (!moreBears) {
        console.warn("More bears container not found!")
        return;
    }

    if (bears.length === 0) {
        const notFoundElement = document.createElement("p")
        notFoundElement.innerText = "No bears found."

        moreBears.appendChild(notFoundElement);
    }

    const summaryDiv = document.createElement("div");
    summaryDiv.className = "bears-summary";

    bears.forEach((bear) => {
        const bearDiv = document.createElement("div");
        bearDiv.className = "bear";
        bearDiv.style.marginBottom = "10px";

        bearDiv.innerHTML = `
            <p style="font-size: 2rem"> <strong> ${bear.name} </strong> ${bear.binomial} - ${bear.range.desc} </p>
            <div class="image-row">
                <img src="${bear.image.url}"
                    style="width: auto; height: 200px"
                    alt="${bear.image.alt}"
                    onerror="this.src='/resources/oops.webp';"
                    loading="lazy">
                
                <img src="${bear.range.url}"
                    style="width: auto; height: 200px"
                    loading="lazy"
                    onerror="this.src='/resources/oops.webp';"
                    alt="I am to lazy to also load this">
            </div>
        `
        moreBears.appendChild(bearDiv);
    })
}

document.addEventListener('queryBears', queryBears)