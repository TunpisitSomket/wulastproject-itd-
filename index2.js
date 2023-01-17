google.charts.load('current', {
    'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(loadTable);

function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/complaints");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = '';
            var num = 1;
            const objects = JSON.parse(this.responseText);  
            for (let object of objects) {

                trHTML += '<tr>';
                trHTML += '<td>' + num + '</td>';
                trHTML += '<td>' + object['Name'] + '</td>';
                trHTML += '<td>' + object['Type'] + '</td>';
                trHTML += '<td>' + object['Tel'] + '</td>';
                trHTML += '<td>' + object['Opening'] + '</td>';
                trHTML += '<td>';
                trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' + object['_id'] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += "</tr>";

                num++;
            }
            document.getElementById("mytable").innerHTML = trHTML;

            loadGraph();
        }
    };
}

function loadQueryTable() {
    document.getElementById("mytable").innerHTML = "<tr><th scope=\"row\" colspan=\"5\">Loading...</th></tr>";
    const searchText = document.getElementById('searchTextBox').value;

    const xhttp = new XMLHttpRequest();
    if (searchText == ""){
        window.location.reload();
    } eles 
    xhttp.open("GET", "http://localhost:3000/complaints/findtext/" + searchText);

    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = '';
            var num = 1;
            const objects = JSON.parse(this.responseText).Complaint;
            for (let object of objects) {
                trHTML += '<tr>';
                trHTML += '<td>' + num + '</td>';
                trHTML += '<td>' + object['Name'] + '</td>';
                trHTML += '<td>' + object['Type'] + '</td>';
                trHTML += '<td>' + object['Tel'] + '</td>';
                trHTML += '<td>' + object['Opening'] + '</td>';
                trHTML += '<td>';
                trHTML += '<a type="button" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' + object['_id'] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += "</tr>";
                num++;
            

            }
            console.log(trHTML);
            document.getElementById("mytable").innerHTML = trHTML;

        }
    };
}

function loadGraph() {
    var hhh = 1;
    var Cha = 1;
    var d = 0;
    var other = 0;


    var hhh = 1;
    var Cha = 1;
    var d = 0;
    var other = 0;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/complaints/");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                switch (object['Name']) {
                    case "hhh":
                        hhh = hhh + 1;
                        break;
                        case "Cha":
                        Cha = Cha + 1;
                        break;
                        case "d":
                        d = d + 1;
                        break;
                    default:
                        other = other + 1;
                        break;
                }

                switch (object['Type']) {
                    case "hhh":
                        hhh = hhh + 1;
                        break;
                        case "Cha":
                        Cha = Cha + 1;
                        break;
                        case "d":
                        d = d + 1;
                    default:
                        other = other+ 1;
                        break;
                }
            }

            var TimelyResponseData = google.visualization.arrayToDataTable([
                ['Name', 'Case'],
                ['hhh', hhh],
                ['Cha', Cha],
                ['d', d],
                ['Other', other]

            ]);

            var optionsTimelyResponse = { title: 'ประเภทเนื้อหาแอพพลิเคชั่นทั้งหมด' };
            var chartTimelyResponse = new google.visualization.PieChart(document.getElementById('piechartTimelyResponse'));
            chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

            var dataSubmitted = google.visualization.arrayToDataTable([
                ['Type', 'Number', {
                    role: 'style'
                }, {
                    role: 'annotation'
                }],
                ['1.', rrr, 'color: #FF2C2C', 'rrr'],
                ['Other', other, 'color: #25F4BC', 'Other']
            ]);

            var optionSubmitted = {
                title: '10 อันดับ แอพพลิเคชั่น Business ยอดนิยม เพื่อทำให้กาทำธุระกิจง่ายขึ้น',
                legend: { position: 'none' }
            };

            var chartSubmitted = new google.visualization.BarChart(document.getElementById('barchartSubmitted'));
            chartSubmitted.draw(dataSubmitted, optionSubmitted);
        }
    };


}

