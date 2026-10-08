let cards = document.querySelectorAll(".card")
let firstCard
let secondCard
let attemps = 5
let isFlippedCard = false // показывает перевернута ли уже первая карточка
let lockBoard = false // блокирует код пока две карточки несравнятся или не перевентутся
// console.log(cards)
cards.forEach(e=>e.addEventListener("click", flipCard))

function flipCard(){
    if (lockBoard == false){
        let target = event.target // target это тег img
        if (target.tagName == "DIV"){
            return
        }
        let card = target.parentElement // сам див card
        if (card == firstCard){
            return
        }
        card.classList.add("fleep")
        if (isFlippedCard == false){
            isFlippedCard = true
            firstCard = card
            console.log(firstCard)
            return
        }
        secondCard = card
        console.log(secondCard)
        if (firstCard.dataset.photo == secondCard.dataset.photo){
            console.log("правильно")
            disabelCards()
        }
        else{
            console.log("неправильно")
            anflipCards()
            attemps--
            document.querySelector(".attemps").innerHTML = attemps
            if (attemps == 0){
                document.querySelector(".time").innerHTML = 3
                setTimeout(() => {     
                    document.querySelector('.h1').classList.add("lose-hiden")
                    document.querySelector('.lose').classList.remove("lose-hiden")
                    setTimeout(() => {
                        let caunt = 2
                        document.querySelector(".time").innerHTML = caunt
                        let interval = setInterval(() => {
                            caunt--
                            document.querySelector(".time").innerHTML = caunt
                            if (caunt < 1){
                                clearInterval(interval)
                                cards.forEach(e=>e.classList.remove("fleep"))
                                reset()
                                setOrder()
                                attemps = 5
                                document.querySelector(".attemps").innerHTML = attemps
                                document.querySelector('.h1').classList.remove("lose-hiden")
                                document.querySelector('.lose').classList.add("lose-hiden")
                                cards.forEach(e=>e.addEventListener("click", flipCard))
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            }
        }
    }
}
function disabelCards(){
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)
    reset()

}

function anflipCards(){
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove("fleep")
        secondCard.classList.remove("fleep")
        reset()
    }, 1000);
}

function reset(){
    firstCard = null
    secondCard = null
    isFlippedCard = false 
    lockBoard = false
}
function setOrder(){
    cards.forEach(e=>{
        let random = Math.floor(Math.random()*12)
        console.log(random)
        e.style.order = random
    })
}
setOrder()