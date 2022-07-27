function Product(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year; 
}

function UI() {}

UI.prototype.addProduct = function(product) {
    const productList = document.getElementById('product-list');
    const row = document.createElement('div');
    row.innerHTML = `
        ${product.name}
        ${product.price}
        ${product.year}
        <a href="#" class="delete">Delete</a>
    `;
    productList.appendChild(row);
}

UI.prototype.resetForm = function () {
    document.getElementById('product-form').reset();
}

UI.prototype.showMessage = function (message, cssClass) {
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass}`;
    div.appendChild(document.createTextNode(message));
 
    const app = document.querySelector('#App');
    const form = document.querySelector('#product-form');
   
    app.insertBefore(div, form);

    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

UI.prototype.deleteProduct = function(element) {
    if(element.className === 'delete') {
        element.parentElement.remove();
    }
}

document.getElementById('product-form')
    .addEventListener('submit', function (e) {

        const name = document.getElementById('name').value,
            price = document.getElementById('price').value,
            year = document.getElementById('year').value;
        
        const product = new Product(name, price, year);

        const ui = new UI();

        if(name === '' || price === '' || year === '') {
            ui.showMessage('Please Insert data in all fields', 'danger');
        }

        ui.addProduct(product);
        ui.showMessage('Product Added Successfully', 'success');
        ui.resetForm();
        
        e.preventDefault();
    });

document.getElementById('product-list')
    .addEventListener('click', function(e) {
        const ui = new UI();
        ui.deleteProduct(e.target);
        ui.showMessage('Product Deleted Succsssfully', 'success');
        e.preventDefault();
    });