function showCompliantCreateBox() {

    var d = new Date();
    const date = d.toISOString().split('T')[0]

    Swal.fire({
        title: 'เพิ่มข้อมูลร้าน',
        html:'<div class="mb-3"><label for="Name" class="form-label">Name</label>' +
            '<input class="form-control" id="Name" placeholder=" Name"></div>' +

            '<div class="mb-3"><label for="Type" class="form-label">Type</label>' +
            '<input class="form-control" id="Type" placeholder=" Type"></div>' +

            '<div class="mb-3"><label for="Tel" class="form-label">Tel</label>' +
            '<input class="form-control" id="Tel" placeholder=" Tel"></div>' +

            '<div class="mb-3"><label for="Opening" class="form-label">Opening</label>' +
            '<input class="form-control" id="Opening" placeholder=" Opening"></div>' ,


        focusConfirm: false,
        preConfirm: () => {
            compliantCreate();
        }
    });
}

function compliantCreate() {
    const Name = document.getElementById("Name").value;
    const Type = document.getElementById("Type").value;
    const Tel = document.getElementById("Tel").value;
    const Opening = document.getElementById("Opening").value;

    console.log(JSON.stringify({
        "Name": Name,
        "Type": Type,
        "Tel": Tel,
        "Opening": Opening,
    }));

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/complaints/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "Name": Name,
        "Type": Type,
        "Tel": Tel,
        "Opening": Opening,
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                'Good job!',
                'Create Compliant Successfully!',
                'success'
            );
            loadTable();
        }
    };
}

function compliantDelete(id) {
    console.log("Delete: ", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/complaints/delete");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "_id": id
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const object = JSON.parse(this.responseText);
            console.log(object);
            Swal.fire(
                'Good job!',
                'Delete Compliant Successfully!',
                'success'
            );
            loadTable();
        }
    };
}

function showCompliantEditBox(id) {
    console.log("edit", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/complaints/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const object = JSON.parse(this.responseText).object;
            console.log("showCompliantEditBox", object);
            Swal.fire({
                title: 'แก้ไขข้อมูลร้าน',
                html: '<input id="id" class="swal2-input" placeholder="Name" type="hidden" value="' + object['_id'] + '"><br>' +
                    '<div class="mb-3"><label for="Name" class="form-label">Name</label>' +
                    '<input class="form-control" id="Name" placeholder="Name" value="' + object['Name'] + '"></div>' +

                    '<div class="mb-3"><label for="Type" class="form-label">Type</label>' +
                    '<input class="form-control" id="Type" placeholder="Type" value="' + object['Type'] + '"></div>'+

                    '<div class="mb-3"><label for="Tel" class="form-label">Tel</label>' +
                    '<input class="form-control" id="Tel" placeholder="Tel" value="' + object['Tel'] + '"></div>'+

                    '<div class="mb-3"><label for="Opening" class="form-label">Opening</label>' +
                    '<input class="form-control" id="Opening" placeholder="Opening" value="' + object['Opening'] + '"></div>',

                focusConfirm: false,
                preConfirm: () => {
                    userEdit();
                }
            });
        }
    };
}

function userEdit() {
    const id = document.getElementById("id").value;
    const Name = document.getElementById("Name").value;
    const Type = document.getElementById("Type").value;
    const Tel = document.getElementById("Tel").value;
    const Opening = document.getElementById("Opening").value;

    console.log(JSON.stringify({
        "_id": id,
        "Name": Name,
        "Type": Type,
        "Tel": Tel,
        "Opening": Opening,
    }));

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3000/complaints/update");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "_id": id,
        "Name": Name,
        "Type": Type,
        "Tel": Tel,
        "Opening": Opening,
    }));

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                'Good job!',
                'Update Compliant Successfully!',
                'success'
            )
            loadTable();
        }
    };
}