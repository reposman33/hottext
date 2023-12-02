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
  selector: 'app-hottext',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hottext.component.html',
  styleUrls: ['./hottext.component.scss'],
})
export class HottextComponent implements OnInit, AfterViewInit {
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
