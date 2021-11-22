export class Drawer {
  constructor(parentSelector = '#app') {
    this.drawer = document.querySelector('#drawer-template').content.firstElementChild.cloneNode(true) || document.createElement('div')
    this.handle = this.drawer.querySelector('.drawer-handle');
    console.log('this.drawer.tagName', this.drawer.tagName)
    this.init(parentSelector);

  }

  init(parentSelector) {
    document.querySelector(parentSelector).appendChild(this.drawer)
    this.handle.addEventListener('dblclick', this.doubleClickDrawerHandle.bind(this));
    document.addEventListener('click', e => {
      // console.log('this.testEventPath(e, this.drawer, this.handle)', this.testEventPath(e, this.drawer, this.handle))
      // console.log('e.target.classList.contains(frawer)) {', !e.target.classList.contains('drawer'))
      if (
        !e.target.classList.contains('drawer')
      ) {
        this.drawer.style.transition = '0.6s ease-in-out';
        this.drawer.style.height = `${120}px`;
        this.drawer.dataset.expanded = 'false';
        setTimeout(() => this.drawer.style.transition = '', 600)
      }
    });
    this.handle.addEventListener('touchstart', this.startDrag.bind(this));
    // document.addEventListener('touchstart', this.startDrag.bind(this));
  }

  isHandleEventSource(e) { return e.path.some(el => el.id === 'drawer-handle') }

  testEventPath(e, ...elements) {
    console.log('[path, elements]', [e.composedPath(), elements])
    return e.composedPath().reduce((matched, eventEl, i) => {
      console.log('matched, eventEl, elements', [matched, eventEl, elements]);
      return elements.some(el => el == eventEl)
    }, false);
  }

  startDrag(e) {
    if (this.isHandleEventSource(e)) {
      this.handle.classList.add('pressed');
      this.handle.addEventListener('touchmove', this.dragDrawer.bind(this), true)
      this.handle.addEventListener('touchend', this.stopDrag.bind(this), true)
      e.preventDefault();
    } else return;
  }

  stopDrag(e) {
    this.handle.classList.remove('pressed')
    this.drawer.removeEventListener('touchmove', this.dragDrawer.bind(this), true)
    this.drawer.removeEventListener('touchend', this.stopDrag.bind(this), true)
  }

  dragDrawer(e) {
    const currentHeight = parseInt(getComputedStyle(this.drawer).height)
    const maxHeight = 450;
    const appHeight = parseInt(getComputedStyle(document.body).height)
    const touch = e.changedTouches[0].pageY

    if ((touch > (appHeight - 100))) return;
    else if (touch <= (appHeight - maxHeight)) this.drawer.style.height = `${currentHeight}px`;
    else this.drawer.style.height = `${(appHeight - touch)}px`;
  }

  doubleClickDrawerHandle(e) {
    if (this.drawer.dataset.expanded === 'true') {
      this.drawer.style.height = `${100}px`;
      this.drawer.dataset.expanded = 'false';
    } else {
      this.drawer.style.height = `${425}px`;
      this.drawer.dataset.expanded = 'true';
    }
  }

  handleClick(e) {
    this.drawer.dispatch(new CustomEvent('draw-clicked'))
  }
}


// const drawer = new Drawer();

{ Drawer }