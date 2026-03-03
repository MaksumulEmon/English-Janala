const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")    //Promise of responsive
        .then(res => res.json())  //Promise of Json data
        .then(json => displayLessons(json.data));

};


const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButton);
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    //  console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();          // remove Activites
            const clickedBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickedBtn);
            clickedBtn.classList.add('active');  //add Active Class
            displayLevelWord(data.data)
        })
}




const displayLevelWord = (words) => {
    // console.log(words);
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
      <div class="text-center col-span-full space-y-4 font-bangla"> 
       <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
        </div>   
     `;
        return;
    }


    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">

            <h2 class="font-bold text-xl">${word.word ? word.word : "শদ পাওয়া যায় নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>

           <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অথ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "Pronuction পাওয়া যায় নি"}"</div>

           <div class="flex justify-between items-center">
            <button onclick ="my_modal_5.showModal()" class="btn bg-[#1A91FF40] rounded-lg hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn  bg-[#1A91FF40] rounded-lg hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
           </div>
        </div>
        `;
        wordContainer.append(card)
    });
}




const displayLessons = (lessons) => {

    // 1.get the Container & Empty

    const leveContainer = document.getElementById('level-container');
    leveContainer.innerHTML = "";

    // 2.get into Every Lessons
    for (let lesson of lessons) {

        // 3.create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
           <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book"></i>Lesson - ${lesson.level_no}</button>
        `

        // 4.append into Containere
        leveContainer.append(btnDiv);
    }

};


loadLessons();