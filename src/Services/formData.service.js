const fnObjToFormdata = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key][0] instanceof File) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
  }

  // for (let [key, value] of formData) { // log FormData 
  //   console.log(`${key}: ${value}`)
  // }

  return formData;
}

export const objToFormdata = {
  fnObjToFormdata,
}


// var formData = new FormData();
// function objectToFormData(obj, rootName) {
//   function appendFormData(data, root) {
//     root = root || '';
//     if (data instanceof File) {
//       formData.append(root, data);
//     } else if (Array.isArray(data)) {
//       for (var i = 0; i < data.length; i++) {
//         appendFormData(data[i], root + '[' + i + ']');
//       }
//     } else if (typeof data === 'object' && data) {
//       for (var key in data) {
//         if (data.hasOwnProperty(key)) {
//           if (root === '') {
//             appendFormData(data[key], key);
//           } else {
//             appendFormData(data[key], root + '[' + key + ']');
//           }
//         }
//       }
//     } else {
//       if (data !== null && typeof data !== 'undefined') {
//         formData.append(root, data);
//       }
//     }
//   }
//   appendFormData(obj, rootName);

//   return formData;
// }

// const registration = objectToFormData(payload.registration, 'registration');