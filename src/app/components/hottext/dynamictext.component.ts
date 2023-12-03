import {
  AfterViewInit,
  Component,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * === README ===
 * Deze component maakt het mogelijk delen in een tekst te vervangen door tekst uit een popupvenster. Bijvoorbeeld: in een tekst is een wood of woorden omkaderd (zg 'hottext'). Klik op de omkaderde tekst en een popup verschijnt met een of meerdere regels tekst. Klik op een regel in de popup en de popup verdwijnt. De oorspronkelijke omkaderde tekst is vervangen door de tekst uit de popup.
 * Hoe werkt dat?
 * De tekst de vertoond wordt, wordt via transclusion (ng-content) opgenomen in de view van de component. Omdat deze tekst als HTML opgemaakt is kunnen we delen van de tekst markeren met het data attribuut: data-hottext="OpenAI". Alleen teksten met zo'n attribuut geven een popup na klik. De waarde van het data-attribuut bepaalt welke alternatieve tekst er in de popup worden vertoond.
 */
@Component({
  selector: 'dynamictext',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamictext.component.html',
  styleUrls: ['./dynamictext.component.scss'],
})
export class DynamicTextComponent implements AfterViewInit {
  @ViewChild('popupHost')
  popupHost!: any;
  popup!: any;
  popupTexts!: { [key: string]: string[] };
  // dit is het clickevent van text nodig om later te vervangen door popup text
  textClickContext: any;

  FILEPATH_TO_CLOSEBUTTON = '/assets/images/cross-close-button.png';
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.initializePopupWindowTexts();
    this.createPopUpWindow();
  }

  /**
   * @description - maak de teksten voor popup window
   */
  initializePopupWindowTexts() {
    this.popupTexts = {
      OpenAI: [
        'DeepMind',
        'Usage',
        'IBM Watson',
        'Microsoft Azure',
        'Google Cloud AI',
        'Amazon Machine Learning',
        'NVIDIA DGX',
        'Intel AI',
        'Apple Core ML',
        'H2O.ai',
        'OpenCV',
      ],
    };
  }

  /**
   * onHotWordClick
   * @description - afhandelen van een klik op een woord in de tekst
   * @param event - clickEvent
   */
  @HostListener('click', ['$event'])
  onHotWordClick(event: any) {
    // check of dit de popup triggert
    if (Object.keys(this.popupTexts).includes(event.target.dataset.hottext)) {
      // bewaar de context - later nodig bij veranderen woord met gekozen alternatief uit popup
      this.textClickContext = event;
      this.hidePopup();
      this.updatePopupTexts(event.target.dataset.hottext);
      this.showPopup({ posX: event.clientX, posY: event.clientY });
    }
  }

  /**
   * showPopup
   * @description - kliklocatie in de tekst. Gebrik om positie popup window te definieren
   * @param location
   */
  showPopup(location: { posX: number; posY: number }) {
    this.renderer.setStyle(this.popup, 'top', location.posY + 'px');
    this.renderer.setStyle(this.popup, 'left', location.posX + 'px');
    this.renderer.addClass(this.popup, 'display');
  }

  hidePopup() {
    this.renderer.removeClass(this.popup, 'display');
    this.removePopupTexts();
  }

  removePopupTexts() {
    Array.from(this.popup.childNodes).forEach((childNode: any) => {
      // alleen de 'p' nodes bevatten tekst.
      if (childNode.localName == 'p') {
        this.renderer.removeChild(this.popup, childNode);
      }
    });
  }

  createPopUpWindow() {
    // maak de popup
    this.popup = this.renderer.createElement('div');
    this.renderer.addClass(this.popup, 'popupwindow');

    // maak de topbar
    const topBar = this.renderer.createElement('div');
    this.renderer.setAttribute(topBar, 'class', 'topbar');

    // maak de closebutton
    const closeButton = this.renderer.createElement('img');
    this.renderer.setAttribute(
      closeButton,
      'src',
      this.FILEPATH_TO_CLOSEBUTTON
    );
    this.renderer.setAttribute(closeButton, 'class', 'button__close');
    this.renderer.listen(closeButton, 'click', () => this.hidePopup());

    // voegtoe de closebutton aan topbar
    this.renderer.appendChild(topBar, closeButton);

    // voegtoe de topbar aan popup
    this.renderer.appendChild(this.popup, topBar);

    // voegtoe de popup aan component view
    this.renderer.appendChild(this.popupHost.nativeElement, this.popup);
  }

  /**
   * updatePopupTexts
   * @description - update de popup met de alternatieven voor het geklikte woord in de tekst
   * @param clickedWord - het geklikte woord in de tekst
   */
  updatePopupTexts(clickedWord: string) {
    this.popupTexts[clickedWord].forEach((textAlternative) => {
      this.createPopupParagraph(textAlternative);
    });
  }

  /**
   * createPopupParagraph
   * @description - maak paragraph element voor de popup
   * @param paragraphText - de tekst die vertoond wordt in de popup paragraph
   */
  createPopupParagraph(paragraphText: string) {
    const paragraph = this.renderer.createElement('p');
    const text = this.renderer.createText(paragraphText);
    this.renderer.appendChild(paragraph, text);
    // afhandelen klik op tekst in de popup
    this.renderer.listen(paragraph, 'click', ($event) => {
      this.updateHotText($event.target.textContent);
      this.hidePopup();
    });
    this.renderer.appendChild(this.popup, paragraph);
  }

  /**
   * updateHotText
   * @description - als gebruiker klikt op alternatief in de popup moet deze woord in de tekst vervangen
   * @param textAlternative - alternatieve tekst
   */
  updateHotText(textAlternative: string) {
    const alternativeText = textAlternative;
    // wijzig het woord in de tekst voor het woord in de popup
    this.textClickContext.target.textContent = alternativeText;
  }
}
