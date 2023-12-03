import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dynamictext',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamictext.component.html',
  styleUrls: ['./dynamictext.component.scss'],
})
export class DynamicTextComponent implements AfterViewInit {
  @ViewChild('elementHost')
  elementHost!: any;
  popup!: any;
  dynamicTextAlternatives!: { [key: string]: string[] };

  @HostBinding('attr.class') cssClass!: string;

  FILEPATH_TO_CLOSEBUTTON = '/assets/images/cross-close-button.png';
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.initializePopupWindowTexts();
    this.createPopUpWindow();
  }

  initializePopupWindowTexts() {
    this.dynamicTextAlternatives = {
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

  @HostListener('click', ['$event'])
  onHotWordClick(event: any) {
    if (
      Object.keys(this.dynamicTextAlternatives).includes(
        event.target.dataset.hottext
      )
    ) {
      this.hidePopup();
      this.updatePopupText(event.target.dataset.hottext);
      this.showPopup({ posX: event.clientX, posY: event.clientY });
    }
  }

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
    console.log(this.popup);
    Array.from(this.popup.childNodes).forEach((childNode: any) => {
      // alleen de 'p' nodes verwijderen, niet de topbar
      if (childNode.localName == 'p') {
        this.renderer.removeChild(this.popup, childNode);
      }
    });
  }

  createPopUpWindow() {
    // maak popup
    this.popup = this.renderer.createElement('div');
    this.renderer.addClass(this.popup, 'popupwindow');

    // maak topbar
    const topBar = this.renderer.createElement('div');
    this.renderer.setAttribute(topBar, 'class', 'topbar');

    // maak closebutton
    const closeButton = this.renderer.createElement('img');
    this.renderer.setAttribute(
      closeButton,
      'src',
      this.FILEPATH_TO_CLOSEBUTTON
    );
    this.renderer.setAttribute(closeButton, 'class', 'button__close');
    this.renderer.listen(closeButton, 'click', () => this.hidePopup());

    // voegtoe closebutton aan topbar
    this.renderer.appendChild(topBar, closeButton);

    // voegtoe topbar aan popup
    this.renderer.appendChild(this.popup, topBar);

    // voegtoe popup aan component view
    this.renderer.appendChild(this.elementHost.nativeElement, this.popup);
  }

  updatePopupText(clickedWord: string) {
    this.dynamicTextAlternatives[clickedWord].forEach((textAlternative) => {
      const paragraph = this.renderer.createElement('p');
      const text = this.renderer.createText(textAlternative);
      this.renderer.appendChild(paragraph, text);
      this.renderer.appendChild(this.popup, paragraph);
    });
  }
}
