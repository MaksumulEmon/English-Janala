const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return (htmlElements.join(" "));
}


// Speach -----------

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spainner').classList.remove("hidden");
        document.getElementById('word-container').classList.add("hidden");
    } else {
        document.getElementById('word-container').classList.remove("hidden");
        document.getElementById('spainner').classList.add("hidden");
    }
}



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

    manageSpinner(true);
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


const loadwordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
    <div class="">
                    <h2 class="text-2xl font-bold">
                        ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
                    </h2>
                </div>

                <div class="">
                    <h2 class=" font-bold">Meaning </h2>
                    <p>${word.meaning}</p>
                </div>

                <div class="">
                    <h2 class=" font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>

                <div class="">
                    <h2 class=" font-bold">সমার্থক শব্দ গুলো</h2>
                
                    
                <div class="">${createElements(word.synonyms)} </div>

                </div>
    `;
    document.getElementById('word_modal').showModal();
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
        manageSpinner(false)
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
            <button onclick ="loadwordDetail(${word.id})" class="btn bg-[#1A91FF40] rounded-lg hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
            <button onclick="pronounceWord('${word.word}')" class="btn  bg-[#1A91FF40] rounded-lg hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
           </div>
        </div>
        `;
        wordContainer.append(card)
    });

    manageSpinner(false);
};




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


// Search

document.getElementById('btn-search').addEventListener("click", () => {
    removeActive();
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            console.log(allWords)
            const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue)
            );

            // console.log(filterWords);
            displayLevelWord(filterWords);
        });



})
