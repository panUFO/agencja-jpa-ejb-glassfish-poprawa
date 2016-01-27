function doAjax(url, type, dataType, data)
{

    return $.ajax
    ({
        url: url,
        type: type,
        dataType: dataType,
        data: data,
        error: function (errorThrown)
        {
            if(errorThrown.status == 200 || errorThrown.status == 201)
                location.reload(true);
            else
                showIfError({status: errorThrown.status, message: errorThrown.responseText });
        }
    });
}

function showIfError(response)
{
    $('#info-modal-text').text('Error! ' + response.message);
    $('#info-modal').modal('show');
}



function makeRowsInTable(listObjects, $tbody)
{

    var $lastTr = $tbody.children(0),
        buttonEdit = '<button type="button" data-toggle="modal" data-target="#update-modal" class="glyphicon glyphicon-edit btn-success update-row" aria-hidden="true"></button>',
        buttonDelete = '<button type="button" data-toggle="modal" data-target="#delete-modal" class="glyphicon glyphicon-remove btn-danger remove-row" aria-hidden="true"></button>';

    for(var i=0; i<listObjects.length; i++)
    {
        listObjects[i].buttonEdit = buttonEdit;
        listObjects[i].buttonDelete = buttonDelete;
        createRow(listObjects[i], $lastTr);
    }

}

function createRow(object, $lastTr)
{

   var $tr = $('<tr>').insertBefore($lastTr);
   for(key in object)
        createCol(object[key], $tr);

}

function createCol(value, $tr)
{
    $th = $('<th>').appendTo($tr);
    if(isObject(value))
    {
        $th.attr('data-value', value[Object.keys(value)[0]]);
        $th.append(createTextToOptionSelect(value));
    }
    else
    {
        $th.append(value);
    }

}

function createOptionSelect($select, listObjects)
{
    var $option,
        object;

    for(i in listObjects)
    {
        $option = $('<option>').appendTo($select);
        object = listObjects[i];
        $option.text(createTextToOptionSelect(listObjects[i]));
        $option.attr('value', object[Object.keys(object)[0]]);
    }
}
function createTextToOptionSelect(object)
{
    var text = "ID: " + object[Object.keys(object)[0]];

    if(object.hasOwnProperty('idKlub'))
    {
        text += ", " + object.miasto + " " + object.nazwa;
    }

    return text;
}



function isObject(val)
{
    if (val === null)
    {
        return false;
    }
    return ( (typeof val === 'function') || (typeof val === 'object') );
}
