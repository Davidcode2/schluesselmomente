export default class ReferenceCarousel {
  _references = [];

  constructor(references) {
    this._references = references;
  }

  indexCurrentReference = 0;
  activeReferenceDisplayDisc = null;

  referenceView() {
    let referenceDisplayDiscList = document.getElementById(
      'discs-reference-display',
    );
    let referenceDisplayDiscs = [];

    this._references.forEach((el) => {
      console.log(el);
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

  addEventListenerToNavigationButton(
    button,
    forward,
    referenceDisplayDiscs,
  ) {
    button.addEventListener('click', function () {
      this._references[this.indexCurrentReference].classList.add('hidden');
      console.log(this._references[this.indexCurrentReference].classList);
      console.log(this.indexCurrentReference);

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

      this._references[this.indexCurrentReference].classList.remove('hidden');
      this.activeReferenceDisplayDisc.classList.add(
        'reference-display-disc-active',
      );
    }.bind(this));
  }
}
