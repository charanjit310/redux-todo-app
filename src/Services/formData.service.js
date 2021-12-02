const fnObjToFormdata = (data) => {
  // ================== Following 'data' object is for the practice ====================
  // data = {
  //   "first_name": "Rohit",
  //   "middle_name": "ssss",
  //   "last_name": "Kapoor",
  //   "email": "rohitSup@yopmail.com",
  //   "phone": "+16842121212",
  //   "mobile": "+16842121212",
  //   "weak_leaves": "2021-12-17",
  //   "office_address": [
  //     {
  //       "correspondence_addr": false,
  //       "address_line": "Testsss11111",
  //       "country": "Algeria",
  //       "province": "Batna",
  //       "city": "Testsss",
  //       "postcode": [
  //         {
  //           "postcode_correspondence_addr": 'false1111111',
  //           "postcode_address_line": "Testsss2222",
  //           "postcode_country": [
  //             {
  //               "postcode_correspondence_addr": 'eeeee',
  //               "postcode_address_line": 'false1111111',
  //             },
  //             {
  //               "postcode_correspondence_addr": 'rrrrrr',
  //               "postcode_address_line": 'false1111111',
  //             },
  //           ]
  //         },
  //         {
  //           "postcode_correspondence_addr": 'false2222222',
  //           "postcode_address_line": "Testsss2222",
  //           "postcode_country": [
  //             {
  //               "postcode_correspondence_addr": 'gggggggggg',
  //               "postcode_address_line": 'false1111111',
  //             },
  //             {
  //               "postcode_correspondence_addr": 'hhhhhhhhhh',
  //               "postcode_address_line": 'false1111111',
  //             },
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "correspondence_addr": false,
  //       "address_line": "Testsss2222",
  //       "country": "Algeria",
  //       "province": "Batna",
  //       "city": "Testsss",
  //       "postcode": "121212sss"
  //     },
  //   ],
  //   "correspondence_addressssssssss": {
  //     "address_line": "ssss",
  //     "country": "ssss",
  //     "province": "sss",
  //     "city": "sss",
  //     "postcode": "sss"
  //   },
  //   "correspondence_addressssssssss_dddddddddddddddd": {
  //     "address_line": "ssss",
  //     "country": "ssss",
  //     "province": "sss",
  //     "city": "sss",
  //     "postcode": "sss"
  //   }
  // }

  const formData = new FormData();
  function appendFormData(data, root) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === 'object' && data) {
          if (Array.isArray(data[key])) {
            for (var i = 0; i < data[key].length; i++) {
              if (root !== '') {
                appendFormData(data[key][i], root + '[' + key + '][' + i + ']');
              } else {
                appendFormData(data[key][i], key + '[' + i + ']');
              }
            }
          } else {
            appendFormData(data[key], key);
          }
        } else {
          if (root !== '') {
            formData.append(root + '[' + [key] + ']', data[key])
          } else {
            formData.append(key, data[key]);
          }
        }

        // if (data[key][0] instanceof File) {
        //   formData.append(key, data[key][0]);
        // }

      }
    }
  }
  appendFormData(data, '');
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