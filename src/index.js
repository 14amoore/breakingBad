import APIRequest from './characterRequest';

const order = document.querySelector('#order');

APIRequest()
  .then((response) => {
    // console.log(response);
    const badList = document.querySelector('#badList');
    const placeHolder = document.querySelector('#placeHolder');
    badList.removeChild(placeHolder);
    response.forEach((el) => {
      const charDiv = document.createElement('div');
      const pic = document.createElement('img');
      const infoDiv = document.createElement('div');
      const charName = document.createElement('h2');
      const nickname = document.createElement('h2');
      const nameSplit = el.name.split(' ');
      let lastName;
      let firstName;
      // this is done so that the characters can be sorted by last name. A few of the characters have more than two names.
      if (nameSplit.length === 3) {
        const jr = nameSplit[2];
        firstName = `${nameSplit[0]} ${jr}`;
        lastName = nameSplit[1];
      } else if (nameSplit.length === 4) {
        firstName = nameSplit[2];
        lastName = nameSplit[3];
      } else {
        [firstName, lastName] = nameSplit;
        if (lastName === undefined) {
          lastName = firstName;
        }
      }
      charDiv.className = 'character';
      charDiv.dataset.lastName = lastName;
      charDiv.dataset.firstName = firstName;
      badList.appendChild(charDiv);
      charDiv.appendChild(pic);
      pic.className = 'characterPic';
      // the API was delivering an address for a picture that was not loading. To fix this I just changed a portion of that address to one that is working.
      const imgUrl = el.img.split('.');
      if (imgUrl[0] === 'https://static') {
        imgUrl[0] = 'https://vignette';
        pic.src = imgUrl.join('.');
      } else {
        pic.src = el.img;
      }
      pic.alt = `A picture of ${el.name} played by ${el.portrayed}, in the popular dramedy Breaking Bad.`;
      charDiv.appendChild(infoDiv);
      infoDiv.appendChild(charName);
      infoDiv.appendChild(nickname);
      charName.className = 'name';
      nickname.className = 'name';
      charName.innerHTML = `Name: ${el.name}`;
      nickname.innerHTML = `AKA: ${el.nickname}`;
      const work = document.createElement('h3');
      infoDiv.appendChild(work);
      work.className = 'work';
      work.innerHTML = `Occupation: `;
      const { occupation } = el;
      // if a character has more than one occupation they are all displayed.
      if (occupation.length > 1) {
        for (let i = 0; i < occupation.length; i += 1) {
          if (i < occupation.length - 1) {
            work.innerHTML += `${occupation[i]} / `;
          } else {
            work.innerHTML += `${occupation[i]}.`;
          }
        }
      } else {
        work.innerHTML += `${occupation}.`;
      }
    });
  })
  .then(() => {
    // these functions allow for sorting of the characters, they both use the Array.sort() method.
    const people = Array.from(document.querySelectorAll('.character'));
    order.onchange = () => {
      if (order.value === 'aToZ') {
        people
          .sort(({ dataset: { lastName: a } }, { dataset: { lastName: b } }) =>
            a.localeCompare(b)
          )
          .forEach((item) => item.parentNode.appendChild(item));
      }
      if (order.value === 'zToA') {
        people
          .sort(({ dataset: { lastName: a } }, { dataset: { lastName: b } }) =>
            b.localeCompare(a)
          )
          .forEach((item) => item.parentNode.appendChild(item));
      }
    };
  });
