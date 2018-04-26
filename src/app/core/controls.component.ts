import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SelectableItem } from './selectable-item';
import { Themes } from '../themes/themes';
import { SkyViewComponent } from './sky-view.component';

@Component({
  selector: `app-sky-view-controls`,
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
  providers: [
    SkyViewComponent
  ]
})
export class ControlsComponent implements AfterViewInit {

  @ViewChild('skyViewControls')
  private skyViewControls: ElementRef;

  private isDragged: boolean;

  constructor(private skyViewComponent: SkyViewComponent) {

  }

  public availableThemes = [
    new SelectableItem(Themes.DEV, 'Dev', 'Used during development phase', true),
    new SelectableItem(Themes.SKY_CHART, 'Sky chart', 'Theme resembling standard sky charts', false)
   ];




  public drag(event: MouseEvent): void {
    if (this.isDragged) {
      const item = <HTMLElement> this.skyViewControls.nativeElement;
      const positionBefore = item.getBoundingClientRect();
      item.style.left = (positionBefore.left + event.movementX) + 'px';
      item.style.top = (positionBefore.top + event.movementY) + 'px';
    }
  }

  public setPressed(): void {
    this.isDragged = true;
  }

  public setReleased(): void {
    this.isDragged = false;
  }

  public changeTheme(selectedCode: string): void {
    this.skyViewComponent.loadTheme(selectedCode);
  }

  ngAfterViewInit() {
    const selectedTheme = this.availableThemes.filter(theme => theme.selected)[0];
    if (!selectedTheme) {
      this.changeTheme(this.availableThemes[0].code);
    } else {
      this.changeTheme(selectedTheme.code);
    }
  }

}
