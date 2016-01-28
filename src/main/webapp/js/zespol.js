$(document).ready(function()
{
    var idZespol,
        nazwa,
        kraj
        $updateAlert = $('#update-alert'),
        $inputsUpdate = $('#inputs-update').children(),
        $tbody = $('#zespols-tbody');


    doAjax('../agencja/rest/zespol/getAllZespols', 'GET', 'JSON', '').success(
           function(response)
           {
               makeRowsInTable(response, $tbody);
           });


    $tbody.on('click', '.remove-row', function()
    {
        idZespol = $(this).closest('tr').children().eq(0).text();
    });
    $("#delete-btn").on('click', function()
    {
        if(typeof null != idZespol && typeof 'undefined' != idZespol )
        {
            doAjax('../agencja/rest/zespol/deleteZespol', 'DELETE', 'JSON', {idZespol: idZespol}).success(function(response){ location.reload(true); });
        }
        location.reload(true);
    });

    $tbody.on('click', '.update-row', function()
    {
        var $this = $(this).closest('tr').children();
        $updateAlert.removeClass('in');
        $updateAlert.text('');
        idZespol = $this.eq(0).text();
        nazwa = $this.eq(1).text();
        kraj = $this.eq(2).text();
        $inputsUpdate.eq(0).val(idZespol);
        $inputsUpdate.eq(1).val(nazwa);
        $inputsUpdate.eq(2).val(kraj);
    });


    $tbody.on('click', '.update-row', function()
    {
        var $this = $(this).closest('tr').children();
        $updateAlert.removeClass('in');
        $updateAlert.text('');
        idZespol = $this.eq(0).text();
        nazwa = $this.eq(1).text();
        kraj = $this.eq(2).text();
        $inputsUpdate.eq(0).val(idZespol);
        $inputsUpdate.eq(1).val(nazwa);
        $inputsUpdate.eq(2).val(kraj);
    });
    $('#update-form').submit(function(e)
    {
        $updateAlert.removeClass('in');
        $updateAlert.text('');
        var newidZespol = $inputsUpdate.eq(0).val(),
            newNazwa = $inputsUpdate.eq(1).val(),
            newKraj = $inputsUpdate.eq(2).val();
        if(idZespol != '' && typeof idZespol != 'undefined' && idZespol == newidZespol)
        {
            if(newNazwa == nazwa && newKraj == kraj)
            {
                $('#update-modal').modal('hide');
            }
            else
            {
                 doAjax('../agencja/rest/zespol/updateZespol', 'PUT', 'JSON', {idZespol:idZespol, nazwa: newNazwa, kraj: newKraj}).success(
                 function(response)
                 {
                     $('#update-modal').modal('hide');
                     location.reload(true);
                 });
            }
            location.reload(true);
            e.preventDefault();
        }
    });

        $('#add-btn').click(function()
        {
        	var $addAlert = $('#add-alert');
        	$addAlert.removeClass('in');
        	$addAlert.text('');
        	nazwa = $('#nazwa').val();
        	kraj = $('#kraj').val();

        		doAjax('../agencja/rest/zespol/addZespol', 'POST', 'JSON', {nazwa: nazwa, kraj: kraj}).success(
                function(response)
                {
                    location.reload(true);
                });;
            location.reload(true);
        });

});