import { fetchImageUrls } from "./3dfetchUrl";

let x = 280;
let frontElement = document.querySelector(".cube-1 .front");
let backElement = document.querySelector(".cube-1 .back");
let leftElement = document.querySelector(".cube-1 .left");

fetchImageUrls()
  .then((arr) => {
    console.log("Array in image.js", arr);
    console.log("Array in image.js", arr.length);

    if (arr.length >= 4) {
      let _zeroDegree = `url('${arr[arr.length - 4]}')`;
      let _90Degree = `url('${arr[arr.length - 3]}')`;
      let _180Degree = `url('${arr[arr.length - 2]}')`;
      let _360Degree = `url('${arr[arr.length - 1]}')`;

      frontElement.style.backgroundImage = `url('${arr[arr.length - 1]}')`;

      backElement.style.backgroundImage = `url('${arr[arr.length - 2]}')`;
      leftElement.style.backgroundImage = `url('${arr[arr.length - 3]}')`;

      rotate();
    }
  })
  .catch((error) => {
    console.error(error);
  });

const rotate = () => {
  const cubes = document.querySelectorAll(".cube");

  Array.from(cubes).forEach(
    (cube) => (cube.style.transform = `rotateY(${x}deg)`)
  );
};

function rearView() {
  fetchImageUrls()
    .then((arr) => {
      console.log("Array in image.js", arr);

      if (arr.length >= 4) {
        let _zeroDegree = `url('${arr[arr.length - 4]}')`;
        let _90Degree = `url('${arr[arr.length - 3]}')`;
        let _180Degree = `url('${arr[arr.length - 2]}')`;
        let _360Degree = `url('${arr[arr.length - 1]}')`;

        frontElement.style.backgroundImage = _180Degree;
        backElement.style.backgroundImage = _360Degree;
        leftElement.style.backgroundImage = _90Degree;
        x += 360;
        rotate();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function frontView() {
  fetchImageUrls()
    .then((arr) => {
      console.log("Array in image.js", arr);

      if (arr.length >= 4) {
        let _zeroDegree = `url('${arr[arr.length - 4]}')`;
        let _90Degree = `url('${arr[arr.length - 3]}')`;
        let _180Degree = `url('${arr[arr.length - 2]}')`;
        let _360Degree = `url('${arr[arr.length - 1]}')`;

        frontElement.style.backgroundImage = _360Degree;
        backElement.style.backgroundImage = _180Degree;
        leftElement.style.backgroundImage = _zeroDegree;

        x += 360;
        rotate();
      }
    })
    .catch((error) => {
      console.error(error);
    });
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

// fetchImageUrls.js
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";

const storage = getStorage();
const imagesRef = ref(storage, "gs://stable-furnace-397012.appspot.com/images");

export function fetchImageUrls() {
  return new Promise((resolve, reject) => {
    let arr = [];

    // List all items (images) in the folder
    listAll(imagesRef)
      .then(function (result) {
        const promises = result.items.map((itemRef) =>
          getDownloadURL(itemRef)
            .then((url) => {
              arr.push(url);
              console.log("url", url);
            })
            .catch((error) => {
              console.error(error);
            })
        );

        // Wait for all promises to resolve
        Promise.all(promises)
          .then(() => {
            console.log("array", arr);
            resolve(arr);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
  });
}
