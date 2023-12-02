import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dynamictext',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamictext.component.html',
  styleUrls: ['./dynamictext.component.scss'],
})
export class DynamicTextComponent implements OnInit, AfterViewInit {
  @HostBinding('attr.class') cssClass!: string;
  public hottext: string = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'textContainer');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.hottext = this.elementRef.nativeElement.textContent;
      this.elementRef.nativeElement.innerHTML = this.hottext;
    }, 0);
  }

  @HostListener('click', ['$event'])
  showPopup(event: any) {
    console.log(
      event.target.dataset.hottext == ''
        ? 'U clicked op een hot woord'
        : 'Geen hot woord...'
    );
    // e.srcElement.innerHTML =
    //   e.srcElement.innerHTML == 'World' ? 'Marc' : 'World';
  }
}
