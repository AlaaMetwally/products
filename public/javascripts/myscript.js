function myFunction(id) {
    var iname = document.getElementById('name').value;
    var iprice = document.getElementById('price').value;
    var iquantity = document.getElementById('quantity').value;

    var table = document.getElementById("table");
    $.post("/add", {
        name: iname,
        price: iprice,
        quantity: iquantity
    },
        function (data, status) {
            var tdname = document.createElement('td');
            var tdprice = document.createElement('td');
            var tdquantity = document.createElement('td');

            var tdedit = document.createElement('td');
            var tddele = document.createElement('td');

            var edit = document.createElement('input');
            edit.setAttribute('type', "button")
            edit.setAttribute('value', "edit")
            edit.setAttribute('id', data._id)
            edit.setAttribute('onclick', "edit('" + data._id + "')")

            tdedit.appendChild(edit);

            var dele = document.createElement('input');
            dele.setAttribute('type', "button")
            dele.setAttribute('value', "delete")
            dele.setAttribute('id', data._id)
            dele.setAttribute('onclick', "dele('" + data._id + "')")

            tddele.appendChild(dele)

            var tr = document.createElement('tr');
            tr.setAttribute('id',data._id)
            table.appendChild(tr);

            tr.appendChild(tdname);
            tr.appendChild(tdprice);
            tr.appendChild(tdquantity);
            tr.appendChild(tdedit)
            tr.appendChild(tddele)
            tdname.innerHTML = iname;
            tdprice.innerHTML = iprice;
            tdquantity.innerHTML = iquantity;

            document.getElementById('name').value = "";
            document.getElementById('price').value = "";
            document.getElementById('quantity').value = "";
        });

}

function edit(id) {
    var name = document.getElementById(id).children[0].innerHTML;
    var price = document.getElementById(id).children[1].innerHTML;
    var quantity = document.getElementById(id).children[2].innerHTML;

    document.getElementById('name').value = name
    document.getElementById('price').value = price
    document.getElementById('quantity').value = quantity
    
    document.getElementById(id).remove();  
    document.getElementById("click").disabled = true;  
    document.getElementById("update").disabled = false; 
    document.getElementById("update").onclick = function() {Update(id);}; // for IE
}
function Update(id) {
    var iname = document.getElementById('name').value;
    var iprice = document.getElementById('price').value;
    var iquantity = document.getElementById('quantity').value;
    $.post("/edit/"+id, {
        name:iname,
        price:iprice,
        quantity:iquantity
    },
        function (data, status) {
    document.getElementById("click").disabled = false;  
    document.getElementById("update").disabled = true;  
    var tdname = document.createElement('td');
    var tdprice = document.createElement('td');
    var tdquantity = document.createElement('td');

    var tdedit = document.createElement('td');
    var tddele = document.createElement('td');

    var edit = document.createElement('input');
    edit.setAttribute('type', "button")
    edit.setAttribute('value', "edit")
    edit.setAttribute('id', id)
    edit.setAttribute('onclick', "edit('" + id + "')")

    tdedit.appendChild(edit);

    var dele = document.createElement('input');
    dele.setAttribute('type', "button")
    dele.setAttribute('value', "delete")
    dele.setAttribute('id', id)
    dele.setAttribute('onclick', "dele('" + id + "')")

    tddele.appendChild(dele)

    var tr = document.createElement('tr');
    tr.setAttribute('id',id)
    table.appendChild(tr);

    tr.appendChild(tdname);
    tr.appendChild(tdprice);
    tr.appendChild(tdquantity);
    tr.appendChild(tdedit)
    tr.appendChild(tddele)
    tdname.innerHTML = iname;
    tdprice.innerHTML = iprice;
    tdquantity.innerHTML = iquantity;


    document.getElementById('name').value = "";
    document.getElementById('price').value = "";
    document.getElementById('quantity').value = "";
});
}
function dele(id) {
    $.post("/dele/"+id, {

    },
    function (data, status) {
    document.getElementById(id).remove();   
})
}
