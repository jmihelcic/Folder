/**
 * Created by mihelcic on 08. 09. 2016.
 */

// Helpers
function requestAnimationFrameLong(callback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback)
  })
}

class Folder {
  constructor() {
    // Folder
    this.element      = document.querySelector('#folder')
    this.folderObject = this.element.querySelector('.folder-object')
    // Page
    this.page         = document.querySelector('#page')
    this.pageScale    = {
      X: 1.0,
      Y: 1.0
    }

    // State
    this.folderState     = 'OPEN'
    this.folderAnimating = false
    this.pageState       = 'OPEN'

    // Events
    this._addEventListeners = this._addEventListeners.bind(this)
    this._folderTransition  = this._folderTransition.bind(this)
    this._pageTransition    = this._pageTransition.bind(this)
    this.resize             = this.resize.bind(this)

    // Init
    this._addEventListeners()
  }

  // Private
  _addEventListeners() {

    // Calculate scale factors
    let dimensions   = this.page.getBoundingClientRect()
    this.pageScale.X = 54 / dimensions.width
    this.pageScale.Y = 38 / dimensions.height

    this.element.addEventListener('click', () => {
      // Skip when animating
      if (this.folderAnimating) {
        return
      }

      // Decide which animation to run depending on the state the folder is in
      if (this.folderState === 'OPEN') {
        this.page.style.transform = `translate3d(0,-20px,0) scale(${this.pageScale.X}, ${this.pageScale.Y})`
        this.page.classList.remove('__page-open')

        setTimeout(() => {
          this.element.classList.add('__folder-move-up')
          this.element.classList.add('__folder-closed')
        }, 100)

        //this.folderObject.addEventListener('transitionend', this._folderTransition)
      }

      else {
        if (this.folderState === 'CLOSED') {
          this.page.style.transform = `translate3d(0,40px,0) scale(${this.pageScale.X}, ${this.pageScale.Y})`
          this.element.classList.remove('__folder-move-up')
          this.element.classList.remove('__folder-closed')

          setTimeout(() => {
            this.page.style.display = 'block'
            requestAnimationFrameLong(() => {
              this.page.classList.add('__page-open')
            })
          }, 150)

          //this.folderObject.addEventListener('transitionend', this._folderTransition)
        }
      }

      this.page.addEventListener('transitionend', this._pageTransition)
      this.folderObject.addEventListener('transitionend', this._folderTransition)

    })
  }

  _folderTransition(event) {
    // Multiple transitionend events fire, as we are transitioning multiple properties
    // which also have different transition durations. Thats why we must look at the
    // class name of the transitionend event target
    let targetClassName = event.target.className
    switch (targetClassName) {

      case 'folder-front':
        if (this.folderState === 'OPEN') {
          this.folderState     = 'CLOSED'
          this.folderAnimating = false
        }

        else {
          if (this.folderState === 'CLOSED') {
            this.folderState     = 'OPEN'
            this.folderAnimating = false
          }
        }
        break;

      case 'folder-object':
        break;
    }
    //this.folderObject.removeEventListener('transitionend', this._folderTransition)
  }

  _pageTransition(event) {
    if (this.pageState === 'OPEN') {
      this.page.style.display = 'none'
      this.pageState          = 'CLOSED'
    }

    else {
      if (this.pageState === 'CLOSED') {
        this.pageState = 'OPEN'
      }
    }

    //this.page.removeEventListener('transitionend', this._pageTransition)
  }

  // Public
  resize(width, height) {
    console.log('resizing folder element', width, height)
    this.element.style.width  = width
    this.element.style.height = height
  }

}


let folder = new Folder()

// Dom event
window.addEventListener('DOMContentLoaded', () => {


})


/*
 let folderClosed = false
 let animating    = false
 window.addEventListener('DOMContentLoaded', () => {
 let page = document.querySelector('#page')
 let folder = document.querySelector('#folder')

 let dimensions = page.getBoundingClientRect()
 let scaleX = 54 / dimensions.width
 let scaleY = 38 / dimensions.height

 page.style.transform = `translate3d(0,-20px,0) scale(${scaleX}, ${scaleY})`
 folder.addEventListener('click', () => {
 if(animating)
 return

 page.addEventListener('transitionend', function end() {
 if(!folderClosed) {
 folderClosed       = true
 page.style.display = 'none'
 }
 else {
 folderClosed = false
 }
 page.removeEventListener('transitionend', end)
 })

 animating = true
 folder.classList.toggle('__folder-move')
 page.classList.toggle('__page-full')

 setTimeout(() => {
 folder.classList.toggle('__folder-closed')
 animating = false
 }, 100)
 })
 })
 */
