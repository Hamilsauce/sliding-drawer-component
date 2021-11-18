class Drawer {
  constructor() {
    this.drawer = document.querySelector('#drawer');
    this.handle = document.querySelector('.drawer-handle');

    this.init();
  }

  init() {
    this.handle.addEventListener('dblclick', this.doubleClickDrawerHandle.bind(this));
    window.addEventListener('click', e => {
      if (!e.target.classList.contains('drawer')) {
        this.drawer.style.transition = '0.6s ease-in-out';
        this.drawer.style.height = `${145}px`;
        this.drawer.dataset.expanded = 'false';
        setTimeout(() => this.drawer.style.transition = '', 600)
      }
    });
    document.addEventListener('touchstart', this.startDrag.bind(this));
  }

  isHandleEventSource(e) { return e.path.some(el => el.id === 'drawer-handle') }

  startDrag(e) {
    if (this.isHandleEventSource(e)) {
      this.handle.classList.add('pressed');
      document.addEventListener('touchmove', this.dragDrawer.bind(this), true)
      document.addEventListener('touchend', this.stopDrag.bind(this) , true)
    } else return;
  }

  stopDrag(e) {
    this.handle.classList.remove('pressed')
    document.removeEventListener('touchmove', this.dragDrawer.bind(this), true)
    document.removeEventListener('touchend', this.stopDrag.bind(this), true)
  }

  dragDrawer(e) {
    const currentHeight = parseInt(getComputedStyle(this.drawer).height)
    const maxHeight = 450;
    const appHeight = parseInt(getComputedStyle(document.body).height)
    const touch = e.changedTouches[0].pageY

    if ((touch > (appHeight - 144))) return;
    else if (touch <= (appHeight - maxHeight)) this.drawer.style.height = `${currentHeight}px`;
    else this.drawer.style.height = `${(appHeight - touch)}px`;
  }

  doubleClickDrawerHandle(e) {
    if (this.drawer.dataset.expanded === 'true') {
      this.drawer.style.height = `${145}px`;
      this.drawer.dataset.expanded = 'false';
    } else {
      this.drawer.style.height = `${425}px`;
      this.drawer.dataset.expanded = 'true';
    }
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.drawer.dispatch(new CustomEvent('draw-clicked'))
  }
}


const drawer = new Drawer();
