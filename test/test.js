  var array = [];

  function fnAddColumn() {
      var name = document.getElementById("columnName").value;
      var type = document.getElementById("datatype").value;
      var edit = document.getElementById("editable").value;
      var oRea = {
          columnName: name,
          datatype: type,
          editable: edit
      };
      array.push(oRea);
      var table = document.getElementById("myTable");
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = "<input type='checkbox' class='check'>";
      cell2.innerHTML = array[array.length - 1].columnName;
      cell3.innerHTML = array[array.length - 1].datatype;
      cell4.innerHTML = array[array.length - 1].editable;

      var rowCount = document.getElementById('myTable').rows.length;
      document.getElementById('heading');
      var colname = cell2.innerHTML;
      var th = document.createElement('th');
      th.innerHTML = colname;
      document.getElementById('heading').appendChild(th);
  }

  function fnDeleteColumn(table1) {
      var table = document.getElementById(table1);
      var rowCount = table.rows.length;
      for (var i = 0; i < rowCount; i++) {
          var row = table.rows[i];
          var chkbox = row.cells[0].childNodes[0];
          if (null != chkbox && true == chkbox.checked) {
              if (rowCount <= 1) {
                  alert("Cannot delete all the rows.");
                  break;
              }
              table.deleteRow(i);
              rowCount--;
              i--;
          }
      }
  }

  function fnAddRow() {
      var table = document.getElementById("myTable1");
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);
      row.setAttribute('class', 'rowdata');
      var columncount = document.getElementById('myTable1').rows[0].cells.length;
      var cell = [];
      for (var i = 0; i < columncount; i++) {
          cell[i] = row.insertCell(i);
      }
      cell[0].innerHTML = "<input type='checkbox' class='check'>";


      for (var k = 0; k <= columncount - 1; k++) {
          switch (array[k].datatype) {
              case "Number":
                  if (array[k].editable == 'Yes') {
                      cell[k + 1].innerHTML = '<input type="number" name="number" placeholder="Enter Number" class="data">';
                  } else {
                      cell[k + 1].innerHTML = '<input type="number" name="number" value="12" class="data" readonly>';
                  }
                  break;
              case "String":
                  if (array[k].editable == 'Yes') {
                      cell[k + 1].innerHTML = '<input type="text" name="name" placeholder="Enter Name" class="data">';
                  } else {
                      cell[k + 1].innerHTML = '<input type="text" name="name" value="not editable" readonly class="data">';
                  }
                  break;
              case "Boolean":
                  if (array[k].editable == 'No') {
                      cell[k + 1].innerHTML = '<select disabled="true" class="data"><option>true</option><option>false</option></select>';
                  }
                  if (array[k].editable == 'Yes') {
                      cell[k + 1].innerHTML = '<select class="data"><option>true</option><option>false</option></select>';
                  }
                  break;

              case "Date":
                  if (array[k].editable == 'No') {
                      var today = new Date();
                      var date = today.getMonth() + 1;
                      cell[k + 1].innerHTML = '<span class="data">' + today.getDate() + "/" + date + "/" + today.getFullYear(); + '"</span>';
                  } else
                      cell[k + 1].innerHTML = '<input type="date" class="data">';
                  break;
              default:
                  break;
          }
      }
  }
  var json = [];

  function fnExportToJSON() {
      var rowCount = document.getElementById('myTable1').rows.length - 1;
      var rowinc = array.length;
      for (var j = 0; j < rowCount; j++) {
          var obj = {};
          for (var i = 0; i < array.length; i++) {
              obj[array[i].columnName] = document.getElementsByClassName('rowdata')[j].childNodes[i + 1].childNodes[0].value;
              if (array[i].datatype == 'Date') {
                  if (array[i].editable == 'No') {
                      obj[array[i].columnName] = document.getElementsByClassName('rowdata')[j].childNodes[i + 1].childNodes[0].innerHTML;
                  } else {
                      obj[array[i].columnName] = document.getElementsByClassName('rowdata')[j].childNodes[i + 1].childNodes[0].value;
                  }
              }
          }
          json.push(obj);
      }
      var data = JSON.stringify(json);
      //var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
      // document.getElementById('export').setAttribute('href', '"data:'+data+'" download="data.json"');  
      var x = window.open();
      x.document.open();
      // Here in the new tab the json is NOT formatted
      x.document.write(data);
      x.document.close();
  }
