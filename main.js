
const checkboxList=document.querySelectorAll('.checkbox')
const inputFields=document.querySelectorAll('.input-label')
const error=document.querySelector('.error')
const bar=document.querySelector('.bar')
const barValue=document.querySelector('.bar-value')
const barLabel=document.querySelector('.bar-label')

const allQuotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :D',
]
const allGoals=JSON.parse(localStorage.getItem('allGoals')) || {}
  

  

let goalscount=Object.values(allGoals).filter((goal)=>goal.completed).length 

     barValue.style.width=`${(goalscount / inputFields.length) * 100 }%`
 barLabel.innerText=allQuotes[goalscount]
 
          barValue.firstElementChild.innerText=`${goalscount}/${inputFields.length} completed`
            

            
            
        
            
            
            
checkboxList.forEach((checkBox)=>{
  
  checkBox.addEventListener('click',(e)=>{
           const filled=[...inputFields].every((input)=>{
             return input.value
           })
           if (filled) {
    checkBox.parentElement.classList.toggle("completed")
             
            const inputId= checkBox.nextElementSibling.id
            allGoals[inputId].completed=!allGoals[inputId].completed
           goalscount= Object.values(allGoals).filter((goal)=>goal.completed).length
           
            barValue.style.width=`${(goalscount / inputFields.length) * 100}%`
            
            barValue.firstElementChild.innerText=`${goalscount}/${inputFields.length} completed`
            
             barLabel.innerText=allQuotes[goalscount]
            localStorage.setItem('allGoals',JSON.stringify(allGoals))
            
           }
    else{
      error.style.visibility='visible'
    }
    
  })
})

inputFields.forEach((input)=>{
  if(allGoals[input.id]){
  input.value=allGoals[input.id].name

  if(allGoals[input.id].completed){
    input.parentElement.classList.add('completed')
  }
  }
  input.addEventListener('focus',()=>{
      error.style.visibility='hidden'
      
  })
  input.addEventListener('input',(e)=>{
    if(allGoals[input.id] && allGoals[input.id].completed){
      input.value=allGoals[input.id].name
      return
    }
  if(allGoals[input.id]){
    allGoals[input.id].name=input.value
  }
  else{
    allGoals[input.id]={
      name: input.value,
      completed: false,
      
    }
  }
  
  localStorage.setItem('allGoals',JSON.stringify(allGoals))
  })
  
})
