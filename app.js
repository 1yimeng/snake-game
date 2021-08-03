document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startButton = document.querySelector('.start')

    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2,1,0] // 2 -> head, 0 -> tail, 1 -> body
    let direction = 1
    let score = 0
    let speed = 0.7
    let intervalTime = 0
    let interval = 0

    function startGame() {
        // resets everything
        currentSnake.forEach(index => squares[index].classList.remove('snake')) //clear any snake colouring
        squares[appleIndex].classList.remove('apple') //clear apple
        clearInterval(interval) //clear movement interval, reset to original speed
        score = 0
        randomApple() //show an apple at a random place
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    function moveOutcomes() {

        //deals with snake hitting border and snake hitting self, this includes all the possibilities that we might encounter
        if (
          (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
          (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
          (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
          (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
          squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
        ) {
          alert('game over! Click Restart button to play again!')
          return clearInterval(interval) //this will clear the interval
        }
    
        const tail = currentSnake.pop() //removes last item of the array and shows it
        squares[tail].classList.remove('snake')  //removes class of snake from the TAIL, thus causing movement
        currentSnake.unshift(currentSnake[0] + direction) //add new starting position to the snake

        //deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
          squares[currentSnake[0]].classList.remove('apple') // snake eats the apple
          squares[tail].classList.add('snake') //removed, but added again due to apple
          currentSnake.push(tail)
          randomApple()
          score++
          scoreDisplay.textContent = score
          clearInterval(interval)
          intervalTime = intervalTime * speed
          interval = setInterval(moveOutcomes, intervalTime) //update speed
        }
        squares[currentSnake[0]].classList.add('snake') // movement to new position, show snake at that spot
    }

    function randomApple() {
        do {
          appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
        squares[appleIndex].classList.add('apple')
      }
    
    function control(e) {
        //assign functions to keycodes
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39) {
            direction = 1 //right arrow on keyboard, the snake will go right one
        } else if (e.keyCode === 38) {
            direction = - width // up arrow, the snake will go back ten divs, appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1 // if we press left, the snake will go left one div
        } else if (e.keyCode === 40) {
            direction = + width //if we press down, the snake head will appear in the div ten divs from where you are now
        }
    }

  document.addEventListener('keyup', control)
  startButton.addEventListener('click', startGame)


})