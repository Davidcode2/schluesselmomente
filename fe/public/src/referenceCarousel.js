export default class ReferenceCarousel {
  _references = [
    {
      content: `Theresa hat mich mit ihrer herzlichen, zugewandten Art durch eine schwierige Zeit in meinem Leben begleitet.
                    Von Stressmanagement über Glaubenssätze, Selbstwert, Grenzen setzen und berufliche Zielsetzungen haben wir in nur wenigen Monaten viele Themen angeschaut und bewegt.
                    Theresa war dabei stets offen und flexibel, auf das, was mich aktuell beschäftigt hat, einzugehen.
                    Auf ihre lösungsorientierte, wertschätzende Herangehensweise habe ich mich immer schon
                    vorher sehr gefreut und ich konnte aus jeder Sitzung mit viel positiver Energie herausgehen...vielen Dank dafür!`, author: 'Britta'
    },
    {
      content: `Dank der Beratung habe ich nachhaltig einen neuen Blick auf mein Problem bekommen. Die
                    verschiedenen Methoden haben mir dabei geholfen, neue Ressourcen und Stärken zu entdecken, bzw.dass
                    ich bereits bekannte jetzt mehr wertschätzen kann.
                    Durch Theresas authentische und warmherzige Art habe ich mich von Anfang an wohl und verstanden
gefühlt.`, author: 'Laura B.*', changed: true
    },
    { content: `Ich empfehle Theresa in jedem Fall weiter. Sie ist offen, zugewandt und gut strukturiert.`, author: 'Thorsten M.*', changed: true},
    {
      content: `Nachdem ich beruflich eine sehr belastende Zeit hatte, bat ich um einen Termin bei Theresa. Die
                    Gesprächsführung war sehr angenehm, während der Gespräche in denen ich konkret klären wollte, ob
                    mein beruflicher Platz tatsächlich noch der passende sei, konnte sie viele Dinge bewusst machen, die
                    ich so vorher nicht im Blick hatte.Als ich dann dazu neigte, die Entscheidung zu vertagen – auch in
  der Hoffnung, dass mir die Entscheidung abgenommen wird – erkannte sie dies auch und sprach es an.
                    Insgesamt muss ich sagen, dass ich die Entscheidung bei ihr in Beratung gewesen zu sein, nicht
bereue.Ich kann sie wirklich weiter empfehlen.
  `, author: 'Christian S.'
    },
  ];

  _blub = null;
  _referencesContainer = document.getElementById('references-container');

  constructor(references) {
    this._blub = references;
    this.setReference();
  }

  indexCurrentReference = 0;
  activeReferenceDisplayDisc = null;

  referenceView() {
    let referenceDisplayDiscList = document.getElementById(
      'discs-reference-display',
    );
    let referenceDisplayDiscs = [];

    this._references.forEach((el) => {
      let disc = document.createElement('li');
      disc.classList.add('reference-display-disc-inactive');
      referenceDisplayDiscList.appendChild(disc);
      referenceDisplayDiscs.push(disc);
    });

    this.activeReferenceDisplayDisc =
      referenceDisplayDiscs[this.indexCurrentReference];

    referenceDisplayDiscs[0].classList.add('reference-display-disc-active');

    let nextReferenceButton = document.getElementById('next-reference-btn');
    let previousReferenceButton = document.getElementById(
      'previous-reference-btn',
    );

    this.addEventListenerToNavigationButton(
      nextReferenceButton,
      true,
      referenceDisplayDiscs,
    );
    this.addEventListenerToNavigationButton(
      previousReferenceButton,
      false,
      referenceDisplayDiscs,
    );
  }

  addEventListenerToNavigationButton(button, forward, referenceDisplayDiscs) {
    button.addEventListener(
      'click',
      function() {
        //this._references[this.indexCurrentReference].classList.add('hidden');

        this.activeReferenceDisplayDisc.classList.remove(
          'reference-display-disc-active',
        );
        this.activeReferenceDisplayDisc.classList.add(
          'reference-display-disc-inactive',
        );

        if (forward) {
          this.indexCurrentReference =
            (this.indexCurrentReference + 1 + this._references.length) %
            this._references.length;
        } else {
          this.indexCurrentReference =
            (this.indexCurrentReference - 1 + this._references.length) %
            this._references.length;
        }

        this.activeReferenceDisplayDisc =
          referenceDisplayDiscs[this.indexCurrentReference];

        this.setReference();

        //this._references[this.indexCurrentReference].classList.remove('hidden');
        this.activeReferenceDisplayDisc.classList.add(
          'reference-display-disc-active',
        );
      }.bind(this),
    );
  }

  setReference() {
    const referenceEl = this.renderReference(
      this._references[this.indexCurrentReference].content,
      this._references[this.indexCurrentReference].author,
    );
    this._referencesContainer.innerHTML = referenceEl.outerHTML;
  }

  renderReference(reference, author) {
    const divEl = document.createElement('div');
    divEl.classList.add("flex", "flex-col", "gap-6");
    const paragraphEl = document.createElement('p');
    paragraphEl.innerHTML = reference;
    const spanEl = document.createElement('span');
    spanEl.classList.add('text-xs', 'italic');
    spanEl.innerHTML = author;
    divEl.appendChild(paragraphEl);
    divEl.appendChild(spanEl);
    return divEl;
  }
}
