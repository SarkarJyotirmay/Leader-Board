let leaderBoard = [];
let playerContainer = document.querySelector(".player-container") 
let form = document.querySelector("form")
let formElements = Array.from(document.forms[0].elements);


form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const player  = {
        fname : formElements[0].value,
        lname : formElements[1].value, 
        country : formElements[2].value,
        score : formElements[3].value,
        id : leaderBoard.length,
    }

    leaderBoard.push(player);
// clearing the leader board
    clearForm();
    formElements[0].focus();
    // sorting the leader board
    sortLeaderBoard();
    // display on the dom
    displayLeaderBoard();
    
})

function clearForm(){
    formElements.forEach((elm)=>{
        elm.value = "";
        
    })
}

function sortLeaderBoard(){
    leaderBoard.sort((a,b)=>{
return b.score - a.score;
    })
}

function displayLeaderBoard(){
    playerContainer.innerHTML = "";
    let fragment = document.createDocumentFragment();

    leaderBoard.forEach((player)=>{
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player-div")

        const playerName = document.createElement("p");
        playerName.innerText = `${player.fname} ${player.lname} ${new Date().toLocaleString()}` 

        const country = document.createElement("p");
        country.innerText = player.country;

        const score = document.createElement("p");
        score.innerText = player.score;

        const actions = document.createElement("p");
        actions.classList.add("actions")
        const plus5 = document.createElement("span");
        plus5.innerText = "+5";
        const minus5 = document.createElement("span");
        minus5.innerText = "-5"
        const del = document.createElement("span");
        del.classList.add("fa-solid", "fa-trash")

        
        actions.append(plus5, minus5, del)

        plus5.addEventListener("click",()=> modifyData(player.id, "+"))
        minus5.addEventListener("click",()=> modifyData(player.id, "-"))
        del.addEventListener("click",()=> deleteData(player.id));

        playerDiv.append(playerName, country, score, actions)
        fragment.append(playerDiv);

    })
    playerContainer.append(fragment);
}

function modifyData(objectId, sign){
    if(sign === "+"){
         leaderBoard.forEach((player)=>{
            if(player.id === objectId){
               player.score =  Number(player.score) +5;
            }
        })
    }
    else{
         leaderBoard.forEach((player)=>{
            if(objectId === player.id){
              player.score =  Number(player.score) - 5
            }
        })
    }
    sortLeaderBoard();
    displayLeaderBoard();
}

function deleteData(objectId){
    leaderBoard= leaderBoard.filter((player)=>{
        return (player.id != objectId);
    })
    displayLeaderBoard();
}



