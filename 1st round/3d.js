
import { fetchImageUrls } from "./3dfetchUrl.js";

let x = 280;
let frontElement = document.querySelector(".cube-1 .front");
let backElement = document.querySelector(".cube-1 .back");
let leftElement = document.querySelector(".cube-1 .left"); 
let a=[]

console.log("image");
fetchImageUrls()
  .then((arr) => {

    getData(arr)

    console.log("Array in image.js", arr);
    console.log("Array in image.js", arr.length);


  })
  .catch((error) => {
    console.error(error);
  });


async function getData(data) {
  a = await data;

  

let obj={}

  for (let img of a) {
    
    if (img.indexOf("F1") !== -1) {
      obj.f1 = img;


    }
    
    if (img.indexOf("F2") !== -1) {
      obj.f2 = img;


}

if (img.indexOf("F3") !== -1) {
  obj.f3 = img;


}

if (img.indexOf("F4") !== -1) {
  obj.f4 = img;


}



  }



  
  console.log("len", obj);
  
  if ("f1" in obj) {
    
    frontElement.style.backgroundImage = `url("${obj.f1}")`;
    backElement.style.backgroundImage = `url("${obj.f2}")`;
    leftElement.style.backgroundImage = `url("${obj.f3}")`;


  }
 
 
  return obj;
}


console.log("aa",a);
const rotate = () => {
  const cubes = document.querySelectorAll(".cube");

  Array.from(cubes).forEach(
    (cube) => (cube.style.transform = `rotateY(${x}deg)`)
  );
};

function rearView() {
  
  fetchImageUrls()
  .then((arr) => {

    getData(arr)
      .then(data => {


        
    frontElement.style.backgroundImage = `url("${data.f2}")`;
    backElement.style.backgroundImage = `url("${data.f1}")`;
        leftElement.style.backgroundImage = `url("${data.f3}")`;  
        
        x += 360;
        rotate();
      }
        
    
        
        )


  


  })
  .catch((error) => {
    console.error(error);
  });

  
  
}

function frontView() {

  fetchImageUrls()
  .then((arr) => {

    getData(arr)
      .then(data => {


        
    frontElement.style.backgroundImage = `url("${data.f1}")`;
    backElement.style.backgroundImage = `url("${data.f2}")`;
        leftElement.style.backgroundImage = `url("${data.f4}")`;  
        
        x -= 360;
        rotate();
      }
        
    
        
        )


  


  })
  .catch((error) => {
    console.error(error);
  });
 
 
  frontElement.style.backgroundImage = `url("images/slide-img-left-1.jpg")`;
  backElement.style.backgroundImage = `url("images/slide-img-right-2.jpg")`;
  leftElement.style.backgroundImage = `url("images/slide-img-front-4.jpg")`;
  console.log("frontElement", frontElement.style.backgroundImage);
  x -= 360;
  rotate();
}

document.querySelector(".left-arrow").addEventListener("mouseover", () => {
  x += 25;
  rotate();
});

document.querySelector(".left-arrow").addEventListener("mouseout", () => {
  x -= 25;
  rotate();
});

document.querySelector(".rear-view").addEventListener("click", () => {
  rearView();
});
document.querySelector(".front-view").addEventListener("click", () => {
  frontView();
});

document.querySelector(".right-arrow").addEventListener("mouseover", () => {
  x -= 25;
  rotate();
});

document.querySelector(".right-arrow").addEventListener("mouseout", () => {
  x += 25;
  rotate();
});
