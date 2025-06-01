export default class CmsLoader {
  baseUrl = 'https://admin.schluesselmomente-freiburg.de/api';

  renderTitle(title, targetElement) {
    const h3Element = document.createElement('h3');
    h3Element.classList.add('text-xl', 'pb-4');
    h3Element.innerHTML = title;
    targetElement.appendChild(h3Element);
  }

  renderListItems(data, targetElement) {
    const ul = document.createElement('ul');
    ul.classList.add('list-disc', 'pl-8');
    data.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item.Item;
      ul.appendChild(listItem);
    });
    targetElement.appendChild(ul);
  }

  async fetchData(api) {
    const res = await fetch(`${this.baseUrl}/${api}`);
    const json = await res.json();
    if (json) {
      return json.data;
    } else {
      console.error('Target not found or data is undefined');
    }
  }

  async loadPersoenliches() {
    const hinweisBoxEl = document.getElementById('persoenliches-id');
    const res = await fetch(`${this.baseUrl}/about-me`);
    const json = await res.json();
    if (hinweisBoxEl && json) {
      console.log(json);
      hinweisBoxEl.innerHTML = json.data.Ausbildung;
    } else {
      console.error('Hinweis Box Element not found or data is undefined');
    }
  }

  async loadHinweisBox() {
    const hinweisBoxEl = document.getElementById('hinweis-box-id');
    const res = await fetch(`${this.baseUrl}/hinweis-box`);
    const json = await res.json();
    if (hinweisBoxEl && json) {
      console.log(json);
      hinweisBoxEl.innerHTML = json.data.title;
    } else {
      console.error('Hinweis Box Element not found or data is undefined');
    }
  }

  async loadUeberMichItems() {
    try {
      const list = await this.fetchData('simple-lists?sort=rank');
      if (!list || list.length === 0) {
        console.warn('No data found, using default data.');
        throw new Error('No data found');
      }
      let count = 1;
      list.map(async (item) => {
        const listItem = await this.fetchData(
          `simple-lists/${item.documentId}?populate=*`,
        );
        const targetElement = document.getElementById(
          `about-card-section-${count}`,
        );
        this.renderTitle(listItem.title, targetElement);
        this.renderListItems(listItem.Items, targetElement);
        count++;
      });
    } catch (error) {
      console.error('Error loading data:', error);
      let count = 1;
      Object.keys(this.defaultData).forEach((key) => {
        const item = this.defaultData[key];
        const targetElement = document.getElementById(
          `about-card-section-${count}`,
        );
        this.renderTitle(item.title, targetElement);
        this.renderListItems(item.Items, targetElement);
        count++;
      });
    }
  }

  async getData() {
    await this.loadUeberMichItems();
    await this.populateItem('arbeitsweise', 'arbeitsweise-id');
    await this.populateCost('cost');
  }

  async populateCost(api) {
    const res = await this.fetchData(api);

    const einzelBeratungDauerEl = document.getElementById("einzelberatung-dauer-id");
    einzelBeratungDauerEl.innerHTML = "für " + res.DauerEinzel;
    const einzelBeratungEl = document.getElementById("einzelberatung-cost-id");
    einzelBeratungEl.innerHTML = res.PreisEinzel + " €";
    const einzelBeratungErstgespraechEl = document.getElementById("einzelberatung-erst-cost-id");
    einzelBeratungErstgespraechEl.innerHTML = res.DauerEinzelErst + ", " + res.PreisEinzelErst + " Euro";

    const paarBeratungEl = document.getElementById("paarberatung-cost-id");
    paarBeratungEl.innerHTML = res.PreisPaar + " €";
    const paarBeratungDauerEl = document.getElementById("paarberatung-dauer-id");
    paarBeratungDauerEl.innerHTML = "für " + res.DauerPaar; 
    const paarBeratungErstgespraechEl = document.getElementById("paarberatung-erst-cost-id");
    paarBeratungErstgespraechEl.innerHTML = res.DauerPaarErst + ", " + res.PreisPaarErst + " Euro";
  }

  async populateItem(api, targetElementId) {
    const res = await this.fetchData(api);
    const targetElement = document.getElementById(targetElementId);
    targetElement.innerHTML = res.content;
  }

  defaultData = {
    'about-card-section-1': {
      title: 'Berufsausbildung / Beratungsausbildung:',
      Items: [
        {
          Item: 'Systemische Beraterin (3-Jährige Weiterbildung bei Wispo Tandem)',
        },
        { Item: 'Sozialarbeiterin B.A.' },
      ],
    },
    'about-card-section-2': {
      title: 'Fortbildungen',
      Items: [
        { Item: 'Konflikte systemisch verstehen und bearbeiten (Eva Gehring)' },
        {
          Item: 'Verzeihen und Versöhnen in der Paarbeziehung (Friederike von Tiedemann)',
        },
      ],
    },
    'about-card-section-3': {
      title: 'Berufstätigkeit',
      Items: [
        {
          Item: 'derzeit in Elternzeit, selbstständige Beraterin seit August 2023',
        },
        {
          Item: 'Co-Leitung Kinderbereich und Fundraising bei Stadtpiraten Freiburg e.V.',
        },
        { Item: 'stationäre Kinder- und Jugendhilfe im SOS-Kinderdorf' },
        { Item: 'Co-Leitung Freiwilligen Seminare Diakonie Baden' },
      ],
    },
    'about-card-section-4': {
      title: 'Persönliches',
      Items: [{ Item: 'verheiratet' }, { Item: 'zwei Kinder' }],
    },
  };
}
