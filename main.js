function JSON2CSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    var line = '';

    if ($("#labels").is(':checked')) {
        var head = array[0];
        if ($("#quote").is(':checked')) {
            for (var index in array[0]) {
                var value = index + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[0]) {
                line += index + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';

        if ($("#quote").is(':checked')) {
            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
    
}
        
$("#convert").click(function() {
    try {
        var json = $.parseJSON($("#json").val());
        var csv = JSON2CSV(json);
        $("#csv").val(csv);
    } catch (error) {
        $('#modal-error').text(error.message);
        $('#myModal').show();
    }
    
});

$("#clear").click(function() {
    $("#json").val('');
    $("#csv").val('');
});
    
$("#download").click(function() {
    var json = $.parseJSON($("#json").val());
    var csv = JSON2CSV(json);
    window.open("data:text/csv;charset=utf-8," + escape(csv))
});


$("#close").click(function() {
    closeModal();
});

$(".close").click(function() {
    closeModal();
});

function closeModal(){
    $('#myModal').hide();
};