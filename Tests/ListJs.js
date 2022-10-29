function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
    this.clear = clear;
    this.find = find;
    this.toString = toString;
    this.insert = insert;
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.length = length;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
    this.contains = contains;
}

// Append: Adding an Element to a List
function append(element) {
    this.dataStore[this.pos] = element;
    ++this.listSize;
    ++this.pos;
}

function find(element) {
    for (let i = 0; i < this.dataStore.length; i++) {
        if (this.dataStore[i] == element)  {
			return i;
		}
    }
    
    return -1;
}

function remove(element) {
    let foundAt = this.find(element);
    
    if (foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        --this.listSize;
        return true;
    }
    
    return false;
}

function length() {
    return this.listSize;
}

function toString() {
    return this.dataStore;
}

function insert(element, after) {
    let insertPos = this.find(after);
    
    if (insertPos > -1) {
        this.dataStore.splice(insertPos + 1, 0, element);
        ++this.listSize;
        return true;
    }
    
    return false;
}

function clear() {
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = this.pos = 0;
}

function front() {
    this.pos = 0;
}

function end() {
    this.pos = this.listSize - 1;
}

function prev() {
    if (this.pos > 0) --this.pos;
}

function next() {
    if (this.pos < this.listSize) ++this.pos;
}

function currPos() {
    return this.pos;
}

function moveTo(position) {
    this.pos = position;
}

function getElement() {
    return this.dataStore[this.pos];
}

function contains(element) {
    for (let i = 0; i < this.dataStore.length; i++) {
        if (element == this.dataStore[i]) return true;
    }
    
    return false;
}

// Customer Object

function Customer (name, movie) {
    this.name = name;
    this.movie = movie;
}


let movies = new List();
let customers = new List();


const input = document.querySelector('input[type="file"]');
let lines;

input.addEventListener('change', (e) => {
    console.log(input.files);

    const reader = new FileReader();
     reader.readAsText(input.files[0]);
    
    reader.onload = function () {
        lines = reader.result.split('\r\n');
        // console.log(lines);

        lines.forEach(line => {
            movies.append(line);
        })
        
        function displayList(list) {
            for (list.front(); list.currPos() < list.length(); list.next()) {
                if (list.getElement() instanceof Customer) {
                    console.log(list.getElement()['name'], list.getElement()['movie']);
                } else {
                    console.log(list.getElement());
                }
            }
        }

        function checkOut(name, movie, movies, customerList) {
            if (movies.contains(movie)) {
                var c = new Customer(name, movie);
                customerList.append(c);

                movies.remove(movie);
            } else {
                console.log(movie + ' is not available.');
            }
        }
        console.log('Available movies: \n');
        displayList(movies);

        let userName = prompt('Enter your name: ');
        let movieRequest = prompt('What Movie do you want to rent ?');

        checkOut(userName, movieRequest, movies, customers);
        console.log('Customer Details: \n');
        displayList(customers);

       
    }
})

