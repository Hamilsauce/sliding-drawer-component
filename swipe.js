// import {
// 	handleRollAction
// } from '../main.js';
// import {
// 	game
// } from './Game.js';

const expandMenu = (yPos) => {
	menu.style.height = yPos

}


const menu = document.querySelector('.footer-menu')
let startY;
const endTouch = (e) => {
	const swipeMin = Math.round(parseInt(getComputedStyle(menu).height.replace('px', '')) * 0.1)
	console.log('smin', swipeMin);
	const finishingTouch = e.changedTouches[0].clientY

	if (startY < (finishingTouch - swipeMin)) {
		expandMenu(finishingTouch)
	} else if (startY > (finishingTouch + swipeMin)) {}

}

let shadowLength = 10;

const moveTouch = (e) => {
 const et = e.touches[0].clientY
 if (startY - (et + 50) < 0) {
	menu.classList.remove('expand')
 	
 } else {
	menu.classList.add('expand')
 	
 }
	const progressY = startY + e.touches[0].clientY
	const targ = e.currentTarget;
	targ.top = progressY
	targ.height = '500px';
	console.log(targ);
	console.log(targ.height);
	// const translation = progressY > 0 ?
	// 	parseInt(Math.abs(progressY)) :
	// 	parseInt(Math.abs(progressY))

	// menu.querySelectorAll('.die-item').forEach(die => {
	// 	die.style.boxShadow = `0px ${shadowLength - 8}px ${shadowLength}px 0px rgba(255, 255, 255, 0.7)`
	// })
	shadowLength = shadowLength + 1
}

const startTouch = (e) => {
	// console.log(e.currentTarget);
	const { touches } = e
	// console.log(touches);
	const menuStartHeight = parseInt(getComputedStyle(menu).height);
	// Math.round(parseInt(getComputedStyle(menu).height.replace('px', '')) * 0.1)
	// console.log('h', menuStartHeight);

	if (touches && touches.length === 1) {
		const touch = touches[0]
		startY = touch.clientY

		// menu.querySelectorAll('.die-item').forEach(die => {
		// 	die.style.boxShadow = `0px px ${5}px 0px rgba(255, 255, 255, 0.47)`
		// })
		menu.addEventListener('touchmove', moveTouch)
		menu.addEventListener('touchend', endTouch)
	}
}

// menu.addEventListener('touchstart', startTouch)

const addSwipeAction = (el, dir, swipeFunc) => {}


document.querySelector('.footer-menu')
.addEventListener('touchstart', e =>{
	
})