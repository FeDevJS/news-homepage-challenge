import './index.css'

let mobileNavInserted = false
let desktopNavInserted = false

const insertMobileNav = () => {
  const $nav_wrapper = document.querySelector('.nav-wrapper')
  const $mobile_nav = document.querySelector('#mobile-nav-template').content.cloneNode(true)
  $nav_wrapper.appendChild($mobile_nav)
  mobileNavInserted = true
  if(desktopNavInserted) desktopNavInserted = false
}

const insertDesktopNav = () => {
  const $nav_wrapper = document.querySelector('.nav-wrapper')
  const $desktop_nav = document.querySelector('#desktop-nav-template').content.cloneNode(true)
  $nav_wrapper.appendChild($desktop_nav)
  desktopNavInserted = true
  if(mobileNavInserted) mobileNavInserted = false
}

const insertMobileNavModal = () => {
  const $mobileNavModal = document.querySelector('#mobile-nav-modal-template').content.cloneNode(true)
  document.body.appendChild($mobileNavModal)
  return
}

const removeMobileNavModal = () => {
  const $mobileNavModal = document.querySelector('.mobile-nav-modal')
  $mobileNavModal.remove()
  return
}

const useMobileNav = () => {
  if(desktopNavInserted) {
    const $desktopNavMenuContainer = document.querySelector('.nav-items-container')
    $desktopNavMenuContainer.remove()
  }
  insertMobileNav()
  return
}

const useDesktopNav = () => {
  if(document.querySelector('.mobile-nav-menu-icon')) {
    const $mobileNavMenu = document.querySelector('.mobile-nav-menu-icon')
    $mobileNavMenu.remove()
  }
  insertDesktopNav()
  return
}

const detectWidth = () => {
  let mobileWidth = window.innerWidth >= 300 && window.innerWidth < 700 && !mobileNavInserted
  let desktopWidth = window.innerWidth >= 700 && !desktopNavInserted
  if(mobileWidth) {
    useMobileNav()
    return
  } 
  else if(desktopWidth) {
    useDesktopNav()
    return
  }
}

window.addEventListener('DOMContentLoaded', () => {
  let mobileWidth = window.innerWidth >= 300 && window.innerWidth < 700
  let desktopWidth = window.innerWidth >= 700
  if(mobileWidth) {
    insertMobileNav()
  }
  else if(desktopWidth) {
    insertDesktopNav()
  }
  document.addEventListener('click', (e) => {
    const target = e.target
    if(target.matches('.mobile-nav-menu-icon')) {
      insertMobileNavModal()
    } 
    else if(target.matches('.close-btn')) {
      removeMobileNavModal()
    }
  })
  window.addEventListener('resize', () => {
    detectWidth()
  })
})
