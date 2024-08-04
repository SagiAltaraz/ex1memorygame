function openDialog() {
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'block'; 
    dialog.classList.add('jump'); 
}


function closeDialog() {
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'none'; 
    dialog.classList.remove('jump'); 
}

document.getElementById('open-dialog').addEventListener('click', openDialog);

document.getElementById('close-dialog').addEventListener('click', closeDialog);

document.getElementById('card-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const numCards = parseInt(document.getElementById('num-cards').value, 10);
 
    if (numCards % 2 !== 0) {
        alert('The number of cards must be a multiple of 2.');
        return; 
    }
    alert(`You selected ${numCards} cards.`);
    closeDialog();
});


localStorage