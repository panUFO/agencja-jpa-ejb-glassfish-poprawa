package com.agencja.rest;

import com.agencja.KlubDAO;
import com.agencja.KoncertDAO;
import com.agencja.domain.*;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.List;

@Stateless
@Path("/koncert")
public class KoncertResource {

    @EJB
    private KlubDAO klubManager;

    @EJB
    private KoncertDAO koncertManager;

    @POST
    @Path("/addKoncert")
    @Produces(MediaType.APPLICATION_JSON)
    public Response addKoncert(@FormParam("nazwa_koncertu") String nazwa_koncertu,
                               @FormParam("ceny_biletow") double ceny_biletow,
                               @FormParam("klub") long idKlub) {

        Klub klubById = new Klub();
        klubById.setIdKlub(idKlub);

        Klub klub = klubManager.getKlubByID(klubById);

        Koncert koncert = new Koncert(nazwa_koncertu, ceny_biletow, klub);

        koncertManager.addKoncert(koncert);
        return Response.status(Response.Status.CREATED).build();
    }

    @GET
    @Path("/getAllKoncerts")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Koncert> getAllKoncerts() {
        return koncertManager.getAllKoncerts();
    }

    @PUT
    @Path("/updateKoncert")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateKoncert(@FormParam("idKoncert") long idKoncert,
                                  @FormParam("nazwa_koncertu") String nazwa_koncertu,
                                  @FormParam("ceny_biletow") double ceny_biletow,
                                  @FormParam("klub") long idKlub) {
        Klub klubById = new Klub();
        klubById.setIdKlub(idKlub);

        Koncert koncertById = new Koncert();
        koncertById.setIdKoncert(idKlub);

        Koncert koncert = koncertManager.getKoncertByID(koncertById);
        Klub klub = klubManager.getKlubByID(klubById);

        koncert.setNazwa_koncertu(nazwa_koncertu);
        koncert.setCeny_biletow(ceny_biletow);
        koncert.setKlub(klub);

        koncertManager.updateKoncert(koncert);

        return Response.status(Response.Status.CREATED).build();
    }

    @DELETE
    @Path("/deleteKoncert")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteKoncert(@FormParam("idKoncert") long idKoncert)
    {
        Koncert koncert = new Koncert();
        koncert.setIdKoncert(idKoncert);

        koncertManager.deleteKoncert(koncert);

        return Response.status(Response.Status.OK).build();
    }


}
