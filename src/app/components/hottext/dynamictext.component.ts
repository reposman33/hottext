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
    Array.from(this.popup.childNodes).forEach((childNode) =>
      this.renderer.removeChild(this.popup, childNode)
    );
  }

  createPopUpWindow() {
    this.popup = this.renderer.createElement('div');
    this.renderer.addClass(this.popup, 'popupwindow');
    this.renderer.listen(this.popup, 'click', () => this.hidePopup());
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
