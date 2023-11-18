import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-7488d-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const fromText = document.getElementById("from-text")
const toText = document.getElementById("to-text")
const endorsementText = document.getElementById("endorsement-textarea")
const publishBtn = document.getElementById("publish-btn")
const divEndorsement = document.getElementById("div-endorsement")

publishBtn.addEventListener("click", function() {
    if(fromText.value && toText.value && endorsementText.value) {
        
        let endorsement = {
            "from" : fromText.value,
            "to" : toText.value,
            "text" : endorsementText.value,
        }

        push(endorsementsInDB, endorsement)
    }
})

onValue(endorsementsInDB, function(snapshot) {
    let endorsementArray = Object.values(snapshot.val())

    clearEndorsements()
    
    for (let i = 0; i < endorsementArray.length; i++) {
        let currentEndorsement = endorsementArray[i]
        appendEndorsement(currentEndorsement)
    }
})


function appendEndorsement(endorsement) {
    divEndorsement.innerHTML += `<p><b>To ${endorsement.to}</b><br><br>${endorsement.text}<br><br><b>From ${endorsement.from}</b></p>`
}

function clearEndorsements() {
    divEndorsement.innerHTML = ""
}