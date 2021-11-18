const drawer = document.querySelector('.drawer')
const expandMenu = (yPos) => {
  drawer.style.height = yPos
}


let startY;
const endTouch = (e) => {
  const swipeMin = Math.round(parseInt(getComputedStyle(menu).height.replace('px', '')) * 0.1)
  const finishingTouch = e.changedTouches[0].clientY

  if (startY < (finishingTouch - swipeMin)) {
    expandMenu(finishingTouch)
  } else if (startY > (finishingTouch + swipeMin)) {}
}

let shadowLength = 10;

const moveTouch = (e) => {
  const et = e.touches[0].clientY
  if (startY - (et + 50) < 0) drawer.classList.remove('expand')
  else drawer.classList.add('expand')

  const progressY = startY + e.touches[0].clientY
  const targ = e.currentTarget;
  targ.top = progressY
  targ.height = '500px';
  shadowLength = shadowLength + 1
}

const startTouch = (e) => {
  const { touches } = e
  const drawerStartHeight = parseInt(getComputedStyle(menu).height);
  if (touches && touches.length === 1) {
    const touch = touches[0]
    startY = touch.clientY
    drawer.addEventListener('touchmove', moveTouch)
    drawer.addEventListener('touchend', endTouch)
  }
}


const addSwipeAction = (el, dir, swipeFunc) => {}
document.querySelector('.drawer').addEventListener('touchstart', e => {})