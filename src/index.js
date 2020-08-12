const imgURL="https://dog.ceo/api/breeds/image/random/4"
const breedURL='https://dog.ceo/api/breeds/list/all'

/*   click DropDownBox to FILTER    */
function addFilterListener(){
  const dropDown = document.querySelector('select')
  dropDown.addEventListener('change',function(event){
  //console.log('changed',event.target.value)  //在inspect里点击去检查是否可以得到response,这里event.target.value指选项里的字母
    const filterLetter = event.target.value
    const ul = document.querySelector('ul')
    ul.innerHTML=''
    fetch(breedURL)
    .then(resp=> resp.json())
    .then(breedsData => { 
      const breedsObj = breedsData.message
      const filteredbreedsObj = {}
      for (breed in breedsObj){
        if (breed[0] === filterLetter){
          filteredbreedsObj[breed]=breedsObj[breed]
          }
        }
        renderBreeds(filteredbreedsObj)
       // console.log(filteredbreedsObj)//console里只显示选中字母开头的breedObj
    })
  })
}


/*   Click to change color   */
function addClickListener(){ 
  const ul = document.getElementById('dog-breeds')  
  //ul.addEventListener('click',(event)=>{这俩一样
  ul.addEventListener('click',function(event){//console.log(event)这个可查点击时inspect里是否有response
    if (event.target.tagName==="LI"){
      event.target.style.color='blue'
    }
  })
}




/*   FETCH Breed Info    */
function fetchBreeds(){
fetch(breedURL)
  .then(resp => resp.json())
  //.then(breedsData =>{console.log(breedsData)//此测试会在console打出breed的Obj
  .then(breedsData => {
    const breedsObj = breedsData.message
    //console.log(breedsObj)
    renderBreeds(breedsObj)
  })
}


/*   Render BreedsObj    */
function renderBreeds(breedsObj){
  for (breed in breedsObj){
    const breedArray= breedsObj[breed]
    if (breedArray.length===0){
    const li = document.createElement('li')
    li.innerText = breed
    const ul = document.getElementById('dog-breeds')
    ul.append(li)
    }
    else{
      breedArray.forEach(function(breedArrayElement){
      const breedEverything = `${breed} - ${breedArrayElement}`
      const li = document.createElement('li')
      li.innerText = breedEverything
      const ul = document.getElementById('dog-breeds')
      ul.append(li)
      }

    )}
    //if breed key points to empty array
    //do what we did below
    //otherwise,(not empty)
    //create additional li for what's in the array
  }
}







/*   FETCH Dog Image   */
function fetchImgs(){
  fetch(imgURL)
    .then(resp => resp.json())
    //.then(imgsData => console.log(imgsData.message))此测试会在console打出四个图片链接
    .then (imgsData=>{
      const imgs=imgsData.message
      imgs.forEach(function(img){
        const imgElement = document.createElement('img')
        imgElement.src = img
        imgElement.style.height = '200px'
        imgElement.style.width= '200px'

        const imgContainer = document.getElementById('dog-image-container')
        imgContainer.append(imgElement)
    })
  })
}
//invoke
fetchImgs()
fetchBreeds()
addClickListener()
addFilterListener()