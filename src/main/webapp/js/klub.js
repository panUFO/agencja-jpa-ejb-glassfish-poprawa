$(document).ready(function()
{
    var idKlub,
        miasto,
        nazwa,
        ilosc_miejsc
        $updateAlert = $('#update-alert'),
        $inputsUpdate = $('#inputs-update').children(),
        $tbody = $('#klubs-tbody');


    doAjax('../agencja/rest/klub/getAllKlubs', 'GET', 'json', '').success(
           function(response)
           {

               makeRowsInTable(response, $tbody);
           });


    $tbody.on('click', '.remove-row', function()
    {
        idKlub = $(this).closest('tr').children().eq(0).text();
    });
    $("#delete-btn").on('click', function()
    {
        if(typeof null != idKlub && typeof 'undefined' != idKlub )
        {
            doAjax('../agencja/rest/klub/deleteKlub', 'DELETE', 'json', {idKlub: idKlub}).success(function(response){ location.reload(true); });
        }
        location.reload(true);
    });

    $tbody.on('click', '.update-row', function()
    {
        var $this = $(this).closest('tr').children();
        $updateAlert.removeClass('in');
        $updateAlert.text('');
        idKlub = $this.eq(0).text();
        miasto = $this.eq(1).text();
        nazwa = $this.eq(2).text();
        ilosc_miejsc = $this.eq(3).text();
        $inputsUpdate.eq(0).val(idKlub);
        $inputsUpdate.eq(1).val(miasto);
        $inputsUpdate.eq(2).val(nazwa);
        $inputsUpdate.eq(3).val(ilosc_miejsc);
    });

    $('#update-form').submit(function(e)
    {
        $updateAlert.removeClass('in');
        $updateAlert.text('');
        var newIdKlub = $inputsUpdate.eq(0).val(),
            newMiasto = $inputsUpdate.eq(1).val(),
            newNazwa = $inputsUpdate.eq(2).val();
            newIlosc_miejsc = $inputsUpdate.eq(3).val();
        if(idKlub != '' && typeof idKlub != 'undefined' && idKlub == newIdKlub)
        {
            if(newMiasto == miasto && newNazwa == nazwa && newIlosc_miejsc == ilosc_miejsc)
            {
                $('#update-modal').modal('hide');
            }
            else
            {
                 doAjax('../agencja/rest/klub/updateKlub', 'PUT', 'json', {idKlub:idKlub, miasto: newMiasto, nazwa: newNazwa, ilosc_miejsc: newIlosc_miejsc}).success(
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
        	miasto = $('#miasto').val();
        	nazwa = $('#nazwa').val();
         	ilosc_miejsc = $('#ilosc_miejsc').val();

            if(miasto.length < 2 )
                {
                    $addAlert.text('Miasto musi miec co najmniej 2 litery!');
                    $addAlert.addClass('in');
                }
            else
            {
        		doAjax('../agencja/rest/klub/addKlub', 'POST', 'json', {miasto: miasto, nazwa: nazwa, ilosc_miejsc: ilosc_miejsc}).success(
                function(response)
                {
                    location.reload(true);
                });;
            }
            location.reload(true);
        });

});
