document.addEventListener('DOMContentLoaded', function(){
    var closeButtons = document.getElementsByClassName('close');
    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', closeDialog);
    }
    document.getElementById('card-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    submit();
    });
});


function openDialog() {
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'block'; 
    dialog.classList.add('jump'); 
}


document.getElementsByClassName('close')  
function closeDialog() {
    const dialog = document.getElementById('dialog');
   if(dialog){
    dialog.style.display = 'none'; 
    dialog.classList.remove('jump'); 
   }
}


function submit(){
    const playerName = document.getElementById('player-name').value;
    const numCards = document.getElementById('num-cards').value;
    localStorage.setItem('playerName', playerName);
    localStorage.setItem('numCards', numCards);
    window.location.href = 'playpage.html';
}

