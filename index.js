import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase , ref ,push , onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://shopping-manager-01-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const shoppingListInDB = ref(db , 'shoppingList')


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList = document.getElementById('shopping-list')

onValue(shoppingListInDB,function(snapshot){

    if(snapshot.exists()){ 
        let elements = Object.entries(snapshot.val())
        shoppingList.innerHTML = ""  // Clear the list before adding new items.
        elements.forEach(element => {
            const id = element[0]
            const item = element[1]
            AddItemToShoppingList(item,id)
        });
    }else {
        shoppingList.innerHTML = "No items in the shopping list"  
    }

})

function remove_item(id) {
    const itemRef = ref(db, `shoppingList/${id}`);
    remove(itemRef)  // Remove item from Firebase
}
addButtonEl.addEventListener("click", function() {
    let item = inputFieldEl.value
    if (item === "") return
    push(shoppingListInDB,item)
})

inputFieldEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addButtonEl.click();  
    }
})

function AddItemToShoppingList(item,id) {
    const newItem = document.createElement('li')
    newItem.setAttribute('id', id)
    newItem.addEventListener('dblclick', function() {
        remove_item(id)
    })
    newItem.textContent = item
    shoppingList.appendChild(newItem)
    inputFieldEl.value = ""
}
