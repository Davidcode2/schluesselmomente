export default class CmsLoader {
  baseUrl = "http://localhost:1337/api";

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

  async loadItem(api, targetElementId) {
    const targetElement = document.getElementById(targetElementId);
    const res = await fetch(`${this.baseUrl}/${api}`);
    const json = await res.json();
    if (targetElement && json) {
      console.log(json);
      targetElement.innerHTML = json.data.content;
    } else {
      console.error('Target not found or data is undefined');
    }
  }

  async loadListItem(api) {
    const res = await fetch(`${this.baseUrl}/${api}`);
    const json = await res.json();
    if (json) {
      console.log(json);
      return json.data;
    } else {
      console.error('Target not found or data is undefined');
    }
  }

  async loadList(api) {
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

  async getData() {
    const list = await this.loadList("simple-lists?sort=rank");
    if (!list || list.length === 0) {
      list = this.defaultData;
    }
    console.log(list);
    let count = 1;
    list.map(async item => {
      const listItem = await this.loadListItem(`simple-lists/${item.documentId}?populate=*`)
      const targetElement = document.getElementById(`about-card-section-${count}`);
      this.renderTitle(listItem.title, targetElement);
      this.renderListItems(listItem.Items, targetElement)
      count++;
    });
    this.loadItem("arbeitsweise", "arbeitsweise-id");
  }

  defaultData = {
    "about-card-section-1": {
      title: "Berufsausbildung / Beratungsausbildung:",
      Items: [
        { Item: "Systemische Beraterin (3-Jährige Weiterbildung bei Wispo Tandem)" },
        { Item: "Sozialarbeiterin B.A." },
      ],
    },
    "about-card-section-2": {
      title: "Fortbildungen",
      Items: [
        { Item: "Konflikte systemisch verstehen und bearbeiten (Eva Gehring)" },
        { Item: "Verzeihen und Versöhnen in der Paarbeziehung (Friederike von Tiedemann)" },
      ],
    },
    "about-card-section-3": {
      title: "Berufstätigkeit",
      Items: [
        { Item: "derzeit in Elternzeit, selbstständige Beraterin seit August 2023" },
        { Item: "Co-Leitung Kinderbereich und Fundraising bei Stadtpiraten Freiburg e.V." },
        { Item: "stationäre Kinder- und Jugendhilfe im SOS-Kinderdorf" },
        { Item: "Co-Leitung Freiwilligen Seminare Diakonie Baden" },
      ],
    },
    "about-card-section-4": {
      title: "Persönliches",
      Items: [
        { Item: "verheiratet" },
        { Item: "zwei Kinder" },
      ],
    },
  };
}
