class Calculator{
	constructor(oldValueandTextElement, newValueandTextElement){
		this.oldValueandTextElement = oldValueandTextElement
		this.newValueandTextElement= newValueandTextElement
		this.clear()
	}

	clear(){
		this.newValue = ''
		this.oldValue = ''
		this.operation = undefined

	}

	delete(){
		this.newValue = this.newValue.toString().slice(0, -1)
 
	}

	appendNum(number){
		if(number==='.' && this.newValue.includes('.')) return
		this.newValue = this.newValue.toString() + number.toString()

	}

	selectOpr(operation){
		if(this.newValue ==='') return
		if(this.oldValue !== ''){
			this.compute()
		}
		this.operation =operation
		this.oldValue = this.newValue
		this.newValue= ''

	}

	compute(){

		let computation
		const old = parseFloat(this.oldValue)
		const newV = parseFloat(this.newValue)
		if(isNaN(old) || isNaN(newV)) return

		switch(this.operation){

			case '+':
			   computation = old + newV
			   break
			case '/':
			   computation = old / newV
			   break
			case '-':
			   computation = old - newV
			   break
			case '*':
			   computation = old * newV
			   break 

			default: 
			    return          
		}	

      this.newValue = computation
      this.operation = undefined
      this.oldValue = ''

	}

	getDisplayNum(number){
		const stringNum= number.toString()
		const intDigs = parseFloat(stringNum.split('.')[0])
		const decDigs =stringNum.split('.')[1]
		let intDisplay
		if (isNaN(intDigs)) {

			intDisplay = ''

		}
		else{
			intDisplay = intDigs.toLocaleString('en',{
				maximumFracDigit: 0})
		}

		if (decDigs != null) {

			return `${intDisplay}.${decDigs}`
		}

		else{

			return intDisplay
		}
		const floatNum = parseFloat(number)
		if (isNaN(floatNum)) return ''

		return floatNum.toLocaleString('en')
	}

	updatedisplay(){
		this.newValueandTextElement.innerText = this.getDisplayNum(this.newValue)
		if (this.operation!=null) {
			this.oldValueandTextElement.innerText = `${this.getDisplayNum(this.oldValue)} ${this.operation}`

		}
		

	}
}



const numBtns = document.querySelectorAll('[numeric-num]')
const numOpr = document.querySelectorAll('[numeric-operation]')
const equalsOpr = document.querySelector('[equals-operator]')
const autoClear = document.querySelector('[auto-clear]')
const deleteNum = document.querySelector('[delete-num]')
const oldValueandTextElement = document.querySelector('[old-value]')
const newValueandTextElement = document.querySelector('[new-value]')

const calculator = new Calculator(oldValueandTextElement, newValueandTextElement)


numBtns.forEach(button => {

	button.addEventListener('click',() => {
		calculator.appendNum(button.innerText)
		calculator.updatedisplay()
	})
})


numOpr.forEach(button => {

	button.addEventListener('click',() => {
		calculator.selectOpr(button.innerText)
		calculator.updatedisplay()
	})
})

equalsOpr.addEventListener('click',button => {
	calculator.compute()
	calculator.updatedisplay()
})

autoClear.addEventListener('click',button =>{

	calculator.clear()
	calculator.updatedisplay()
})

deleteNum.addEventListener('click',button =>{

	calculator.delete()
	calculator.updatedisplay()
})
