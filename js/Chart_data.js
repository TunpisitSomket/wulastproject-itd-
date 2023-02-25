google.charts.load('current', {
    'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(loadGraph);

function loadGraph() {
    var db1 = 0;
    var db2 = 0;
    var db3 = 0;
    var db4 = 0;
    var db5 = 0;

    var p1 = 0;
    var p2 = 0;
    var p3 = 0;
    var p4 = 0;
    var p5 = 0;

    var s1 = 0;
    var s2 = 0;
    var s3 = 0;
    var s4 = 0;
    var s5 = 0;

    var d1 = 0;
    var d2 = 0;
    var d3 = 0;
    var d4 = 0;
    var d5 = 0;

    ///////////คุณภาพอาหาร//////////////
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/admin2");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                switch (object['id_quality']) {
                    case "5":
                        db1 = db1 + 1;
                        break;
                    case "4":
                        db2 = db2 + 1;
                        break;
                    case "3":
                        db3 = db3 + 1;
                        break;
                    case "2":
                        db4 = db4 + 1;
                        break;
                    case "1":
                        db5 = db5 + 1;
                        break;
                }

            }

            //////////////////คุณภาพด้านราคา//////////////////
            for (let object of objects) {
                switch (object['id_price']) {
                    case "5":
                        p1 = p1 + 1;
                        break;
                    case "4":
                        p2 = p2 + 1;
                        break;
                    case "3":
                        p3 = p3 + 1;
                        break;
                    case "2":
                        p4 = p4 + 1;
                        break;
                    case "1":
                        p5 = p5 + 1;
                        break;
                }
            }

            ///////////////คุณภาพด้านการบริการ///////////////////////
            for (let object of objects) {
                switch (object['id_serve']) {
                    case "5":
                        s1 = s1 + 1;
                        break;
                    case "4":
                        s2 = s2 + 1;
                        break;
                    case "3":
                        s3 = s3 + 1;
                        break;
                    case "2":
                        s4 = s4 + 1;
                        break;
                    case "1":
                        s5 = s5 + 1;
                        break;
                }
            }

            ////////////////คุณภาพด้านการแต่งการ////////////
            for (let object of objects) {
                switch (object['id_dress']) {
                    case "5":
                        d1 = d1 + 1;
                        break;
                    case "4":
                        d2 = d2 + 1;
                        break;
                    case "3":
                        d3 = d3 + 1;
                        break;
                    case "2":
                        d4 = d4 + 1;
                        break;
                    case "1":
                        d5 = d5 + 1;
                        break;
                }
            }

            /////////อาหาร////////////
            var TimelyResponseData = google.visualization.arrayToDataTable([
                ['id_quality', 'Case'],
                ['ดีเยี่ยม', db1],
                ['ดี', db2],
                ['ปานกลาง', db3],
                ['พอใช้', db4],
                ['ปรับปรุง', db5],
            ]);

            var optionsTimelyResponse = {
                title: 'ข้อมูลการประเมินของลูกค้าทั้งหมด ในระดับ คุณภาพของอาหาร '
                , is3D: true
            };

            var chartTimelyResponse = new google.visualization.PieChart(document.getElementById('piechartTimelyResponse'));
            chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

            var dataSubmitted = google.visualization.arrayToDataTable([
                ['Data', 'id_quality', {
                    role: 'style'
                }, {
                        role: 'annotation'
                    }],
                [, db1, 'color: #FF2C2C', '5'],
                [, db2, 'color: #FFA22C', '4'],
                [, db3, 'color: #FAFF2C', '3'],
                [, db5, 'color: #8DFF2C', '2'],
                [, db5, 'color: #2CFF41', '1'],

            ]);

            var optionSubmitted = {
                title: 'ยอดรวมจำนวนการประเมินด้านคุณภาพอาหาร',
                legend: { position: 'none' }
            };

            var chartSubmitted = new google.visualization.BarChart(document.getElementById('barchartSubmitted'));
            chartSubmitted.draw(dataSubmitted, optionSubmitted);

            /////////////////ราคา/////////////////////////
            var TimelyResponseData = google.visualization.arrayToDataTable([
                ['id_price', 'Case'],
                ['ดีเยี่ยม', p1],
                ['ดี', p2],
                ['ปานกลาง', p3],
                ['พอใช้', p4],
                ['ปรับปรุง', p5],
            ]);

            var optionsTimelyResponse = {
                title: 'ข้อมูลการประเมินของลูกค้าทั้งหมด ในระดับ คุณภาพของอาหาร '
                , is3D: true
            };

            var chartTimelyResponse = new google.visualization.PieChart(document.getElementById('chart2'));
            chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

            var dataSubmitted = google.visualization.arrayToDataTable([
                ['Data', 'id_price', {
                    role: 'style'
                }, {
                        role: 'annotation'
                    }],
                [, p1, 'color: #FF2C2C', '5'],
                [, p2, 'color: #FFA22C', '4'],
                [, p3, 'color: #FAFF2C', '3'],
                [, p4, 'color: #8DFF2C', '2'],
                [, p5, 'color: #2CFF41', '1'],

            ]);

            var optionSubmitted = {
                title: 'ยอดรวมจำนวนการประเมินด้านคุณภาพราคา',
                legend: { position: 'none' }
            };

            var chartSubmitted = new google.visualization.BarChart(document.getElementById('chart3'));
            chartSubmitted.draw(dataSubmitted, optionSubmitted);

        }

        //////////////////บริการ////////////////////////
        var TimelyResponseData = google.visualization.arrayToDataTable([
            ['id_serve', 'Case'],
            ['ดีเยี่ยม', s1],
            ['ดี', s2],
            ['ปานกลาง', s3],
            ['พอใช้', s4],
            ['ปรับปรุง', s5],
        ]);

        var optionsTimelyResponse = {
            title: 'ข้อมูลการประเมินของลูกค้าทั้งหมด ในระดับ คุณภาพของการบริการ '
            , pieHole: 0.4,
        };

        var chartTimelyResponse = new google.visualization.PieChart(document.getElementById('chart4'));
        chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

        var dataSubmitted = google.visualization.arrayToDataTable([
            ['Data', 'id_serve', {
                role: 'style'
            }, {
                    role: 'annotation'
                }],
            [, s1, 'color: #FF2C2C', '5'],
            [, s2, 'color: #FFA22C', '4'],
            [, s3, 'color: #FAFF2C', '3'],
            [, s4, 'color: #8DFF2C', '2'],
            [, s5, 'color: #2CFF41', '1'],

        ]);

        var optionSubmitted = {
            title: 'ยอดรวมจำนวนการประเมินด้านการบริการ',
            legend: { position: 'none' }
        };

        var chartSubmitted = new google.visualization.BarChart(document.getElementById('chart5'));
        chartSubmitted.draw(dataSubmitted, optionSubmitted);


        //////////////////การแต่งกาย////////////////////////
        var TimelyResponseData = google.visualization.arrayToDataTable([
            ['id_dress', 'Case'],
            ['ดีเยี่ยม', d1],
            ['ดี', d2],
            ['ปานกลาง', d3],
            ['พอใช้', d4],
            ['ปรับปรุง', d5],
        ]);

        var optionsTimelyResponse = {
            title: 'ข้อมูลการประเมินของลูกค้าทั้งหมด ในระดับ คุณภาพของการแต่งกาย '
            , pieHole: 0.4,
        };

        var chartTimelyResponse = new google.visualization.PieChart(document.getElementById('chart6'));
        chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

        var dataSubmitted = google.visualization.arrayToDataTable([
            ['Data', 'id_dress', {
                role: 'style'
            }, {
                    role: 'annotation'
                }],
            [, d1, 'color: #FF2C2C', '5'],
            [, d2, 'color: #FFA22C', '4'],
            [, d3, 'color: #FAFF2C', '3'],
            [, d4, 'color: #8DFF2C', '2'],
            [, d5, 'color: #2CFF41', '1'],

        ]);

        var optionSubmitted = {
            title: 'ยอดรวมจำนวนการประเมินด้านการแต่งกาย',
            legend: { position: 'none' }
        };

        var chartSubmitted = new google.visualization.BarChart(document.getElementById('chart7'));
        chartSubmitted.draw(dataSubmitted, optionSubmitted);



    }

};

