$(document).ready(function()
{
    var idKoncert,
        nazwa_koncertu,
        ceny_biletow,
        idKlub,
        $updateAlert = $('#update-alert'),
        $inputsUpdate = $('#inputs-update').children(),
        $tbody = $('#koncerty-tbody');

    doAjax('../agencja/rest/koncert/getAllKoncerts', 'GET', 'JSON', '').then(
    function(response)
    {

        makeRowsInTable(response, $tbody);
    });

    doAjax('../agencja/rest/klub/getAllKlubs',  'GET', 'JSON', '').then(
    function(response)
    {
        createOptionSelect($('#select-klub-add'), response);
        createOptionSelect($inputsUpdate.eq(3), response);
    });


    $tbody.on('click', '.remove-row', function()
    {
        idKoncert = $(this).closest('tr').children().eq(0).text();
    });

    $("#delete-btn").on('click', function()
    {
        if(typeof idKoncert != null && typeof idKoncert != 'undefined' )
        {
            doAjax('../agencja/rest/koncert/deleteKoncert', 'DELETE', 'JSON', {idKoncert: idKoncert})
                .success(function(response){ location.reload(true); });
        }
        location.reload(true);
    });

    $tbody.on('click', '.update-row', function()
    {
       var $this = $(this).closest('tr').children();
       $updateAlert.removeClass('in');
       $updateAlert.text('');
       $('#inputs-update select').children().prop('selected', false);
       idKoncert = $this.eq(0).text();
       nazwa_koncertu = $this.eq(1).text();
       ceny_biletow = $this.eq(2).text();
       idKlub= $this.eq(3).text();
       $inputsUpdate.eq(0).val(idKoncert);
       $inputsUpdate.eq(1).val(nazwa_koncertu);
       $inputsUpdate.eq(2).val(ceny_biletow);
       $inputsUpdate.eq(3).find('option[value="'+idKlub+'"]').prop('selected', true);
    });

    $('#update-form').submit(function(e)
    {
        $updateAlert.removeClass('in');
        $updateAlert.text('');
        var newIdKoncert = $inputsUpdate.eq(0).val(),
            newNazwa_koncertu = $inputsUpdate.eq(1).val(),
            newCeny_biletow = $inputsUpdate.eq(2).val(),
            newIdKlub = $inputsUpdate.eq(3).val();
        if(idKoncert != '' && typeof idKoncert != 'undefined' && idKoncert == newIdKoncert)
        {
            if(idKlub == newIdKlub && nazwa_koncertu == newNazwa_koncertu && ceny_biletow == newCeny_biletow)
            {
                $('#update-modal').modal('hide');
            }
            else
            {
                doAjax('../agencja/rest/koncert/updateKoncert', 'PUT', 'JSON',
                    {
                        idKoncert: newIdKoncert,
                        nazwa_koncertu: newNazwa_koncertu,
                        ceny_biletow: newCeny_biletow,
                        idKlub: newIdKlub

                    }).success(function (response) {
                    location.reload(true);
                });
                $('#update-modal').modal('hide');
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
        var nazwa_koncertu = $('#nazwa_koncertu').val();
            ceny_biletow = $('#ceny_biletow').val();
    	    idKlub= $('#select-klub-add').val();

    	if(idKlub == '')
    	{
    		$addAlert.text('Nie wybrano klubu');
    		$addAlert.addClass('in');
    	}

    	else
    	{
    		doAjax('../agencja/rest/koncert/addKoncert', 'POST', 'JSON',{  nazwa_koncertu: nazwa_koncertu, ceny_biletow: ceny_biletow, idKlub: idKlub})
    		    .success(function(response){ location.reload(true); });

    	}
        location.reload(true);
    });

});