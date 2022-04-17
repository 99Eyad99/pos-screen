
// ----------------------------------items-----------------------------------------
items = [
    { item_id: 111, item_name: 'Chesse cake', item_price: 8, item_path: 'images/img-1.JPG', quantity: 1 },
    { item_id: 222, item_name: 'Croissant ', item_price: 2, item_path: 'images/img-2.JPG', quantity: 1 },
    { item_id: 333, item_name: 'Chocolate cake', item_price: 8.5, item_path: 'images/img-3.JPG', quantity: 1 },
    { item_id: 444, item_name: 'Black coffee', item_price: 3.5, item_path: 'images/img-4.JPG', quantity: 1 },
    { item_id: 555, item_name: 'Spanish latte', item_price: 4, item_path: 'images/img-5.JPG', quantity: 1 },
    { item_id: 666, item_name: 'Milk coffee', item_price: 5, item_path: 'images/img-6.JPG', quantity: 1 },
    { item_id: 777, item_name: 'Mocca', item_price: 5, item_path: 'images/img-7.JPG', quantity: 1 },
    { item_id: 888, item_name: 'Espresso', item_price: 6, item_path: 'images/img-8.JPG', quantity: 1 },
]

let orderList = [];
let grandTotal = 0;


function display_items(targetID, list) {

    list.map(e => {
        let temp = '<div class="col-lg-4 col-md-4 col-sm-6">\
                        <div class="card" id="'+ e.item_id + '" onclick="addToOrderList(this.id)">\
                            <img src="'+ e.item_path + '" class="card-img-top img-thumbnail" alt="...">\
                            <div class="card-body">\
                                <strong>'+ e.item_name + '</strong>\
                                <br>\
                                <span>'+ e.item_price + ' $</span>\
                            </div>\
                        </div>\
                    </div >';

        $('#' + targetID).append(temp);
    });


}

display_items('itemsDisplay', items);

// --------------------------------------------------------------------------------------------

function addToTable(orderList) {

    $("#pendingDisplay").html('');

    orderList.map(data => {

        let increaseBtn = '<button class="quantityBtn preventOutline" onclick="increase(' + data.item_id + ')"><i class="fas fa-solid fa-plus"></i></button>';
        let decreaseBtn = '<button class="quantityBtn preventOutline" onclick="decrease(' + data.item_id + ')" ><i class="fas fa-solid fa-minus"></i></button>';
        let deleteBtn = '<button class="deleteBtn preventOutline" onclick="remove(' + data.item_id + ')"><i class="fas fa-times"></i></button>';

        let temp = '<tr>\
                    <td>'+ data.item_name + '</td>\
                    <td>'+ data.item_price + '</td>\
                    <td>'+ increaseBtn + data.quantity + decreaseBtn + '</td>\
                    <td>'+ data.sub_total + '</td>\
                    <td>'+ deleteBtn + '</td>\
                </tr>';

        $("#pendingDisplay").append(temp);

    })

};



function addToOrderList(ID) {

    let subTotal = 0;
    let data = '';

    items.map(e => {
        if (e.item_id == ID) {
            data = e;
            e.quantity = 1;
            data.sub_total = calc_subTotal(data);

            if (orderList.length == 0) {

                orderList.push(data);
                add_alert(data.item_name);
                grandTotal = 0;
                calc_grandTotal(data.sub_total);
            } else {
                checkOrderList(data);
            }

            addToTable(orderList);
        }
    });

    console.log(orderList);

};

function calc_subTotal(data) {
    return data.quantity * data.item_price;
}

function checkOrderList(data) {

    let exist = false;
    orderList.forEach(e => {
        if (e.item_id == data.item_id) {
            e = data;
            exist = true;
        }
    });

    if (exist == false) {
        orderList.push(data);
        add_alert(data.item_name);
    }

    grandTotal = 0;
    re_calc_grandTotal(orderList);

}

function increase(ID) {
    grandTotal = 0;
    orderList.forEach(e => {
        if (e.item_id == ID) {
            e.quantity++;
            e.sub_total = e.quantity * e.item_price;
        }
        calc_grandTotal(e.sub_total);
    });

    // for updating table
    addToTable(orderList);
}

function decrease(ID) {
    grandTotal = 0;
    orderList.forEach(e => {
        if (e.item_id == ID) {
            if (e.quantity > 1) {
                e.quantity--;
                e.sub_total = e.quantity * e.item_price;
            }
        }

    });


    // for updating table
    addToTable(orderList);
}

function remove(ID) {

    let arr = orderList.filter(e => {
        return e.item_id != ID;
    })

    orderList = arr;
    grandTotal = 0;
    re_calc_grandTotal(orderList);
    // for updating table
    addToTable(orderList);
}

// make grandTotal = 0 before use it
function calc_grandTotal(sub_total) {
    grandTotal += sub_total;
    $('#grand-total').html(grandTotal);
}

// make grandTotal = 0 before use it
function re_calc_grandTotal(orderList) {
    orderList.map(e => {
        grandTotal += e.sub_total;
    });
    $('#grand-total').html(grandTotal);
}


function item_search(value) {

    $('#itemsDisplay').html('');

    let filltered_data = items.filter(e => {
        return e.item_name.includes(value);
    })

    display_items('itemsDisplay', filltered_data);
    console.log(filltered_data);

}

function cancel() {
    orderList = [];
    grandTotal = 0;

    $('#grand-total').html(grandTotal);
    $("#pendingDisplay").html('');

}


function checkout() {


    let table = '<div class="items-table" id="invoice" style="display:none;">\
                    <h5 class="text-center">invoice</h5>\
                    <div class="scrollArea scroll" >\
                        <table class="table">\
                            <thead>\
                                <tr>\
                                    <th>Product</th>\
                                    <th>Price</th>\
                                    <th>Quantity</th>\
                                    <th>Sub Total</th>\
                                </tr>\
                            </thead>\
                            <tbody id="displayItemsInvoice"></tbody>\
                        </table>\
                    </div>\
                    <span>Total : '+grandTotal+'$</span>\
                </div >';

    $('body').append(table);

    orderList.map(e => {
        
        let temp = '<tr>\
                    <td>'+ e.item_name + '</td>\
                    <td>'+ e.item_price + '</td>\
                    <td>'+e.quantity+'</td>\
                    <td>'+ e.sub_total + '</td>\
                </tr>';

        $('#displayItemsInvoice').append(temp);
    })


    var specialElementHandlers = {
        '#editor': function (element, renderer) {
        return true;
        }
    };


    var doc = new jsPDF('portrait', 'pt', 'a4');

    doc.fromHTML($("#invoice").html(), 15, 15, {
        'width': 400,
        'tableWidth': 'auto',
        'elementHandlers': specialElementHandlers
    });


    doc.save('invoice.pdf');

}

function add_alert(name) {

    let msg = '<strong>' + name + '</strong> has been added to order list';
    const temp = '<div class="alert alert-success adding_alert" id="adding_alert" role="alert">' + msg + '</div>';
    $('body').append(temp);

    setTimeout(function () {
        $('#adding_alert').remove();
    }, 2500);


}



