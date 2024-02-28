// fetchImageUrls.js
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
     







      // const firebaseConfig = {
      //   apiKey: "AIzaSyBLHohfs_z34ru0K5z5iN56Rw7vu8H2oXQ",
      //   authDomain: "stable-furnace-397012.firebaseapp.com",
      //   projectId: "stable-furnace-397012",
      //   storageBucket: "stable-furnace-397012.appspot.com",
      //   messagingSenderId: "49154990535",
      //   appId: "1:49154990535:web:d27b85a866cb7f7a9039e2",
      //   measurementId: "G-8VVYGYQRGE",
      // };

//       const firebaseConfig = {
//   apiKey: "AIzaSyDbScN5M4SHdorKjupKPX7_GJ2jS4PQ3ZI",
//   authDomain: "esp32cam-5521d.firebaseapp.com",
//   databaseURL: "https://esp32cam-5521d-default-rtdb.firebaseio.com",
//   projectId: "esp32cam-5521d",
//   storageBucket: "esp32cam-5521d.appspot.com",
//   messagingSenderId: "342485376007",
//   appId: "1:342485376007:web:c958ab1bf382065f5adea2",
//   measurementId: "G-Q69DQ6FNPQ"
// };


const firebaseConfig = {
  apiKey: "AIzaSyB88O3N6ENJrnhzq-E1gFqheHx_RQjFi_0",
  authDomain: "d-pic-9f564.firebaseapp.com",
  databaseURL: "https://d-pic-9f564-default-rtdb.firebaseio.com",
  projectId: "d-pic-9f564",
  storageBucket: "d-pic-9f564.appspot.com",
  messagingSenderId: "124504372634",
  appId: "1:124504372634:web:b1cf6f43958caf5b3fb623",
  measurementId: "G-FX3FJLLBNV"
};
      // Initialize Firebase
      const firebaseApp = initializeApp(firebaseConfig);

      // Create a reference to the storage service
const storage = getStorage(firebaseApp);
      

const imagesRef = ref(storage, '/images');

   

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
